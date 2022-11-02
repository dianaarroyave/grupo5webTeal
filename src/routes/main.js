const express = require('express');
const router = express.Router();
const mainController = require('../controllers/mainControllers');

//Rutas
router.get('/', mainController.home);
router.get('/aboutUs', mainController.aboutUs);
router.get('/login', mainController.login);
router.get('/register', mainController.register);
//admin-crear
router.get('/userDetail', mainController.userDetail);
// router.post('/userDetail',upload.single("productImage"),mainController.createUser);
router.delete('/delete/:id',mainController.delete)

module.exports = router;
