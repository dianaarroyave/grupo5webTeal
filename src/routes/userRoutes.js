const express = require('express');
const router = express.Router();
const { viewRegister, viewLogin, userCreate } = require('../controllers/userController.js');


router.get('/register', viewRegister);
router.post('/register', userCreate);

router.get('/login', viewLogin),

    module.exports = router;