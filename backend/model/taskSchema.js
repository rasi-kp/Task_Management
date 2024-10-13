const { DataTypes } = require('sequelize');
const sequelize = require('../config/postgreesql');
const User = require('./userShema');

// Task model
const Task = sequelize.define('Task', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  completed: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  parent_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,  // Reference the User model
      key: 'id',
    },
  },
  created_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,  // timestamp
  },
}, {
  tableName: 'tasks',
  timestamps: false,
});
// // Sync the model with the database
// (async () => {
//   try {
//     await Task.sync({ alter: true });
//     console.log('Task table updated!');
//   } catch (error) {
//     console.error('Error syncing user table:', error);
//   }
// })();
// Relationship
Task.belongsTo(User, { foreignKey: 'user_id', onDelete: 'CASCADE' });

module.exports = Task;
