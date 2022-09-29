const express = require('express');
const router = express.Router();
const productsController = require('../controllers/productsController');

//Rutas
router.get('/basics', productsController.basics);
router.get('/original', productsController.basics);
router.get('/producto', productsController.producto);
router.get('/carrito', productsController.carrito);
module.exports = router;