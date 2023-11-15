import sqlite3
from datetime import datetime 
from flask import flash


def connect():
    connection = sqlite3.connect("C:\\Users\\petre\\Dropbox\\Projects\\rau-web-apps-programming\\cse\\handyhub\\data\\home.db")
    return connection

def create_user(connection, user_data):
    
    # Getting the current date and time
    dt = datetime.now()

    query = f"""INSERT INTO users(
        username, 
        role,
        created_at 
        ) 
        VALUES(
            '{user_data[0]}', 
            '{user_data[1]}', 
            '{dt}'
        )"""
    cursor = connection.cursor()
    cursor.execute(query)
    connection.commit()

def get_user_id(connection, username):
    query = f"""select id from users where username='{username}'"""
    cursor = connection.cursor()
    database_response = cursor.execute(query)
    id = list(database_response)
    return id

def get_user_details(connection, id):
    query = f"""select username, role from users where id={id}"""
    cursor = connection.cursor()
    database_response = cursor.execute(query)
    user_details = list(database_response)[0]
    return user_details

def get_all_users(connection):
    query = "select username, role from users"
    cursor = connection.cursor()
    database_response = cursor.execute(query)
    users = list(database_response)
    return users 

def update_user(connection, id, new_role):
    query = f"""update users set role = {new_role} where id = {id}"""
    cursor = connection.cursor()
    cursor.execute(query)
    connection.commit()

def delete_user(connection, id):
    query = f"""delete from users where id={id}"""
    cursor = connection.cursor()
    cursor.execute(query)
    connection.commit()

##################################################################
#
#                   posts table DB actions
#
##################################################################

def create_post(connection, posts_data):
    
    # Getting the current date and time
    dt = datetime.now()

    query = f"""INSERT INTO posts(
        title, 
        body,
        user_id,
        status,
        created_at 
        ) 
        VALUES(
            '{posts_data[0]}', 
            '{posts_data[1]}',
            '{posts_data[2]}',
            '{posts_data[3]}',
            '{dt}'
        )"""
    cursor = connection.cursor()
    cursor.execute(query)
    connection.commit()

def get_post_id(connection, title):
    query = f"""select id from posts where title='{title}'"""
    cursor = connection.cursor()
    database_response = cursor.execute(query)
    id = list(database_response)
    return id

def get_post_details(connection, id):
    query = f"""select title, body, user_id, status, STRFTIME('%d/%m/%Y, %H:%M', created_at) as post_date from posts where id={id}"""
    cursor = connection.cursor()
    database_response = cursor.execute(query)
    user_details = list(database_response)[0]
    return user_details

def get_all_posts(connection):
    query = f"""select id, title, body, user_id, status, STRFTIME('%d/%m/%Y, %H:%M', created_at) as post_date from posts"""
    cursor = connection.cursor()
    database_response = cursor.execute(query)
    posts = list(database_response)
    return posts 

def update_post(connection, id, new_title):
    query = f"""update posts set title = {new_title} where id = {id}"""
    cursor = connection.cursor()
    cursor.execute(query)
    connection.commit()

def delete_post(connection, id):
    query = f"""delete from posts where id={id}"""
    cursor = connection.cursor()
    cursor.execute(query)
    connection.commit()


##################################################################
#
#                   follows table DB actions
#
##################################################################

def create_follows(connection, posts_data):
    
    # Getting the current date and time
    dt = datetime.now()

    query = f"""INSERT INTO follows(
        following_user_id, 
        followed_user_id,
        created_at 
        ) 
        VALUES(
            '{posts_data[0]}', 
            '{posts_data[1]}',
            '{dt}'
        )"""
    cursor = connection.cursor()
    cursor.execute(query)
    connection.commit()

def get_all_follows(connection):
    query = f"""select following_user_id, followed_user_id, STRFTIME('%d/%m/%Y, %H:%M', created_at) as created_at from follows"""
    cursor = connection.cursor()
    database_response = cursor.execute(query)
    follows = list(database_response)
    return follows 

def get_all_following(connection, id):
    query = f"""select followed_user_id, STRFTIME('%d/%m/%Y, %H:%M', created_at) as created_at from follows where following_user_id={id}"""
    cursor = connection.cursor()
    database_response = cursor.execute(query)
    follows = list(database_response)
    return follows 

# all followed
def get_all_followed(connection, id):
    query = f"""select following_user_id, STRFTIME('%d/%m/%Y, %H:%M', created_at) as created_at from follows where followed_user_id={id}"""
    cursor = connection.cursor()
    database_response = cursor.execute(query)
    follows = list(database_response)
    return follows 

def delete_followed(connection, id):
    query = f"""delete from follows where followed_user_id={id}"""
    cursor = connection.cursor()
    cursor.execute(query)
    connection.commit()

def delete_following(connection, id):
    query = f"""delete from follows where following_user_id={id}"""
    cursor = connection.cursor()
    cursor.execute(query)
    connection.commit()
