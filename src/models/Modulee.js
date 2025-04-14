// src/models/Module.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Niveau = require('./Niveau'); // Import the Niveau model

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
    niveauId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Niveau,
        key: 'id',
      },
    },
    isGlobal:{
      type: DataTypes.BOOLEAN,
      defaultValue: false,
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