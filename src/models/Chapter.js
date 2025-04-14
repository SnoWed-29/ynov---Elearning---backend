// src/models/Chapter.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Module = require('./Modulee'); // Import the Module model

const Chapter = sequelize.define('Chapter', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    chapterName: { // Changed from name to chapterName
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: { // Added description field
      type: DataTypes.TEXT,
      allowNull: true,
    },
    order: { // Added order field
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    moduleId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Module,
        key: 'id',
      },
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
  
module.exports = Chapter;