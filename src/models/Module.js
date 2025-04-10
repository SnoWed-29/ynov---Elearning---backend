// src/models/Module.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');


const Module = sequelize.define('Module', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    moduleName: { // Changed from name to moduleName
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: { // Added description field
      type: DataTypes.TEXT,
      allowNull: true,
    },
    estimatedTime: { // Added estimatedTime field
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  });
  module.exports = Module;