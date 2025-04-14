// src/models/Niveau.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');


const Niveau = sequelize.define('Niveau', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    levelName: { 
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    description: { 
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
  module.exports = Niveau;