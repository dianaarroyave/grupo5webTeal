//requerir fs y path
const { FORMERR } = require('dns');
let fs = require('fs');
let path = require('path');
const bcrypt = require('bcryptjs');
//requerir archivo JSON de productos
const productsFilePath = path.join(__dirname, '../data/products.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf8'));

const usersFilePath = path.join(__dirname, '../data/users.json');
const users = JSON.parse(fs.readFileSync(usersFilePath, 'utf8'));
//inicializar user-------------
let userToLogin = [{}];
//----express validations-------------------------
const { validationResult } = require('express-validator');
//console.log(validationResult);

let mainController = {
  home: (req, res) => {
    let featuredProducts = products.filter(
      (product) => product.featured == true || product.featured == 'on'
    );
    res.render('products/home', { featuredProducts });
  },
  aboutUs: (req, res) => {
    res.render('products/aboutUs');
  },
  viewLogin: (req, res) => {
    res.render('users/login');
  },
  //---Login--------------------------------------------------------
  //impletentar delete userToLogin.password;
  login: (req, res) => {
    //PONER LOGIV PARA MOSTRAR ERRORES CON EXPRESS VALIDATOR AQUI
    //----------------------------------------------------------------
    let userEmail = req.body.email;
    let password = req.body.password;
    userToLogin = users.filter((user) => user.email == userEmail);
    if (
      userToLogin != undefined &&
      bcrypt.compareSync(req.body.password, userToLogin[0].password)
    ) {
      //definición de usuario logueado con session-------
      req.session.loggedUser = userToLogin;
      //-------------------------------------------------
      res.render('users/userDetail', { userToLogin }); //
    } else {
      res.render('users/login');
    }
  },
  //----------------------------------------------------------------
  register: (req, res) => {
    res.render('users/register');
  },

  userDetail: (req, res) => {
    let idUser = req.params.id;
    let userDetail = users.filter((user) => user.id == idUser);
    res.render('users/userDetail', { userToLogin });
  },

  newUser: (req, res) => {
    //vista newUser - para newUser producto nuevo.
    let userDetail = [{ image: 'empty.png' }];
    res.render('users/newUser', { userDetail });
  },
  createUser: (req, res) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
      let newUser = {
        image: req.file.filename,
        id: req.body.id || users.length + 2,
        fullName: req.body.name,
        documentType: req.body.documentType,
        document: req.body.document,
        email: req.body.email,
        phoneNumber: req.body.phone,
        birthDate: req.body.birthDate,
        //contraseña encriptada:------
        password: bcrypt.hashSync(req.body.password),
        //----------------------------
      };
      users.push(newUser); //Se agrega la información
      //sobreescritura del JSON
      let usersJSON = JSON.stringify(users);
      fs.writeFileSync(usersFilePath, usersJSON);
      res.redirect('/userDetail');
    } else {
      res.render('users/register', { 
        errors: errors.array(),
        old: req.body
      });
    }
  },

  userEdition: (req, res) => {
    //vista crear - para userEdition usuario existente.
    let idUser = req.params.id;
    idIndex = idUser; //para compartir el ID del usuario que se va a userEdition  Y CONSEGUIR EL INDICE DEL ARRAY en (editarUsuarios)
    let userDetail = users.filter((user) => user.id == idUser);
    res.render('users/userEdition', { userDetail });
  },

  editUser: (req, res) => {
    let idUser = idIndex;
    let userDetail = users.find((user) => user.id == idUser);
    let indexUser = users.indexOf(userDetail);
    //edicion de producto-----------------------------
    if (req.file !== undefined) {
      users[indexUser].image = req.file.filename;
    }
    users[indexUser].name = req.body.name;
    users[indexUser].documentType = req.body.documentType;
    users[indexUser].document = req.body.document;
    users[indexUser].email = req.body.email;
    users[indexUser].phone = req.body.phone;
    users[indexUser].birthDate = req.body.birthDate;
    users[indexUser].password = req.body.password;

    //------------------------------------------------
    //sobreescritura del JSON
    let usersJSON = JSON.stringify(users);
    fs.writeFileSync(usersFilePath, usersJSON);
    res.redirect('/users/userDetail');
  },

    delete:(req, res) =>{
      let idUser = req.params.id;
      let user =  users.find(user =>user.id==idUser);
      let indexUser = users.indexOf(user);
      users.splice(indexUser, 1)

      //sobreescritura del JSON
      let usersJSON = JSON.stringify(users);
      fs.writeFileSync(usersFilePath,usersJSON);
      res.redirect('/');
    },

    closeSession: (req, res) =>{
      userToLogin = undefined;
      req.session.loggedUser = undefined;
      res.redirect('/login');
    }
}

module.exports = mainController;
