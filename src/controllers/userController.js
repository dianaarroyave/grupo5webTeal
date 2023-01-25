const { check, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const db = require('../../config/db');
const User = require('../../models/User.js');
const { generarId, generarJWT } = require('../../helpers/tokens.js');
const Jwt = require('jsonwebtoken');

//imagen de usuario
let userImage = {userImage:"empty.png",fullName:"INICIAR SESIÓN"};

const viewRegister = (req, res) => {
    //session user image
    if (req.session.userImage) {
        userImage = req.session.userImage
    }
    res.render('users/register', {
        errors: [],
        user: [],
        userImage
    });
};

const userCreate = async (req, res) => {
    //Destructuring del registro
    const { fullName, documentType, documentNumber, email, phoneNumber, password } = req.body;
    const userImage = req?.file?.filename;
    //Validación para ver si el usuario está registrado
    const userExist = await User.findOne({ where: { email } });
    if (userExist) {
        return res.render('users/login', {userImage,
            user: {
                fullName: req.body.fullName,
                email: req.body.email
            }
        })
    }
    //Validaciones
    await check('fullName').isLength({ min: 5 }).run(req);
    await check('documentType').notEmpty().run(req);
    await check('documentNumber').isNumeric().run(req);
    await check('email').isEmail().run(req);
    await check('phoneNumber').notEmpty().run(req);
    await check('password').isLength({ min: 5 }).run(req);
    //Hacer validaciones
    let resultado = validationResult(req);
    //Verificar que el resultado no este vacio
    if (!resultado.isEmpty()) {
        return res.render('users/register', {userImage,
            errors: resultado.mapped(),
            user: {
                fullName: req.body.fullName,
                documentType: req.body.documentType,
                documentNumber: req.body.documentNumber,
                email: req.body.email,
                phoneNumber: req.body.phoneNumber,
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
        password
    })
    res.redirect('/login')
};

const viewLogin = (req, res) => {
    //session user image
  if(req.session.userImage){
    userImage = req.session.userImage
  }
    res.render('users/login', {
        errors: [],
        userImage
    });
}

const userLogin = async (req, res) => {
    await check('email').isEmail().run(req);
    await check('password').notEmpty().run(req);

    let resultado = validationResult(req);
    //Verificar que el resultado no este vacio
    if (!resultado.isEmpty()) {
        return res.render('users/login', {
            errors: resultado.mapped()
        })
    }
    const { email, password } = req.body;
    //Verificación de la existencia del usuario
    const userExist = await User.findOne({ where: { email } });
    if (!userExist) {
        return res.render('users/login', {userImage,
            errors: { email: { msg: 'El usuario no existe' } }
        })
    }

    //Verificación de la contraseña
    if (!userExist.verificarPassword(password)) {

        return res.redirect('users/login')
    }

    // Autenticar al usuario
    const token = generarJWT({ id: userExist.id, fullName: userExist.fullName, phoneNumber: userExist.phoneNumber, email: userExist.email });
    //session para la imagen del usuario
    req.session.userImage = userExist;
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
    if (!_token) {
        return res.redirect('/login')
    }

    try {
        const decoded = Jwt.verify(_token, process.env.JWT_SECRET)
        const usuarioId = await User.scope('eliminarPassword').findByPk(decoded.id)

        //session user image
        if(req.session.userImage){
            userImage = req.session.userImage
          };

        // Validar que el usuario y buscarlo en la base de datos
        const user = await User.findByPk(usuarioId.id);
        res.render('users/userDetail', { user, userImage })
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
        var user = await User.findByPk(usuarioId.id);
        User.update({
            ...req.body,
            userImage: req?.file?.filename
        }, { where: { id: user.id } })
        // user = await User.findByPk(usuarioId.id);
        res.redirect('/userDetail')
    } catch (error) {
        return res.clearCookie('_token').redirect('/login')

    }

}
const logout = (req, res) => {
    req.session.userImage = { userImage: "empty.png", fullName: "Iniciar sesión" };
    return res.clearCookie('_token').status(200).redirect('/');

}

const editPasswordRender = async (req, res) => {
    const { _token } = req.cookies
    if (!_token) {
        return res.redirect('/login')
    }

    try {
          //session user image
    if(req.session.userImage){
        userImage = req.session.userImage
      };

        const decoded = Jwt.verify(_token, process.env.JWT_SECRET)
        const usuarioId = await User.scope('eliminarPassword').findByPk(decoded.id)
        // Validar que el usuario y buscarlo en la base de datos
        const user = await User.findByPk(usuarioId.id);
        res.render('users/passwordUpdate', { user, userImage })
    } catch (error) {
        return res.clearCookie('_token').redirect('/login')
    }
}

const changePassword = async (req, res) => {
    // Validaciones
    await check('password').notEmpty().withMessage('La contraseña es obligatoria').run(req);
    await check('repassword').equals(req.body.password).withMessage('La contraseña no coincide').run(req);
    let resultado = validationResult(req)
    if (!resultado.isEmpty()) {
        return res.render('users/passwordUpdat')
    }

    // Se obtiene el token del usuario y se verifica su validez
    const { _token } = req.cookies
    const decoded = Jwt.verify(_token, process.env.JWT_SECRET)

    // Se busca al usuario en la base de datos
    //const userId = await User.scope('eliminarPassword').findByPk(decoded.id)
    const user = await User.findByPk(decoded.id);

    // Se actualiza la contraseña del usuario
    const { password } = req.body
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    try {
        // Se guardan los cambios en la base de datos
        await user.save();
        res.redirect('/');
    } catch (error) {
        console.log(error);
        res.status(500).send("Error al actualizar la contraseña");
    }
}

const deleteUser = async (req,res) => {
  const { id } = req.params
    // Validar que el producto exista

    const user = await User.findByPk(id)

    if(!user){
        return res.redirect('/')
    }


    // Eliminar el producto
    await user.destroy()
    userImage = {userImage:"empty.png",fullName:"INICIAR SESIÓN"};

    res.redirect('/')

}


module.exports = {
    viewRegister,
    viewLogin,
    userCreate,
    userLogin,
    editRender,
    userEdit,
    logout,
    editPasswordRender,
    changePassword,
    userImage,
    deleteUser
};
