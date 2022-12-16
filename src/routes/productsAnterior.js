const express = require('express');
const router = express.Router();
let path = require('path');
const multer = require('multer');
const productsController = require('../controllers/productsController');

//implementación de multer para subida de archivos:---------------------
const storage = multer.diskStorage({
  destination:(req,file,cb) => {
    cb(null,path.join(__dirname,'../../public/productImages'));//areglar ruta
  },
  filename: (req,file,cb)=> {
    const newFileName= "product_" + Date.now() + path.extname(file.originalname);
    cb(null,newFileName);
  }
});

//ejecución de multer
const upload = multer({storage})

//Rutas
router.get('/brandOriginal',productsController.brandOriginal);
router.get('/brandBasics',productsController.brandBasics);
router.get('/productDetail/:id', productsController.productDetail);
router.get('/bag', productsController.bag);
router.get('/adminProducts',productsController.adminProductsAll);
//admin-crear
router.get('/newProduct',productsController.newProduct); //acceder
router.post('/newProduct',upload.single("productImage"),productsController.createProduct);
router.get('/productEdition/:id',productsController.productEdition);
router.put('/productEdition',upload.single("productImage"),productsController.editProduct);
router.delete('/delete/:id',productsController.delete)

module.exports = router;
