// models/Buyers.js
const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const Buyers = sequelize.define('Buyers', {
  buyer_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  buyer_type: {
    type: DataTypes.STRING,
    allowNull: false
  },
  buyer_name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  buyer_address: {
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

module.exports = Buyers;
