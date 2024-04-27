// models/User.js
const { DataTypes } = require('sequelize');
const sequelize = require('../db');
const bcrypt = require('bcrypt');

const User = sequelize.define('User', {
  name:{
    type: DataTypes.STRING,
    allowNull: false,
  },
  lastName:{ 
    type: DataTypes.STRING,
    allowNull: false,
  },
 
  userName:{
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  phoneNumber:{
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  occupation:{
    type: DataTypes.STRING,
    allowNull: false,

  },
  profilePicture:{
    type: DataTypes.STRING,
    allowNull: true
  }

}, {
  hooks: {
    beforeCreate: async (user) => {
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(user.password, salt);
    }
  }
});

User.prototype.isValidPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

module.exports = User;
