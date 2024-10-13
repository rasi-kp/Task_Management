const express = require('express');
const router = express.Router();
const { register, login, getTasks, createTask, updateTask, deleteTask } = require('../controller/user');
const { auth } = require('../midleware/isAuthUser');

// User routes
router.post('/register', register);
router.post('/login', login);

// Task routes (protected)
router.get('/tasks', auth, getTasks);
router.post('/tasks', auth, createTask);
router.put('/tasks/:id', auth, updateTask);
router.delete('/tasks/:id', auth, deleteTask);

module.exports = router;
