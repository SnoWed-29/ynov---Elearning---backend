const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Niveau = require('./Niveau'); // Assuming you have a Niveau model defined
const Specialite = require('./Specialite'); // Assuming you have a Specialite model defined
 // Assuming you have your Sequelize instance configured in 'database.js'

const NiveauxSpecialite = sequelize.define('NiveauxSpecialite', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    niveauId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Niveau,
        key: 'id',
      },
    },
    specialiteId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Specialite, // Will be defined below
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
  module.exports = NiveauxSpecialite;