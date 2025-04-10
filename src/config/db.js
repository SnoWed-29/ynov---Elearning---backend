// src/config/database.js
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
  'elearning_ynov_05', // Replace with your database name
  'root',      // Replace with your database username
  '',      // Replace with your database password
  {
    host: 'localhost',
    dialect: 'mysql', // Or your database dialect
    logging: false,      // Set to true to see SQL queries in the console
  }
);

module.exports = sequelize;