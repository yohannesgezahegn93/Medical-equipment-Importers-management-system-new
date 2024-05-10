// db.js
const Sequelize = require('sequelize');

const sequelize = new Sequelize('my_database_2', 'root', '', {
  host: 'localhost',
  dialect: 'mysql'
});

module.exports = sequelize;
