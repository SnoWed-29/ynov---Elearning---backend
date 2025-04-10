// src/models/Quiz.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Module = require('./Module'); // Import the Module model
const Quiz = sequelize.define('Quiz', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    quizName: { // Changed from name to quizName
      type: DataTypes.STRING,
      allowNull: false,
    },
     description: { // Added description field
      type: DataTypes.TEXT,
      allowNull: true,
    },
    passingScore: { // Added passingScore field
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
  module.exports = Quiz;