const express = require('express');
const router = express.Router();
const { viewRegister, userCreate, viewLogin, userLogin, viewUserDetail, viewPasswordUpdate, closeSession } = require('../controllers/userController.js');


router.get('/register', viewRegister);
router.post('/register', userCreate);

router.get('/login', viewLogin);
router.post('/login', userLogin);
router.get('/userDetail', viewUserDetail);
router.get('/passwordUpdate', viewPasswordUpdate);
router.post('/', closeSession);

module.exports = router;