# Task Management System with Authorization and Performance Optimization

This Task Management System allows users to create, view, and manage their tasks efficiently. The application implements user authorization, handles nested tasks, and is optimized for performance with comprehensive error handling.

## Overview

The application consists of a Node.js backend with a PostgreSQL database and a React frontend. Users can register, log in, and manage tasks, including the ability to create subtasks.

## Features

### User Authentication
- User registration with validation for unique usernames and secure password storage.
- User login with JWT (JSON Web Token) for session management.
- Comprehensive error handling for authentication processes.

### Task Management
- Users can create, view, update, and delete tasks.
- Support for nested tasks (subtasks) with a clean and organized user interface.
- Pagination to optimize performance.


## Node.js Backend

### Setup Express Server
- Use Express to set up a RESTful API with the following endpoints:

  - `POST /register`: Register a new user .
  - `POST /login`: Authenticate users .
  - `GET /tasks`: Retrieve all tasks user with pagination.
  - `POST /tasks`: Create a new task .
  - `PUT /tasks/:id`: Update the task.
  - `DELETE /tasks/:id`: Delete a task .

## React Frontend

### User Interface
- **Registration Form**: Allows users to register with a username and password, displaying error messages for validation issues.
- **Login Form**: Authenticates users and stores the JWT in local storage .
- **Task Management**:
  - Displays a list of tasks for the logged-in user, including subtasks in a nested format.
  - Implements a form to create new tasks and subtasks with error handling for invalid input.
  - Allows users to mark tasks as completed and delete tasks, with appropriate error handling.
  - Uses pagination to display tasks, optimizing performance for large datasets.

### Error Handling
- Comprehensive error handling to display user-friendly messages for all API errors.
- Utilizes toast notifications to show success and error messages for actions like task creation, updates, and deletions.

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/rasi-kp/Task_Management.git
   cd Task_Management

2. add .env file:

   ```bash
   PORT=5000
   DATABASE_URL=postgresql://postgres:password@localhost:5432/task_manager
   JWT_SECRET_USER="user"
