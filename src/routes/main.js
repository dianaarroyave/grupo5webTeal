const express = require('express');
const router = express.Router();
const home = require('../controllers/mainController.js');



router.get('/', home);

module.exports = router;