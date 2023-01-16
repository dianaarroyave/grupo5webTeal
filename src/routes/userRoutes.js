const express = require('express');
const router = express.Router();

const userUpload = require('../middlewares/userImageMiddleware');
const { viewRegister, viewLogin, userCreate, userLogin, editRender, userEdit, logout, editPasswordRender, changePassword } = require('../controllers/userController.js');


router.get('/register', viewRegister);
router.post('/register', userUpload.single("userImage") , userCreate);

router.get('/login', viewLogin);
router.post('/login', userLogin);

router.get('/userDetail', editRender);
router.post('/userDetail',userUpload.single("userImage"), userEdit);
// router.get('/passwordUpdate', viewPasswordUpdate);

router.post('/closeSession', logout);

router.get('/passwordUpdate', editPasswordRender);
router.post('/passwordUpdate', changePassword);

module.exports = router;
