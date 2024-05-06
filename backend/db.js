// db.js
const Sequelize = require('sequelize');

const sequelize = new Sequelize('my_database', 'root', '', {
  host: 'localhost',
  dialect: 'mysql'
});

module.exports = sequelize;
