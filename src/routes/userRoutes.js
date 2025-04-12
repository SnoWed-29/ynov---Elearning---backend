const express = require('express');
const { registerUser } = require('../controllers/userController'); // Import the registerUser function
const router = express.Router();

router.post('/register', registerUser);

module.exports = router;