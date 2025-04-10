// models/UserModule.js (example path)
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const UserModule = sequelize.define('UserModule', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  createdAt: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  updatedAt: {
    type: DataTypes.DATE,
    allowNull: false,
  },
}, {
  tableName: 'UserModules', // Optional: explicitly set the table name
});

module.exports = UserModule;