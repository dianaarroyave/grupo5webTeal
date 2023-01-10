const express = require('express');
const router = express.Router();
const { viewRegister, viewLogin, userCreate, userLogin, editRender, userEdit, logout } = require('../controllers/userController.js');
const userUpload = require('../middlewares/userImageMiddleware');

router.get('/register', viewRegister);
router.post('/register', userUpload.single("userImage") , userCreate);

router.get('/login', viewLogin);
router.post('/login', userLogin);

router.get('/userDetail', editRender);
router.post('/userDetail', userEdit);
// router.get('/passwordUpdate', viewPasswordUpdate);

router.post('/closeSession', logout);


module.exports = router;
