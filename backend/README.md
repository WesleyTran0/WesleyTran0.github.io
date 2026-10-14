# API Goals for now

Create an auth and a todo list of sorts

Endpoints from this:

- GET: a user's tasks

- POST: a user's new task

- UPDATE: a user's task

POST Create the user and send the verification email

GET The link in the email. Marks the user as verified

POST Check the password and set the session cookie (verified users only)

POST Delete the session

GET Return the current user

GET / POST / PATCH Your task endpoints, which require a session
