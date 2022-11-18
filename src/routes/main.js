const express = require('express');
const router = express.Router();
let path = require('path');
const multer = require('multer');
const mainController = require('../controllers/mainController');
const loginLookMiddleware = require('../middlewares/loginLookMiddleware');
//---express validation --------------------------------
const { body } = require('express-validator');
const validations = require('../middlewares/validations')

//implementación de multer para subida de archivos:---------------------
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../../public/userImages')); //areglar ruta, el destino
  },
  filename: (req, file, cb) => {
    const newFileName = 'user_' + Date.now() + path.extname(file.originalname);
    cb(null, newFileName);
  },
});
//ejecución de multer
const upload = multer({ storage });

//Rutas
router.get('/', mainController.home);
router.get('/aboutUs', mainController.aboutUs);
router.get('/login', mainController.viewLogin);
//------Login----------------------------------
router.post('/login', loginLookMiddleware , mainController.login);
//---------------------------------------------
router.get('/register', mainController.register);
router.post(
  '/register',upload.single('userImage'),validations,mainController.createUser);
//admin-crear
router.get('/userDetail', mainController.userDetail);
router.post(
  '/userDetail',
  upload.single('userImage'),
  mainController.createUser
);
router.get('/userDetail/:id', mainController.userEdition);
router.put('/userDetail', upload.single('userDetail'), mainController.editUser);
router.delete('/delete/:id', mainController.delete);
router.post('/closeSession', mainController.closeSession);

router.get('/passwordUpdate', mainController.passwordUpdateView);
router.post('/passwordUpdate', mainController.passwordUpdate);

//middleweares

// router.get('/login', function(req, res, next) {
//   next()
// }, mainController.login);


module.exports = router;
