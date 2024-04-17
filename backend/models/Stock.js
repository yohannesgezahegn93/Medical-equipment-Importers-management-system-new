// models/Stock.js
const { DataTypes } = require('sequelize');
const sequelize = require('../db');
const Sales = require('./Sales');
const Suppliers = require('./Suppliers');

const Stock = sequelize.define('Stock', {
  item_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  item_name: {
    type: DataTypes.STRING,
    allowNull: true
  },
  model: {
    type: DataTypes.STRING,
    allowNull: true
  },
  serialNumber: {
    type: DataTypes.STRING,
    allowNull: true,
    unique: true
  },
  manufacturer: {
    type: DataTypes.STRING,
    allowNull: true
  },
  countryOfOrigin: {
    type: DataTypes.STRING,
    allowNull: true
  },
  description: {
    type: DataTypes.STRING,
    allowNull: true
  },
  quantity_available: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  unit_cost: {
    type: DataTypes.FLOAT,
    allowNull: true
  },
  buy_threshold_quantity: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  expiry_date: {
    type: DataTypes.DATE,
    allowNull: true
  },
 
  purchased_date: {
    type: DataTypes.DATE,
    allowNull: true
  }
});

Stock.belongsTo(Suppliers, { foreignKey: 'supplier_id' });
module.exports = Stock;


