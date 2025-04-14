const express = require('express');
const { getUsersModulesList } = require('../controllers/courseController');
const router = express.Router();

router.post('/userModulesList', getUsersModulesList);

module.exports = router;