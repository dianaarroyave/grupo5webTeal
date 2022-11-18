const express = require('express');
const router = express.Router();
let path = require('path');
const multer = require('multer');
const mainController = require('../controllers/mainController');
//---express validation --------------------------------
const { body } = require('express-validator');
const validations = [
  body('name').isLength({min: 3}).withMessage('Ingrese su nombre y apellido'),
  body('documentType').notEmpty().withMessage('Seleccione su tipo de documento'),
  body('document').isNumeric().withMessage('Ingrese su número de documento'),
  body('email').isEmail().withMessage('Ingrese un email válido'),
  body('phone').isNumeric().withMessage('Ingrese su número telefónico'),
  body('birthDate').notEmpty().withMessage('Seleccione su fecha de nacimiento'),
  body('password').isLength({min: 5}).withMessage('Ingrese una contraseña de mínimo 5 caracteres')
]

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
router.post('/login', mainController.login);
//---------------------------------------------
router.get('/register', mainController.register);
router.post(
  '/register',upload.single('userImage'),validations,mainController.createUser); // agregar middleweare validations
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
