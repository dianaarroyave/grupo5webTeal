const express = require('express');
const router = express.Router();
const { viewRegister, viewLogin, userCreate, userLogin, editRender, userEdit, logout } = require('../controllers/userController.js');


router.get('/register', viewRegister);
router.post('/register', userCreate);

router.get('/login', viewLogin);
router.post('/login', userLogin);
// router.get('/userDetail', viewUserDetail);
// router.get('/passwordUpdate', viewPasswordUpdate);
// router.post('/', closeSession);

router.get('/userDetail', editRender);
router.post('/userDetail', userEdit);

router.post('/closeSession', logout);


module.exports = router;
