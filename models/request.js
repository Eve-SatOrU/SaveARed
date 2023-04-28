const { Model } = require('sequelize');
const Sequelize =require('sequelize');
const { DataTypes } = require('sequelize'); // Import DataTypes from Sequelize
const sequelize = require('../util/database');


class Request extends Model {}

Request.init(
  {
    fullName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phoneNumber: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    bloodGroup: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    gender: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    quantity: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING,
      defaultValue: 'pending',
    },
  },
  {
    sequelize,
    modelName: 'request',
  }
);

module.exports = Request;