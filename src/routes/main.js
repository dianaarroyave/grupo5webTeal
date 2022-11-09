const express = require('express');
const router = express.Router();
let path = require('path');
const multer = require('multer');
const mainController = require('../controllers/mainController');

//implementación de multer para subida de archivos:---------------------
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../../public/userImages')); //areglar ruta, el destino
  },
  filename: (req, file, cb) => {
    const newFileName =
      'user_' + Date.now() + path.extname(file.originalname);
    cb(null, newFileName);
  },
});

//ejecución de multer
const upload = multer({ storage });

//Rutas
router.get('/', mainController.home);
router.get('/aboutUs', mainController.aboutUs);
router.get('/login', mainController.login);
router.get('/register', mainController.register);
router.post('/register',upload.single("userImage"),mainController.createUser);
//admin-crear
router.get('/userDetail', mainController.userDetail);
// router.post('/userDetail',upload.single("productImage"),mainController.createUser);
router.delete('/delete/:id',mainController.delete)

module.exports = router;
