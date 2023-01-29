const express = require('express');
const router = express.Router();
const { home, aboutUs, } = require('../controllers/mainController');


router.get('/', home);
router.get('/aboutUs', aboutUs);


module.exports = router;