// src/models/Specialite.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');


const Specialite = sequelize.define('Specialite', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    specialityName: { // Changed from name to specialityName
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    description: { // Added description field
      type: DataTypes.TEXT,
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
  module.exports = Specialite;