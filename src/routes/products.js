const express = require('express');
const router = express.Router();
let path = require('path');
const multer = require('multer');
const productsController = require('../controllers/productsController');

//implementación de multer para subida de archivos:---------------------
const storage = multer.diskStorage({
  destination:(req,file,cb) => {cb(null,path.join(__dirname,'../../public/images'));//areglar ruta
  },
  filename: (req,file,cb)=> {
    const newFileName= "product_" + Date.now() + path.extname(file.originalname);
    cb(null,newFileName);
  }
});

//ejecución de multer
const upload = multer({storage})
//----------------------------------------------------------------------


//definicion de luharpara almacenar archivos nuevos
// const storage = multer.diskStorage({
//   destination:(req,file,cb) => {
//     cb(null,path.join(__dirname,'/'));//areglar ruta
//   },
// filename: (req,file,cb)=> {
//   const newFileName= date.now + path.extname(file.originalname);
//   cb(null,newFileName);
// }

// });
// //ejecución de multer
// const upload = multer({storage})


//Rutas
router.get('/brandOriginal',productsController.brandOriginal);
router.get('/brandBasics',productsController.brandBasics);
router.get('/producto/:id', productsController.producto);
router.get('/carrito', productsController.carrito);
router.get('/edicion',productsController.edicionTodos);
//admin-crear
router.get('/crear',productsController.crear); //acceder
router.post('/crear',upload.single("productImage"),productsController.crearProducto);
router.get('/editar/:id',productsController.editar);
router.put('/editar',upload.single("productImage"),productsController.editarProducto);

router.delete('/delete/:id',productsController.delete)

//router.post('/crear', productsController.crear); //crear-producto
//sprint 4
//router.get('/listar', productsController.listarproductos);
module.exports = router;
