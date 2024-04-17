// models/Payments.js
const { DataTypes } = require('sequelize');
const sequelize = require('../db');
const Customers = require('./Customers');


const Payments = sequelize.define('Payments', {
  payment_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  amount: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  payment_date: {
    type: DataTypes.DATE,
    allowNull: false
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false
  }
});
Payments.belongsTo(Customers, { foreignKey: 'customer_id' });
module.exports = Payments;
