const Sequelize =require('sequelize');
const { DataTypes } = require('sequelize'); // Import DataTypes from Sequelize
const sequelize = require('../util/database');

const User = sequelize.define('user', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  userType :{
    type: DataTypes.ENUM('donor', 'receiver'),
    allowNull: false
  },
  userName:Sequelize.STRING,
  email:Sequelize.STRING,
  userPassword:Sequelize.STRING,
}
);

module.exports = User;