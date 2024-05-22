Task Management Application
===========================

Introduction
------------

This is a task management application built with a modern front-end framework and a robust back-end API. The application allows users to create, update, and delete tasks, as well as view and filter tasks by status.

Features
--------

*   User-friendly interface for managing tasks
*   Create, update, and delete tasks
*   Filter tasks by status (e.g., "All," "To Do," "In Progress," "Done")
*   Responsive design for both desktop and mobile devices
*   RESTful API for task management
*   Server-side validation and error handling. JWT token are valid for a day.
*   Basic user authentication and authorization 
*   Task due dates and reminders. Users will have reminders of tasks due on the current date
*   Task sorting and searching capabilities (Sort by Name and Created Date and search by keyword in both title and description)
*   User profiles with avatars with capability to change them   

Technologies Used
-----------------

### Frontend

*   Nextjs
*   CSS (with Tailwind CSS)
*   NextUI
*   TypeScript
*   Yup for form validation
*   Formik for form management
*   Jest for testing


### Backend

*   Node.js with Express
*   PostgreSQL
*   Sequelize ORM
*   JWT for authentication
*   Jest for testing
*   Swagger for API documentation

Prerequisites
-------------

*   Node.js (v14 or higher)
*   PostgreSQL (v12 or higher)
*   Git
*   Yarn or npm

Installation
------------

### Backend

1.  Clone the repository:
    
    bash
    
    Copy code
    
    `git clone <repository-url> cd backend`
    
2.  Install dependencies:
    
    bash
    
    Copy code
    
    `yarn install`
    
3.  Create a `.env` file in the root directory and configure your environment variables:
    
    env
    
    Copy code
    
    `PORT=5000 DB_HOST=localhost DB_PORT=5432 DB_USER=your_db_user DB_PASSWORD=your_db_password DB_NAME=your_db_name JWT_SECRET=your_jwt_secret NODE_ENV=development`
    
4.  Run database migrations:
    
    bash
    
    Copy code
    
    `yarn sequelize db:migrate`
    
5.  Start the backend server:
    
    bash
    
    Copy code
    
    `yarn start`
    

### Frontend

1.  Clone the repository:
    
    bash
    
    Copy code
    
    `git clone <repository-url> cd frontend`
    
2.  Install dependencies:
    
    bash
    
    Copy code
    
    `yarn install`
    
3.  Create a `.env` file in the root directory and configure your environment variables:
    
    env
    
    Copy code
    
    `NEXT_PUBLIC_API_BASE_URL=http://localhost:5000`
    
4.  Start the frontend development server:
    
    bash
    
    Copy code
    
    `yarn dev`
    

Running Tests
-------------

### Backend Tests

To run backend tests, use the following command:

bash

Copy code

`yarn test`

### Frontend Tests

To run frontend tests, use the following command:

bash

Copy code

`yarn test`

API Documentation
-----------------

API documentation is available at `/api-docs` endpoint when the backend server is running. It is powered by Swagger.

Assumptions
-----------

*   Tasks must have a title, description, and valid status.
*   Users must be authenticated to perform CRUD operations on tasks.
*   Tasks are associated with users, and users can only manage their own tasks.
*   Notification of due tasks occurs only on the day of due date for the task.

Project Structure
-----------------

### Backend

*   `controllers/`: Contains the logic for handling API requests.
*   `models/`: Contains the Sequelize models for the database.
*   `routes/`: Defines the API endpoints and their handlers.
*   `middlewares/`: Contains middleware functions for authentication and validation.
*   `config/`: Configuration files for the database and Swagger.

### Frontend

*   `components/`: Reusable React components.
*   `pages/`: Next.js pages representing different routes.
*   `services/`: Contains functions for making API requests.
*   `context/`: Context providers for managing global state.
*   `styles/`: CSS and Tailwind CSS configuration files.
*   `public/`: Static resources used by the app.
*   `hooks/`: Custom hooks used by the app.
*   `helpers/`: Misc common code used by the app.

Contributions
-------------

Contributions are welcome! Please fork the repository and submit a pull request for review.

License
-------

This project is licensed under the MIT License. See the `LICENSE` file for more details.

Contact
-------

For any questions or feedback, please contact \[sdptd20@gmail.com\].

* * *

By following the above steps, you can set up and run the task management application on your local machine. For any further details, refer to the provided documentation and comments within the code.