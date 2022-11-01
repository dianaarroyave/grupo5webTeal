const express = require('express');
const router = express.Router();
const mainController = require('../controllers/mainControllers');

//Rutas
router.get('/', mainController.home);
router.get('/aboutUs', mainController.aboutUs);
router.get('/login', mainController.login);
router.get('/registro', mainController.registro);

module.exports = router;
