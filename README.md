Online Quiz Platform
A full-stack web application for creating, managing, and attempting
online quizzes. The platform provides separate experiences for students
and administrators, including quiz management, question management,
results, leaderboard, history, testimonials, and bulk question upload.
🚀 Features
Student
User registration and login
Browse available quizzes
Attempt quizzes
Quiz timer
Automatic result calculation
View score, percentage, correct and wrong answers
View quiz history
Leaderboard
Admin
Secure admin login
Admin dashboard with quiz and student statistics
Create and manage quizzes
Add and view questions
Delete quizzes
Bulk upload questions using Excel
Manage students
Manage testimonials
🛠️ Tech Stack
Frontend
React.js
Vite
React Router
CSS
JavaScript
Backend
Node.js
Express.js
JWT Authentication
bcrypt
Multer
MySQL
Database
MySQL
📁 Project Structure
``` text
online-quiz-platform/
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── services/
│   ├── uploads/
│   ├── utils/
│   ├── app.js
│   ├── package.json
│   └── .env
│
└── frontend/
    ├── public/
    ├── src/
    │   ├── components/
    │   ├── context/
    │   ├── pages/
    │   ├── routes/
    │   └── services/
    ├── package.json
    └── vite.config.js
```
⚙️ Installation
1. Clone the repository
``` bash
git clone https://github.com/charan111-c/online-quiz-platform.git
cd online-quiz-platform
```
2. Backend setup
``` bash
cd backend
npm install
```
Create a `.env` file inside the `backend` folder and configure your
database and authentication settings.
Example:
``` env
PORT=5000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=online_quiz
JWT_SECRET=your_secret_key
```
Do not upload the `.env` file to GitHub.
Start the backend:
``` bash
npm start
```
3. Frontend setup
Open another terminal:
``` bash
cd frontend
npm install
npm run dev
```
The frontend will normally run at:
``` text
http://localhost:5173
```
🗄️ Database
Create a MySQL database and configure the database credentials in the
backend `.env` file.
The application uses tables for users, quizzes, questions, results, and
related platform data.
🔐 Authentication
The application uses JWT-based authentication and role-based access for
students and administrators.
Student → Quiz and learning features
Admin → Quiz, question, student, and platform management
📤 Bulk Question Upload
Administrators can upload questions in bulk using an Excel file through
the admin interface.
📌 Future Enhancements
Online deployment
Email notifications
More advanced analytics
Question categories and difficulty levels
Improved mobile responsiveness
Real-time quiz competitions
👨‍💻 Author
Charan K
GitHub: https://github.com/charan111-c
📄 License
This project is created for educational and project development
purposes.
