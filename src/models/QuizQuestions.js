// src/models/QuizQuestion.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Quiz = require('./Quiz');

const QuizQuestion = sequelize.define('QuizQuestion', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  questionText: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  options: {
    type: DataTypes.JSON, // Store options as a JSON array
    allowNull: false,
  },
  correctAnswer: {
    type: DataTypes.STRING, // Or DataTypes.INTEGER, depending on how you store the answer
    allowNull: false,
  },
  quizId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Quiz,
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


module.exports = QuizQuestion;