const express = require('express');
const router = express.Router();
const {
    viewNewProduct,
    viewAdminProduct,
    aboutUs,
    brandOriginal,
    brandBasics,
    bag,
    viewProductDetail,
    newProduct,
    viewProductEdition
} = require('../controllers/productsController.js');
// const upload = require('../middlewares/imagesUploading');

//Multer------------------------------------------------------------------
const multer = require('multer');
let path = require('path');
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
      cb(null, path.join(__dirname, '../../public/productImages'));
  },
  // filename: function(req, file, cb) {
  //     cb(null, path.extname(file.originalname) );
  // },
  filename: (req,file,cb)=> {
      const newFileName= "product_" + Date.now() + path.extname(file.originalname);
      cb(null,newFileName);
    }
});

const upload = multer({ storage });
//------------------------------------------------------------------------


router.get('/newProduct', viewNewProduct);
router.post('/newProduct', upload.single("productImage"), newProduct);

router.get('/adminProducts', viewAdminProduct);
router.get('/productEdition/:id', viewProductEdition);

router.get('/brandOriginal', brandOriginal);
router.get('/brandBasics', brandBasics);
router.get('/productDetail', viewProductDetail);

router.get('/bag', bag)
module.exports = router;
