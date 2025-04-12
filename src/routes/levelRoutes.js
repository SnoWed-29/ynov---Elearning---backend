const express = require('express');
const { getAllLevels, getAllSpecialities } = require('../controllers/LevelController');
const router = express.Router();

router.get('/levels', getAllLevels);
router.get('/specialities', getAllSpecialities);

module.exports = router;