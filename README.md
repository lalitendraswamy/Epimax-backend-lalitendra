Task Management API Documentation
This API allows you to manage tasks in a task management system. You can perform CRUD (Create, Read, Update, Delete) operations on tasks.

Dotenv files:
PORT = 5000
JWT_SECRET = lalitendra
DB_URL = ./db/sqlite.db

Install packages: npm install

To run the code: node index.js


Hosted URL: https://epimax-backend-lalitendra.onrender.com/

Explanation Video: https://drive.google.com/file/d/1MPyvR4JkkM256-l4u9UNB9Z1gQqLBafu/view?usp=drive_link

Swagger api documentations:

after running the server 

use [localhost:5000/api-docs](http://localhost:5000/api-docs)

In swagger use complete token including Bearer
Bearer JWT_TOKEN


User Authentication API Documentation
This API allows users to register and log in to the system using username and password credentials.

Base URL

Register User
http://your-api-domain.com/register


POST /register
Registers a new user with the provided credentials.

Request Body
Field	Type	Description
username	string	Username of the user
email	string	Email of the user
password	string	Password of the user
Example Request
json
{
    "username": "example_user",
    "email": "user@example.com",
    "password": "password123"
}
Response
201 Created: User registered successfully.
500 Internal Server Error: Unable to register user.



Login User
http://your-api-domain.com/login

POST /login
Logs in a user with the provided credentials and returns a JWT token for authentication.

Request Body
Field	Type	Description
username	string	Username of the user
password	string	Password of the user
Example Request
json
{
    "username": "example_user",
    "password": "password123"
}
Response
200 OK: User logged in successfully. Returns a JWT token.
401 Unauthorized: Invalid username or password.
500 Internal Server Error: Server error occurred.
Example Response
json
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJleGFtcGxlX3VzZXIiLCJpYXQiOjE2MzAzMTM2MjEsImV4cCI6MTYzMDMxNzIyMX0.TNq_r3lkH9-3onVWh1Ac5qz2Ft0m1KmIBbjBV2M-Uw0"
}


Tasks Management

http://your-api-domain.com/create
Authentication
All endpoints require authentication using a token. Include the token in the Authorization header of the request.

Create a Task

POST /create
Creates a new task with the provided data.

Request Body
Field	Type	Description
title	string	Title of the task
description	string	Description of the task
status	string	Status of the task
assignee_id	number	ID of the user assigned to task
Example Request
json
{
    "title": "Complete Project Proposal",
    "description": "Write a detailed project proposal including objectives, scope, and timeline.",
    "status": "In Progress",
    "assignee_id": 1
}
Response
201 Created: Task created successfully.
500 Internal Server Error: Unable to create the task.
Get All Tasks
sql

GET /get
Retrieves all tasks from the database.

Response
200 OK: Returns an array of tasks.
500 Internal Server Error: Server error occurred.
Example Response
json
[
    {
        "id": 1,
        "title": "Complete Project Proposal",
        "description": "Write a detailed project proposal including objectives, scope, and timeline.",
        "status": "In Progress",
        "assignee_id": 1,
        "created_at": "2024-04-30T12:00:00Z",
        "updated_at": "2024-04-30T12:00:00Z"
    },
    {
        "id": 2,
        "title": "Review Code Changes",
        "description": "Review and approve code changes for feature implementation.",
        "status": "Pending",
        "assignee_id": 2,
        "created_at": "2024-04-29T10:30:00Z",
        "updated_at": "2024-04-30T08:45:00Z"
    }
]
Get Task by ID

GET /get/:id
Retrieves a specific task by its ID.

Response
200 OK: Returns the task with the specified ID.
404 Not Found: Task with the specified ID not found.
500 Internal Server Error: Server error occurred.
Example Response
json

{
    "id": 1,
    "title": "Complete Project Proposal",
    "description": "Write a detailed project proposal including objectives, scope, and timeline.",
    "status": "In Progress",
    "assignee_id": 1,
    "created_at": "2024-04-30T12:00:00Z",
    "updated_at": "2024-04-30T12:00:00Z"
}
Update Task by ID

PUT /update/:id
Updates an existing task with the provided data.

Request Body
Field	Type	Description
title	string	Title of the task
description	string	Description of the task
status	string	Status of the task
assignee_id	number	ID of the user assigned to task
Example Request
json

{
    "title": "Complete Project Proposal",
    "description": "Write a detailed project proposal including objectives, scope, and timeline.",
    "status": "Completed",
    "assignee_id": 1
}
Response
200 OK: Task updated successfully.
500 Internal Server Error: Unable to update the task.
Delete Task by ID
bash

DELETE /delete/:id
Deletes an existing task by its ID.

Response
200 OK: Task deleted successfully.
500 Internal Server Error: Unable to delete the task.
