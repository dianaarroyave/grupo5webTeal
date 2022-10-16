const express = require('express');
const router = express.Router();
let path = require('path');
const multer = require('multer');
const productsController = require('../controllers/productsController');

//multer
//let multerDiskStorage = multer.multerDiskStorage({
   // destination:(req,file,callback)=>{
    //    let folder = path.join(__dirname,'../src/data');
    //    callback(null,folder);
  //  },
   // filename:(req,file,callback)=>{{
   //     let imageName = Date.now() + path.extname(file.originalname);
    //    callback(null,imageName);
   // }

//})



//Rutas
//prueba----------------------------------------------------
router.get('/brands?brand=original',productsController.brandsOriginal);
//--------------------------------------------------------
router.get('/brands',productsController.brands);
router.get('/basics', productsController.basics);
router.get('/original', productsController.original);
router.get('/producto', productsController.producto);
router.get('/carrito', productsController.carrito);
router.get('/edicion',productsController.edicion);
//admin-crear
router.get('/crear',productsController.crear); //acceder
//router.post('/crear', productsController.crear); //crear-producto
//sprint 4
//router.get('/listar', productsController.listarproductos);
module.exports = router;
