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
- Pagination to optimize performance when displaying large datasets.

### Error Handling
- User-friendly error messages for all API errors (e.g., network issues, server errors, validation errors).
- Toast notifications to display success and error messages for user actions (task creation, updates, deletions).

## Database Setup

### PostgreSQL Database
1. Create a PostgreSQL database named `task_manager`.
2. Create the following tables:

   #### Users Table
   - `id`: Primary key
   - `username`: Unique string
   - `password_hash`: String (store hashed passwords)
   - `created_at`: Timestamp

   #### Tasks Table
   - `id`: Primary key
   - `title`: String
   - `completed`: Boolean
   - `parent_id`: Foreign key (nullable for top-level tasks)
   - `user_id`: Foreign key (to associate tasks with users)
   - `created_at`: Timestamp

## Node.js Backend

### Setup Express Server
- Use Express to set up a RESTful API with the following endpoints:

  - `POST /register`: Register a new user with validation for unique usernames and strong passwords.
  - `POST /login`: Authenticate users and return a JWT. Handle errors for incorrect credentials.
  - `GET /tasks`: Retrieve all tasks for the authenticated user with pagination.
  - `POST /tasks`: Create a new task with optional subtasks and handle validation errors.
  - `PUT /tasks/:id`: Update the status of a task (mark as completed) and return errors if the task does not exist.
  - `DELETE /tasks/:id`: Delete a task and return appropriate error messages if the task does not belong to the user.

## React Frontend

### User Interface
- **Registration Form**: Allows users to register with a username and password, displaying error messages for validation issues.
- **Login Form**: Authenticates users and stores the JWT in local storage for subsequent requests. Displays error messages for failed login attempts.
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
   git clone https://github.com/your-username/task-management-system.git
   cd task-management-system
