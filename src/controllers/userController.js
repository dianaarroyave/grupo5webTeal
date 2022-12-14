const { check, validationResult } = require('express-validator');
const User = require('../../models/User.js');

const viewRegister = (req, res) => {
    res.render('users/register');
}

const viewLogin = (req, res) => {
    res.render('users/login');
}

const userCreate = async (req, res) => {
    //Destructuring del registro
    const { userImage, fullName, documentType, documentNumber, email, phoneNumber, dateBirth, password } = req.body; +
        //Validaciones
        await check('fullName').isLength({ min: 5 }).withMessage('Ingrese su nombre completo').run(req);
    await check('documentType').notEmpty().withMessage('Ingrese su tipo de documento').run(req);
    await check('documentNumber').isNumeric().withMessage('Ingrese su número de documento').run(req);
    await check('email').isEmail().withMessage('Ingrese su correo electrónico').run(req);
    await check('phoneNumber').isNumeric().withMessage('Ingrese su número de celular').run(req);
    await check('dateBirth').notEmpty().withMessage('Ingrese su fecha de nacimiento').run(req);
    await check('password').isLength({ min: 5 }).withMessage('Ingrese una clave de más de 5 caracteres').run(req);
    //Hacer validaciones
    let resultado = validationResult(req);
    //Verificar que el resultado no este vacio
    if (!resultado.isEmpty()) {
        return res.render('users/register', {
            user: {
                fullName: req.body.fullName,
                documentType: req.body.documentType,
                documentNumber: req.body.documentNumber,
                email: req.body.email,
                phoneNumber: req.body.phoneNumber,
                dateBirth: req.body.dateBirth,
                password: req.body.password
            }
        })
    }
    //Almacenar usuario
    await User.create({
        userImage,
        fullName,
        documentType,
        documentNumber,
        email,
        phoneNumber,
        dateBirth,
        password
    })
    res.redirect('/login')
}





module.exports = { validationResult, viewRegister, viewLogin, userCreate };