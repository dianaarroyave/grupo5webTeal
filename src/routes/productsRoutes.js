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
const upload = require('../middlewares/imagesUploading');

router.get('/newProduct', viewNewProduct);
router.post('/newProduct', upload.single("productImage"), newProduct);

router.get('/adminProducts', viewAdminProduct);
router.get('/productEdition/:id', viewProductEdition);

router.get('/brandOriginal', brandOriginal);
router.get('/brandBasics', brandBasics);
router.get('/productDetail', viewProductDetail);

router.get('/bag', bag)
module.exports = router;
