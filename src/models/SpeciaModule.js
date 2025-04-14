const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Specialite = require('./Specialite'); // Assuming you have a Specialite model defined
const SpecialModule = sequelize.define('SpecialModule', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    specialiteId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Specialite,
        key: 'id',
      },
    },
    moduleId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Module', // Will be defined below
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
  module.exports = SpecialModule;