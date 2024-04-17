// models/Suppliers.js
const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const Suppliers = sequelize.define('Suppliers', {
  supplier_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  supplier_name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  supplier_address: {
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

module.exports = Suppliers;
