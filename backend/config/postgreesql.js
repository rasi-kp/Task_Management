const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: 'postgres',
    logging: false 
});

sequelize.authenticate()
  .then(() => {
    console.log('databas connected.....');
  })
  .catch(err => {
    console.error('Unable to connect....:', err);
  });

module.exports = sequelize;
