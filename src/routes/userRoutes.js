const express = require('express');
const router = express.Router();
const userCreate = require('../controllers/userController.js');

router.post('/register', userCreate);

module.exports = router;