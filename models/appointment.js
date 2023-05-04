const { Model } = require('sequelize');
const Sequelize = require('sequelize');
const { DataTypes } = require('sequelize');
const sequelize = require('../util/database');
const Request = require('./request');
const User = require('./user');
const Appointment = sequelize.define(
'Appointment',
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true
    },
    appointmentDate: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    appointmentTime: {
      type: DataTypes.TIME,
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING,
      defaultValue: 'pending',
    },
  },
  {
    sequelize,
    modelName: 'Appointment',
  }
);

Appointment.belongsTo(User, { as: 'donor', foreignKey: 'donorId' });
Appointment.belongsTo(Request, { foreignKey: 'requestId', onDelete: 'CASCADE' });
module.exports = Appointment;
