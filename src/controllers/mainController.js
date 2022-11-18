//requerir fs y path
const { FORMERR } = require('dns');
let fs = require('fs');
let path = require('path');
const bcrypt = require('bcryptjs');

//----------------------------------------------------------------
let homeDynamicObject = [{
  image: "/images/user.png",
  name:"",
  logged: false
}];

//----------------------------------------------------------------

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

let idIndex = 0;

let mainController = {
  home: (req, res) => {
    homeDynamicObject = [homeDynamicObject[0]];
    let featuredProducts = products.filter(
      (product) => product.featured == true || product.featured == 'on'
    );
    for (let i =0; i<featuredProducts.length;i++) {
    homeDynamicObject.push(featuredProducts[i]);
    }
    console.info(homeDynamicObject);
    res.render('products/home' , {homeDynamicObject});
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
      userToLogin != undefined
      &&
      bcrypt.compareSync(req.body.password, userToLogin[0].password)
    ) {
      //definición de usuario logueado con session-------
      req.session.loggedUser = userToLogin;
      //-------------------------------------------------mostrar imagen de perfil dinámica
      homeDynamicObject = [{
        image: "/userImages/" + userToLogin[0].image,
        name:userToLogin[0].fullName,
        logged: true
      }];
      console.info(homeDynamicObject);


      //-------------------------------------------------
      res.redirect('/userDetail'); //
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
      //condicional funcionilidad
      conditional = req.file;
      let newUser = {
        if(conditional) {
          image: req.file.filename
        },
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

      //loggear automaticamente despues de registrarse------------------
      userToLogin = users.filter((user) => user.email == newUser.email);
      console.info(userToLogin);

      req.session.loggedUser = userToLogin


      res.render('users/userDetail', { userToLogin });
      //----------------------------------------------------------------
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
    // req.session.loggedUser = userToLogin.id;
    // const idSession = req.session.loggedUser
    let idUser = idIndex || userToLogin[0].id;
    let userDetail = users.find((user) => user.id == idUser);
    let indexUser = users.indexOf(userDetail);
    //edicion de producto-----------------------------
    if (req.file !== undefined) {
      users[indexUser].image = req.file.filename;
    }
    users[indexUser].fullName = req.body.fullName;
    users[indexUser].documentType = req.body.documentType;
    users[indexUser].document = req.body.document;
    users[indexUser].email = req.body.email;
    users[indexUser].phoneNumber = req.body.phoneNumber;
    users[indexUser].birthDate = req.body.birthDate;
    users[indexUser].password = req.body.password;
    //------------------------------------------------
    //sobreescritura del JSON
    let usersJSON = JSON.stringify(users);
    fs.writeFileSync(usersFilePath, usersJSON);
    res.redirect('/userDetail');
  },

  passwordUpdateView: (req, res) => {
    res.render('users/passwordUpdate');
  },

  passwordUpdate:(req, res) => {


    res.redirect('/userDetail');
  },

  closeSession: (req, res) => {
    userToLogin = undefined;
    console.info(userToLogin)
    req.session.loggedUser = undefined;
    homeDynamicObject = [{
      image: "/images/user.png",
      name: "",
      logged: false
    }];
    res.redirect('/login');
  },

  delete: (req, res) => {
    let idUser = req.params.id;
    let user = users.find(user => user.id == idUser);
    let indexUser = users.indexOf(user);
    users.splice(indexUser, 1)

    //sobreescritura del JSON
    let usersJSON = JSON.stringify(users);
    fs.writeFileSync(usersFilePath, usersJSON);
    res.redirect('/');
  },




}

module.exports = mainController;
