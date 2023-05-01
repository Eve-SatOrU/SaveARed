const { DataTypes } = require('sequelize');
const sequelize = require('../util/database');
const User = require('./user');

const Notification = sequelize.define('notification', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  message: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});
// Notification.belongsTo(User, { foreignKey: 'adminId' });
 
module.exports = Notification;
