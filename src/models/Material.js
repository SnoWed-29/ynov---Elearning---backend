// src/models/Material.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Chapter = require('./Chapter'); // Assuming Chapter model is defined in Chapter.js

const Materials = sequelize.define('Materials', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    materialName: { // Changed from name to materialName
      type: DataTypes.STRING,
      allowNull: false,
    },
   file_path: { // Added file_path field
      type: DataTypes.STRING,
      allowNull: false,
    },
    file_type: { // Added file_type field
      type: DataTypes.STRING,
      allowNull: false,
    },
     description: { // Added description field
      type: DataTypes.TEXT,
      allowNull: true,
    },
    chapterId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Chapter,
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
  module.exports = Materials;