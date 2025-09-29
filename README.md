Quizers - Full-Stack Quiz Application
Quizers is a full-stack web application that allows administrators to create dynamic quizzes and users to join and complete them using a unique code. The application features a Node.js backend with an SQLite database and a responsive React frontend built with Vite.

✨ Core Features
Admin Dashboard: Admins can create new quizzes, set titles, specify a time duration, and add multiple questions.

Unique Join Codes: Each created quiz is assigned a unique 4-digit code for users to join.

User Quiz Flow:

Join a specific quiz using its 4-digit code.

Navigate between questions with "Next" and "Previous" buttons.

Submit answers when finished or when the timer runs out.

Dynamic Question Support: Each question includes the question text, multiple-choice options, and a designated correct answer.

Scoring & Results: The backend calculates the user's score upon submission.

Answer Review (Bonus): On the results page, users can see their score and a detailed breakdown of which questions they answered correctly and incorrectly.

Quiz Timer (Bonus): Each quiz has a countdown timer, and the quiz is automatically submitted when time expires.

Tech Stack
Backend: Node.js, Express.js

Frontend: React (with Vite)

Database: SQLite

API Client: Axios

Getting Started
Follow these instructions to get the project up and running on your local machine.

Prerequisites
Node.js (version 18.x or higher is recommended)

npm (comes with Node.js)

Local Setup & Installation
Clone the repository:

git clone <your-repository-url>
cd quiz-app

Setup the Backend:

Navigate to the backend directory and install dependencies.

cd backend
npm install

Start the backend server. The server will run on http://localhost:3001.

npm run dev

The first time you run the server, a quiz.db file will be automatically created.

Setup the Frontend:

Open a new terminal window.

Navigate to the frontend directory and install dependencies.

cd frontend
npm install

Start the frontend development server. The application will be accessible at http://localhost:5173 (or another port if 5173 is busy).

npm run dev

You should now have both the backend and frontend running and can access the application in your browser.

How to Use
Admin: Creating a Quiz
Open the application in your browser (http://localhost:5173).

Click the "Admin Panel" button in the navigation bar.

Fill in the "Quiz Title" and "Duration (in seconds)".

Add your questions and options. Mark the correct option using the radio button next to it.

Click "Add Another Question" to add more questions.

Click "Create Quiz". A success message will appear with the unique 4-digit join code. Share this code with users.

User: Taking a Quiz
Open the application in your browser.

On the "Join Quiz" page, enter the 4-digit code you received from the admin.

Click "Join Quiz".

Answer the questions. The timer will be counting down at the top.

Use "Next" and "Previous" to navigate.

Click "Submit" on the last question to see your results.

Running Tests
The backend includes test cases for the core scoring logic to ensure accuracy.

Navigate to the backend directory:

cd backend

Run the tests:

# (Assuming a test runner like Jest is configured)
npm test

Assumptions & Design Choices
Database: SQLite was chosen for its simplicity, serverless nature, and ease of setup (file-based), making it ideal for a project of this scope without requiring a separate database server.

Join Code: A simple 4-digit numeric code was implemented for ease of use. While not globally unique for a large-scale system, it is sufficient for this application's scope and is guaranteed to be unique within the local database at the time of creation.

No Authentication: To keep the focus on the core quiz functionality, an admin authentication system was not implemented. The admin dashboard is publicly accessible. In a production environment, this would be secured behind a login system.

State Management: React's built-in state management (useState, props) was used as it is sufficient for the application's complexity. No external state management libraries like Redux were needed.
