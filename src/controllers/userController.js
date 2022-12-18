const { check, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const db = require('../../config/db');
const User = require('../../models/User.js');
const { generarId, generarJWT } = require('../../helpers/tokens.js');
const Jwt = require('jsonwebtoken');


const viewRegister = (req, res) => {
    res.render('users/register');
}

const userCreate = async (req, res) => {
    //Destructuring del registro
    const { userImage, fullName, documentType, documentNumber, email, phoneNumber, dateBirth, password } = req.body;
    //Validación para ver si el usuario está registrado
    const userExist = await User.findOne({ where: { email } });
    if (userExist) {
        return res.render('users/login', {
            user: {
                fullName: req.body.fullName,
                email: req.body.email
            }
        })
    }
    //Validaciones
    await check('fullName').isLength({ min: 5 }).withMessage('Ingrese su nombre completo').run(req);
    await check('documentType').notEmpty().withMessage('Ingrese su tipo de documento').run(req);
    await check('documentNumber').isNumeric().withMessage('Ingrese su número de documento').run(req);
    await check('email').isEmail().withMessage('Ingrese su correo electrónico').run(req);
    await check('phoneNumber').notEmpty().withMessage('Ingrese su número de celular').run(req);
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
};

const viewLogin = (req, res) => {
    res.render('users/login');
}

const userLogin = async (req, res) => {
    await check('email').isEmail().withMessage('Ingrese su correo electrónico').run(req);
    await check('password').notEmpty().withMessage('La contraseña es obligatoria').run(req);
    let resultado = validationResult(req);
    //Verificar que el resultado no este vacio
    if (!resultado.isEmpty()) {
        return res.render('users/login')
    }
    const { email, password } = req.body;
    //Verificación de la existencia del usuario
    const userExist = await User.findOne({ where: { email } });
    if (!userExist) {
        return res.render('users/login')
    }
    //Verificación de la contraseña
    if (!userExist.verificarPassword(password)) {
        return res.render('users/login')
    }
    // Autenticar al usuario
    const token = generarJWT({ id: userExist.id, fullName: userExist.fullName, phoneNumber: userExist.phoneNumber, email: userExist.email });

    // Almacenar en un cookie
    return res.cookie('_token', token, {
        httpOnly: true
        // secure: true,
        // sameSite: true
    }).redirect('/')

};

const editRender = async (req, res) => {
    // Comprobar el token
    const { _token } = req.cookies
    if(!_token) {
        return res.redirect('/login')
    }

    try {
        const decoded = Jwt.verify(_token, process.env.JWT_SECRET)
        const usuarioId = await User.scope('eliminarPassword').findByPk(decoded.id)

        // Validar que el usuario y buscarlo en la base de datos
        const user = await User.findByPk(usuarioId.id);
        res.render('users/userDetail', {user})
    } catch (error) {
        return res.clearCookie('_token').redirect('/login')
    }

}

const userEdit = async (req, res) => {
    // Comprobar el token
    const { _token } = req.cookies
    if (!_token) {
        return res.redirect('/login')
    }

    try {
        const decoded = Jwt.verify(_token, process.env.JWT_SECRET)
        const usuarioId = await User.scope('eliminarPassword').findByPk(decoded.id)

        // Validar que el usuario y buscarlo en la base de datos
        const user = await User.findByPk(usuarioId.id);
        User.update({
            ...req.body
        }, { where: { id: user.id } })
        res.render('users/userDetail', { user })
    } catch (error) {
        return res.clearCookie('_token').redirect('/login')
    }
}
const logout = (req, res) => {
    return res.clearCookie('_token').status(200).redirect('/');
}

module.exports = { viewRegister, viewLogin, userCreate, userLogin, editRender, userEdit, logout };
