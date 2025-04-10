// src/app.js
const express = require('express');
const sequelize = require('./config/db'); // Import the sequelize instance
const models = require('./models'); // Import your models
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON request bodies
app.use(express.json());

// Basic route for testing
app.get('/', (req, res) => {
  res.send('E-Learning Platform API is running!');
});

// Function to sync the database
async function syncDatabase() {
  try {
    await sequelize.sync({ force: true }); // Set force: true to drop and recreate tables (CAUTION: This deletes data)
    console.log('Database synced successfully.');
  } catch (error) {
    console.error('Error syncing database:', error);
  }
}

// Call the syncDatabase function when the app starts
syncDatabase();

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

module.exports = app;