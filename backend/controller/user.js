const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../model/userShema');
const Task = require('../model/taskSchema');

module.exports = {
  login: async (req, res) => {
    const { username, password } = req.body;
    try {
      // Find user by username
      const user = await User.findOne({ where: { username } });
      if (!user) {
        return res.status(400).json({ error: 'Invalid User' });
      }
      // Compare passwords
      const isValidPassword = await bcrypt.compare(password, user.password_hash);
      if (!isValidPassword) {
        return res.status(400).json({ error: 'Invalid Password' });
      }
      // Issue JWT
      const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET_USER, { expiresIn: '1h' });
      return res.status(200).json({ token, username: user.username });
    } catch (error) {
      return res.status(500).json({ error: 'Internal server error' });
    }
  },
  register: async (req, res) => {
    const { username, password } = req.body;
    try {
      // Check for duplicate usernames
      const existingUser = await User.findOne({ where: { username } });
      if (existingUser) {
        return res.status(400).json({ error: 'Username already taken' });
      }
      // Hash the password
      const password_hash = await bcrypt.hash(password, 10);

      // Create new user
      const user = await User.create({ username, password_hash });
      return res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
      return res.status(500).json({ error: 'Internal server error' });
    }
  },
  getTasks: async (req, res) => {
    const userId = req.user.id;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    try {
      // Fetch paginated tasks
      const tasks = await Task.findAll({
        where: { user_id: userId },
        offset: (page - 1) * limit,
        limit,
      });

      // Helper function to nest tasks based on parent_id
      const nestTasks = (tasks) => {
        const taskMap = {};

        // Initialize task map
        tasks.forEach((task) => {
          taskMap[task.id] = { ...task.toJSON(), children: [] };
        });

        // Create nested structure
        const nestedTasks = [];

        tasks.forEach((task) => {
          if (task.parent_id) {
            taskMap[task.parent_id]?.children.push(taskMap[task.id]);
          } else {
            nestedTasks.push(taskMap[task.id]);
          }
        });

        return nestedTasks;
      };

      const nestedTasks = nestTasks(tasks);

      return res.status(200).json({ tasks: nestedTasks });
    } catch (error) {
      console.error('Error fetching tasks:', error);
      return res.status(500).json({ error: 'Failed to fetch tasks' });
    }
  },
  // getTasks: async (req, res) => {
  //   const userId = req.user.id;
  //   const page = parseInt(req.query.page) || 1;
  //   const limit = parseInt(req.query.limit) || 10;
  //   try {
  //     // Fetch paginated tasks
  //     const tasks = await Task.findAll({
  //       where: { user_id: userId },
  //       offset: (page - 1) * limit,
  //       limit
  //     });

  //     return res.status(200).json({ tasks });
  //   } catch (error) {
  //     return res.status(500).json({ error: 'Failed to fetch tasks' });
  //   }
  // },
  createTask: async (req, res) => {
    const { title, parent_id,comlpleted } = req.body;
    const userId = req.user.id; // Authenticated user ID
    try {
      const task = await Task.create({ title, user_id: userId, parent_id:parent_id||null,comlpleted});
      return res.status(201).json({ sucess:"successfully created" });
    } catch (error) {
      return res.status(400).json({ error: 'Invalid task data' });
    }
  },
  updateTask: async (req, res) => {
    const { id } = req.params;
    const userId = req.user.id;
    const updateData = req.body; // All fields
  
    try {
      const task = await Task.findOne({ where: { id, user_id: userId } });
      
      if (!task) {
        return res.status(404).json({ error: 'Task not found' });
      }
      // Update task 
      await task.update(updateData);
  
      return res.status(200).json({ message: 'Task updated successfully', task });
    } catch (error) {
      return res.status(500).json({ error: 'Failed to update task' });
    }
  },
  
  deleteTask: async (req, res) => {
    const { id } = req.params;
    const userId = req.user.id;

    try {
      const task = await Task.findOne({ where: { id, user_id: userId } });
      if (!task) {
        return res.status(404).json({ error: 'Task not found' });
      }

      await task.destroy();
      return res.status(200).json({ message: 'Task deleted successfully' });
    } catch (error) {
      return res.status(500).json({ error: 'Failed to delete task' });
    }
  }

}