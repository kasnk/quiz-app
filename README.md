
# Quizers - Full-Stack Quiz Application

Quizers is a full-stack web application designed to facilitate dynamic quiz creation and participation. Administrators can easily create quizzes with customized titles, durations, and a variety of questions. Users can then join and complete these quizzes using a unique, system-generated code. The application leverages a Node.js backend with an SQLite database for efficient data management and a responsive React frontend (built with Vite) for a seamless user experience.

## Core Features

-   **Admin Dashboard:** Intuitive interface for creating new quizzes, setting titles, defining time limits, and adding multiple questions.
-   **Unique Join Codes:** Each quiz is assigned a unique 4-digit code, ensuring controlled access for participants.
-   **User Quiz Flow:** Streamlined process for users to join quizzes using the unique code, navigate through questions, and submit their answers.
-   **Dynamic Question Support:** Flexible question format allowing for question text, multiple-choice options, and a designated correct answer.
-   **Scoring & Results:** Automated backend calculation of user scores upon quiz submission.
-   **Answer Review (Bonus):** Detailed breakdown of user performance, showing correct and incorrect answers for each question.
-   **Quiz Timer (Bonus):** Countdown timer for each quiz, automatically submitting the quiz upon expiration.

## Tech Stack

-   **Backend:** Node.js, Express.js
-   **Frontend:** React (with Vite)
-   **Database:** SQLite
-   **API Client:** Axios

## Getting Started

Follow these instructions to set up the project on your local machine.

### Prerequisites

Ensure that you have the following installed:

-   **Node.js:** (version 18.x or higher is recommended) - [https://nodejs.org/](https://nodejs.org/)
-   **npm:** (comes with Node.js)

### Local Setup & Installation

1.  **Clone the repository:**

    bash
        cd backend
        npm install
            -   The first time you run the server, a `quiz.db` file will be automatically created.

3.  **Setup the Frontend:**

    -   Open a new terminal window.
    -   Navigate to the frontend directory and install dependencies:

    You should now have both the backend and frontend running, and you can access the application in your browser.

## How to Use

### Admin: Creating a Quiz

1.  Open the application in your browser (`http://localhost:5173`).
2.  Click the "Admin Panel" button in the navigation bar.
3.  Fill in the "Quiz Title" and "Duration (in seconds)".
4.  Add your questions and options. Mark the correct option using the radio button next to it.
5.  Click "Add Another Question" to add more questions.
6.  Click "Create Quiz". A success message will appear with the unique 4-digit join code. Share this code with users.

### User: Taking a Quiz

1.  Open the application in your browser.
2.  On the "Join Quiz" page, enter the 4-digit code you received from the admin.
3.  Click "Join Quiz".
4.  Answer the questions. The timer will be counting down at the top.
5.  Use "Next" and "Previous" to navigate.
6.  Click "Submit" on the last question to see your results.

## Running Tests

bash
    cd backend
        >  This assumes you have a test runner like Jest configured. If not, you'll need to install and configure one.  For example: `npm install --save-dev jest`

## Assumptions & Design Choices

-   **Database:** SQLite was chosen for its simplicity, serverless nature, and ease of setup (file-based), making it ideal for a project of this scope without requiring a separate database server.
-   **Join Code:** A simple 4-digit numeric code was implemented for ease of use. While not globally unique for a large-scale system, it is sufficient for this application's scope and is guaranteed to be unique within the local database at the time of creation.
-   **No Authentication:** To keep the focus on the core quiz functionality, an admin authentication system was not implemented. The admin dashboard is publicly accessible. In a production environment, this would be secured behind a login system.
-   **State Management:** React's built-in state management (useState, props) was used as it is sufficient for the application's complexity. No external state management libraries like Redux were needed.

## Contributing

We welcome contributions to improve Quizers! Here's how you can contribute:

1.  Fork the repository.
2.  Create a new branch for your feature or bug fix.
3.  Make your changes and commit them with clear, concise messages.
4.  Submit a pull request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

>  Remember to create a LICENSE file in your repository.

## Troubleshooting

-   **Backend server not starting:** Ensure that Node.js is installed correctly and that the required dependencies are installed by running `npm install` in the `backend` directory.
-   **Frontend not displaying correctly:** Verify that the frontend server is running and that you have accessed the correct URL (`http://localhost:5173` or the port shown in your terminal). Also, check the browser's developer console for any errors.
-   **Database issues:** If the `quiz.db` file is not being created, check the backend server logs for any database connection errors. Ensure that you have write permissions in the `backend` directory.

## Documentation

-   [React Documentation](https://react.dev/)
-   [Node.js Documentation](https://nodejs.org/en/docs/)
-   [Express.js Documentation](https://expressjs.com/)
-   [Vite Documentation](https://vitejs.dev/)
-   [SQLite Documentation](https://www.sqlite.org/docs.html)
