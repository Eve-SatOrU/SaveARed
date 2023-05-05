const { DataTypes } = require('sequelize');
const sequelize = require('../util/database');

const BloodBank = sequelize.define('BloodBank', {
  bloodType: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  stock: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 1,
    // instead of 0
  },
});

module.exports = BloodBank;
