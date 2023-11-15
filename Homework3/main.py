from flask import Flask, request, jsonify
from flask_cors import CORS

from repository import *

USER_TYPE_ID = 2
DELIVERY_ADDRESS_ID = 1
BILLING_ADDRESS_ID = 1

app = Flask("homework3")
CORS(app, resources=r'/api/*')

@app.route("/api/healthcheck", methods=["GET", "POST"])
def healthcheck():
    return "<h1>Hello World</h1>"

@app.route("/api/version", methods=["GET"])
def version():
    api_version = {
        "version": "1.0.0"
    }
    return api_version


###################################################################


# Get all users or insert an user
@app.route("/api/users", methods=["GET", "POST"])
def users():
    if request.method == "GET":
        # connect to the db 
        connection = connect()

        # get all users details 
        users_details = get_all_users(connection)

        # close db connection 
        connection.close()

        # build response 
        response = {
            "data": []
        }
        for user in users_details:
            current_user = {
                "username": user[0],
                "role": user[1]
#                "created_at": user[2]
            }
            response["data"].append(current_user)

        response = jsonify(response)
        response.headers.add("Access-Control-Allow-Origin", "*") 
        return response 

    if request.method == "POST":
        # get the request body
        body = request.json
        username = body["username"]
        role = body["role"]
        created_at = body["created_at"]

        # establish a connection to our DB
        connection = connect()

        # insert data from body into DB
        create_user(connection, [username, role, created_at])
        
        # return user_id if saved OK else error
        id = get_user_id(connection, username)

        connection.close() 

        response = {
            "data": {
                "id": id
            }
        }
        response = jsonify(response)
        response.headers.add("Access-Control-Allow-Origin", "*") 
        return response 

# Get, update or deletye an user, by ID
@app.route("/api/users/<id>", methods=["GET", "PUT", "DELETE"])
def user_by_id(id):
    if request.method == "GET":
        # connect to the database 
        connection = connect()

        # get user details
        user_details = get_user_details(connection, id)

        # close connection to db 
        connection.close()

        response = {
            "data": {
                "username": user_details[0],
                "role": user_details[1]
            }
        }

        response = jsonify(response)
        response.headers.add("Access-Control-Allow-Origin", "*")
        return response 

    if request.method == "PUT":
        
         # get the request body
        body = request.json
     
        new_role = body["role"]
     
        # establish a connection to our DB
        connection = connect()

        # update data from body into DB
        update_user(connection, id, [new_role])
        connection.close() 

        response = {
            "data": "Succes"
        }
        response = jsonify(response)
        response.headers.add("Access-Control-Allow-Origin", "*") 
        return response 

    if request.method == "DELETE":
        connection = connect()
        delete_user(connection, id)
        connection.close()
        response = {
            "data": "Success." 
        } 
        response = jsonify(response)
        response.headers.add("Access-Control-Allow-Origin", "*")
        return response 


##################################################################
#
#                   post table api's
#
##################################################################


# Get all posts or insert a new post
@app.route("/api/posts", methods=["GET", "POST"])
def posts():
    if request.method == "GET":
        # connect to the db 
        connection = connect()

        # get all posts details 
        posts_details = get_all_posts(connection)

        # close db connection 
        connection.close()

        # build response 
        response = {
            "data": []
        }
        for posts in posts_details:
            current_post = {
                "id": posts[0],
                "title": posts[1],
                "body": posts[2],
                "user_id": posts[3],
                "status": posts[4],
                "post_date": posts[5]
            }
            response["data"].append(current_post)

        response = jsonify(response)
        response.headers.add("Access-Control-Allow-Origin", "*") 
        return response 

    if request.method == "POST":
        # get the request body
        body = request.json
        
        title = body["title"]
        post_body = body["body"]
        user_id = body["user_id"]
        status = body["status"]
        created_at = body["created_at"]


        # establish a connection to our DB
        connection = connect()

        # insert data from body into DB
        create_post(connection, [title, post_body, user_id, status, created_at])
        
        # return Posted! if saved OK else error
        id = get_post_id(connection, title)

        connection.close() 

        response = {
            "data": {
                "id": id
            }
            }
        
        response = jsonify(response)
        response.headers.add("Access-Control-Allow-Origin", "*") 
        return response 

# Get, update or delete a post, by ID
@app.route("/api/posts/<id>", methods=["GET", "PUT", "DELETE"])
def posts_by_id(id):
    if request.method == "GET":
        # connect to the database 
        connection = connect()

        # get post details
        post_details = get_post_details(connection, id)

        # close connection to db 
        connection.close()

        response = {
            "data": {
                "title": post_details[0],
                "body": post_details[1],
                "user_id": post_details[2],
                "status": post_details[3],
                "created_at": post_details[4]
            }
        }

        response = jsonify(response)
        response.headers.add("Access-Control-Allow-Origin", "*")
        return response 

    if request.method == "PUT":
        
         # get the request body
        body = request.json
     
        new_title = body["title"]
     
        # establish a connection to our DB
        connection = connect()

        # update data from body into DB
        update_post(connection, id, [new_title])
        connection.close() 

        response = {
            "data": "Succes"
        }
        response = jsonify(response)
        response.headers.add("Access-Control-Allow-Origin", "*") 
        return response 

    if request.method == "DELETE":
        connection = connect()
        delete_post(connection, id)
        connection.close()
        response = {
            "data": "Success." 
        } 
        response = jsonify(response)
        response.headers.add("Access-Control-Allow-Origin", "*")
        return response 

##################################################################
#
#                   follows table api's
#
##################################################################


# Get all follows entries or insert a new entry
@app.route("/api/follows", methods=["GET", "POST"])
def follows():
    if request.method == "GET":
        # connect to the db 
        connection = connect()

        # get all posts details 
        follows_details = get_all_follows(connection)

        # close db connection 
        connection.close()

        # build response 
        response = {
            "data": []
        }
        for follows in follows_details:
            current_follows = {
                "following_user_id": follows[0],
                "followed_user_id": follows[1]
         #       "post_date": follows[2]
            }
            response["data"].append(current_follows)

        response = jsonify(response)
        response.headers.add("Access-Control-Allow-Origin", "*") 
        return response 

    if request.method == "POST":
        # get the request body
        body = request.json
        
        following_user_id = body["following_user_id"]
        followed_user_id = body["followed_user_id"]
        created_at = body["created_at"]


        # establish a connection to our DB
        connection = connect()

        # insert data from body into DB
        create_follows(connection, [following_user_id, followed_user_id, created_at])
        
        # return Posted! if saved OK else error
        connection.close() 

        response = {
            "data": "Created !"
            }
        
        response = jsonify(response)
        response.headers.add("Access-Control-Allow-Origin", "*") 
        return response 

# Get, update or delete following, by ID
@app.route("/api/following/<id>", methods=["GET", "DELETE"])
def following_by_id(id):
    if request.method == "GET":
        # connect to the database 
        connection = connect()

        # get post details
        follows_details = get_all_following(connection, id)

        # close connection to db 
        connection.close()

        # build response 
        response = {
            "data": []
        }
        for follows in follows_details:
            current_follows = {
                "followed_user_id": follows[0]
         #       "post_date": follows[2]
            }
            response["data"].append(current_follows)

        response = jsonify(response)
        response.headers.add("Access-Control-Allow-Origin", "*") 
        return response 

    
    if request.method == "DELETE":
        connection = connect()
        delete_following(connection, id)
        connection.close()
        response = {
            "data": "Success." 
        } 
        response = jsonify(response)
        response.headers.add("Access-Control-Allow-Origin", "*")
        return response 


@app.route("/api/followed/<id>", methods=["GET", "DELETE"])
def followed_by_id(id):
    if request.method == "GET":
        # connect to the database 
        connection = connect()

        # get post details
        follows_details = get_all_followed(connection, id)

        # close connection to db 
        connection.close()

        # build response 
        response = {
            "data": []
        }
        for follows in follows_details:
            current_follows = {
                "following_user_id": follows[0]
         #       "post_date": follows[2]
            }
            response["data"].append(current_follows)

        response = jsonify(response)
        response.headers.add("Access-Control-Allow-Origin", "*") 
        return response 

    
    if request.method == "DELETE":
        connection = connect()
        delete_followed(connection, id)
        connection.close()
        response = {
            "data": "Success." 
        } 
        response = jsonify(response)
        response.headers.add("Access-Control-Allow-Origin", "*")
        return response 



if __name__ == "__main__":
    app.run(debug=True)
