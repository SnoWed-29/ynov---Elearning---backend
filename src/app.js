// src/app.js
const express = require('express');
const sequelize = require('./config/db'); 
const app = express();
const models = require('./models'); 
const userRoutes = require('./routes/userRoutes'); 
const levelRoutes = require('./routes/levelRoutes');

const PORT = process.env.PORT || 3000;
const cors = require('cors');

app.use(express.json());
app.use(cors({
    origin: '*', // Allow all origins (for development purposes)
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed HTTP methods
    allowedHeaders: ['Content-Type', 'Authorization'], // Allowed headers
}));

// Use the user routes
app.use('/api', userRoutes);
app.use('/api', levelRoutes); // Import and use the specialite routes

// Function to sync the database
async function syncDatabase() {
  try {
    await sequelize.sync({ force: false }); // Set to true to drop and recreate tables
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