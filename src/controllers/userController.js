const { check, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const db = require('../../config/db');
const User = require('../../models/User.js');
const { generarId, generarJWT } = require('../../helpers/tokens.js');
const Jwt = require('jsonwebtoken');

//imagen de usuario loggeado:
const userImage = "empty.png";

const viewRegister = (req, res) => {
    res.render('users/register', {
        errors: [],
        user: []
    });
};

const userCreate = async (req, res) => {
    //Destructuring del registro
    const { fullName, documentType, documentNumber, email, phoneNumber,  password } = req.body;
    const userImage = req.file.filename;
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
    await check('password').isLength({ min: 5 }).withMessage('Ingrese una clave de más de 5 caracteres').run(req);
    //Hacer validaciones
    let resultado = validationResult(req);
    //Verificar que el resultado no este vacio
    if (!resultado.isEmpty()) {
        return res.render('users/register', {
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
    res.render('users/login', {
        errors: []
    });
}

const userLogin = async (req, res) => {
    await check('email').isEmail().withMessage('Ingrese su correo electrónico').run(req);
    await check('password').notEmpty().withMessage('La contraseña es obligatoria').run(req);

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
        return res.render('users/login', {
            errors: { email: { msg: 'El usuario no existe' } }
        })
    }
    //session para la imagen del usuario
    req.session.userImage = userExist;
    //Verificación de la contraseña
    if (!userExist.verificarPassword(password)) {
        return res.render('users/login', {
            errors: { password: { msg: 'La contraseña es incorrecta' } }
        })
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
    if (!_token) {
        return res.redirect('/login')
    }

    try {
        const decoded = Jwt.verify(_token, process.env.JWT_SECRET)
        const usuarioId = await User.scope('eliminarPassword').findByPk(decoded.id)

        // Validar que el usuario y buscarlo en la base de datos
        const user = await User.findByPk(usuarioId.id);
        res.render('users/userDetail', { user })
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
          ...req.body
        }, { where: { id: user.id }})
        // user = await User.findByPk(usuarioId.id);
        res.redirect('/userDetail')
    } catch (error) {
        return res.clearCookie('_token').redirect('/login')
    }

}
const logout = (req, res) => {
    req.session.userImage={userImage:"empty.png",fullName:"Iniciar sesión"};
    return res.clearCookie('_token').status(200).redirect('/');

}

const editPasswordRender = async (req, res) => {

    const { _token } = req.cookies
    if (!_token) {
        return res.redirect('/login')
    }

    try {
        const decoded = Jwt.verify(_token, process.env.JWT_SECRET)
        const usuarioId = await User.scope('eliminarPassword').findByPk(decoded.id)

        // Validar que el usuario y buscarlo en la base de datos
        const user = await User.findByPk(usuarioId.id);
        res.render('users/passwordUpdate', { user })
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


module.exports = { viewRegister, viewLogin, userCreate, userLogin, editRender, userEdit, logout, editPasswordRender, changePassword, userImage };
