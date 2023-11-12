// app.js
// Your JavaScript code for the main app functionality goes here

function saveNote() {
    // Implement logic to save notes
    const noteTextarea = document.getElementById('noteTextarea');
    const noteList = document.getElementById('noteList');

    const noteText = noteTextarea.value.trim();
    if (noteText !== '') {
        const listItem = document.createElement('li');
        listItem.textContent = noteText;
        noteList.appendChild(listItem);

        // Clear the textarea after saving
        noteTextarea.value = '';
    }
}

// Check if the user is an admin and redirect accordingly
function checkAdminAndRedirect() {
    fetch('/admin/users', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    })
    .then(response => response.json())
    .then(data => {
        if (data.users && data.users.length > 0) {
            // User is an admin, redirect to the admin page
            window.location.href = '/admin/users';
        } else {
            // User is not an admin, stay on the notes page
            window.location.href = '/notes';
        }
    })
    .catch(error => console.error('Error:', error));
}

// Call the function on page load
checkAdminAndRedirect();