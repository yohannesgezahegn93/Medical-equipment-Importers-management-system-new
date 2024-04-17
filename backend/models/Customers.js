// models/Customers.js
const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const Customers = sequelize.define('Customers', {
  customer_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  customer_type: {
    type: DataTypes.STRING,
    allowNull: true
  },
  customer_name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  customer_address: {
    type: DataTypes.STRING,
    allowNull: false
  },
  contact_number: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false
  },
  registration_date: {
    type: DataTypes.DATE,
    allowNull: false
  }
});

module.exports = Customers;
