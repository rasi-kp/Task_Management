const { DataTypes } = require('sequelize');
const sequelize = require('../config/postgreesql');

// User model
const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password_hash: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  created_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
}, {
  tableName: 'users',
  timestamps: false,
});
// // Sync the model with the database
// (async () => {
//   try {
//     await User.sync({ alter: true });
//     console.log('User table updated!');
//   } catch (error) {
//     console.error('Error syncing user table:', error);
//   }
// })();
module.exports = User;
