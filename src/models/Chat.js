const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
 // Assuming you have your Sequelize instance configured in 'database.js'

const Chat = sequelize.define('Chat', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    chatName: { // Changed from name to chatName
      type: DataTypes.STRING,
      allowNull: false,
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
  module.exports = Chat;