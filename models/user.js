const Sequelize = require('sequelize');
const { DataTypes } = require('sequelize');
const sequelize = require('../util/database');
const Notification = require('./notification');

const User = sequelize.define('user', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  userType: {
    type: DataTypes.ENUM('donor', 'receiver'),
    allowNull: false
  },
  userName: Sequelize.STRING,
  email: Sequelize.STRING,
  userPassword: Sequelize.STRING,
  sex: {
    type: DataTypes.ENUM('male', 'female'),
    allowNull: true
  },
  dateOfBirth: {
    type: DataTypes.DATEONLY,
    allowNull: true
  },
  phone: {
    type: Sequelize.STRING,
    allowNull: true
  },
  bloodGroup: {
    type: DataTypes.ENUM('A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'),
    allowNull: true
  }
});

User.hasMany(Notification, { foreignKey: 'adminId' });

module.exports = User;
