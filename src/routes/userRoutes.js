const express = require('express');
const router = express.Router();
const { viewRegister, viewLogin, userCreate, userLogin } = require('../controllers/userController.js');


router.get('/register', viewRegister);
router.post('/register', userCreate);

router.get('/login', viewLogin);
router.post('/login', userLogin);

module.exports = router;