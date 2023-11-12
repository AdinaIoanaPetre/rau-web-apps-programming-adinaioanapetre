// server.js
const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt'); // for password hashing

const app = express();
const port = 3000;

// Database setup
const db = new sqlite3.Database('database.db');

// Create users table if not exists
db.run(`CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    surname TEXT,
    email TEXT UNIQUE,
    password TEXT,
    isAdmin INTEGER DEFAULT 0,
    note TEXT
)`);

// Create an initial admin user if not exists
const initialAdmin = {
    name: 'Adina',
    surname: 'Petre',
    email: 'adinaioana.petre@gmail.com',
    password: 'adinaioana',
    isAdmin: 1, // Set isAdmin to 1 for admin user
};

db.run(
    'INSERT OR IGNORE INTO users (name, surname, email, password, isAdmin) VALUES (?, ?, ?, ?, ?)',
    [initialAdmin.name, initialAdmin.surname, initialAdmin.email, bcrypt.hashSync(initialAdmin.password, 10), initialAdmin.isAdmin],
    (err) => {
        if (err) {
            console.error(err.message);
        } else {
            console.log('Initial admin user created successfully');
        }
    }
);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Routes for notes management (accessible by all users)
app.get('/notes', (req, res) => {
    // Implement logic to retrieve and display user-specific notes
});

app.post('/notes/save', (req, res) => {
    // Implement logic to save user-specific notes
});

// Routes for user management (accessible only by admins)
app.get('/admin/users', (req, res) => {
    // Implement logic to retrieve and display users (only for admins)
    db.all('SELECT id, name, surname, email, isAdmin FROM users', (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({ users: rows });
    });
});

app.post('/admin/remove-user/:id', (req, res) => {
    // Implement logic to remove a user (only for admins)
    const userId = req.params.id;
    db.run('DELETE FROM users WHERE id = ?', userId, (err) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({ message: 'User removed successfully' });
    });
});

app.post('/admin/edit-user/:id', (req, res) => {
    // Implement logic to edit a user (only for admins)
    const userId = req.params.id;
    const { name, surname, email, isAdmin, note } = req.body;

    db.run(
        'UPDATE users SET name = ?, surname = ?, email = ?, isAdmin = ?, note = ? WHERE id = ?',
        [name, surname, email, isAdmin, note, userId],
        (err) => {
            if (err) {
                res.status(500).json({ error: err.message });
                return;
            }
            res.json({ message: 'User updated successfully' });
        }
    );
});

// ... (previous code)

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});