const { DataTypes } = require('sequelize');
const sequelize = require('../db');
const Stock = require('./Stock');
const Customers = require('./Customers');

const Sales = sequelize.define('Sales', {
  sale_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  sale_price: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  quantity_sold: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  sale_date: {
    type: DataTypes.DATE,
    allowNull: false
  },
  delivery_date: {
    type: DataTypes.DATE,
    allowNull: false
  }
});

Sales.belongsTo(Stock, { foreignKey: 'item_id' });
Sales.belongsTo(Customers, { foreignKey: 'customer_id' });

module.exports = Sales;
