// src/models/Video.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Chapter = require('./Chapter'); // Assuming you have a Chapter model defined

const Video = sequelize.define('Video', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    videoName: { // Changed from name to videoName
      type: DataTypes.STRING,
      allowNull: false,
    },
    url: { // Added url field
      type: DataTypes.STRING,
      allowNull: false,
    },
    duration: { // Added duration field
      type: DataTypes.INTEGER,
      allowNull: true,
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
  module.exports = Video;