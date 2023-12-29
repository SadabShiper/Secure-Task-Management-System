# Secure Task Management System
## Description
This simple task management application is built using HTML, CSS, Node.js, Express.js, MongoDB, and the EJS template engine. This project aims to provide users with a straightforward and efficient way to manage their tasks and serve as a learning resource for web development enthusiasts.
## Features
- Create, update, view, and delete tasks
- Sort tasks based on deadline, priority
- User authentication for secure task management
- Responsive design for a seamless experience across devices
- Search feature to find specific tasks 

## Technologies Used
- **Frontend**: HTML, CSS, EJS template engine
- **Backend**: Node.js, Express.js
- **Database**: MongoDB

## Getting Started
- Clone the repository: `git clone  https://github.com/SadabShiper/Secure-Task-Management-System.git`
- Install dependencies: `npm install`
- Prerequisites:
   Before you begin, ensure you have the following:
    - Database (MongoDB)
    - Google Console Account to create the API auth keys
    - Create a .env file to store your credentials. Example below:
    
      ```env
      MONGODB_URI = mongodb+srv://<username>:<password>@mongodburlhere
      GOOGLE_CLIENT_ID= YOUR_GOOGLE_ID_HERE
      GOOGLE_CLIENT_SECRET= YOUR_GOOGLE_CLIENT_SECRET_HERE
      GOOGLE_CALLBACK_URL=http://localhost:5000/google/callback
      ```
- Run the application: `npm start`
- Visit http://localhost:5000 in your web browser

