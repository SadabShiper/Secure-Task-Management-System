# Secure Task Management System
## Prerequisites
Before you begin, ensure you have the following:
- Database (MongoDB)
- Google Console Account to create the API Auth Key's
- Create a .env file

### .env Example
Create a .env file to store your credentials. Example below:

```env
MONGODB_URI = mongodb+srv://<username>:<password>@mongodburlhere
GOOGLE_CLIENT_ID= YOUR_GOOGLE_ID_HERE
GOOGLE_CLIENT_SECRET= YOUR_GOOGLE_CLIENT_SECRET_HERE
GOOGLE_CALLBACK_URL=http://localhost:5000/google/callback
```
### Installation
To install and run this project - install dependencies using npm and then start your server:
```
npm install
npm start
```
