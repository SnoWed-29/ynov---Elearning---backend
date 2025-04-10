const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');


const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  userName: { // Changed from name to userName
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
    },
  },
   password: { // Added password field
      type: DataTypes.STRING,
      allowNull: false,
    },
  dob: {
    type: DataTypes.DATE,
  },
   profile_picture: { // Added profile_picture field
      type: DataTypes.STRING,
      allowNull: true,
    },
  niveau_id: {
    type: DataTypes.INTEGER,
    allowNull: false, // Assuming every user belongs to a level
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

module.exports = User;