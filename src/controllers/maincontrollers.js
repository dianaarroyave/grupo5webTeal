//requerir fs y path
let fs = require('fs');
let path = require('path');
//requerir archivo JSON de productos
const productsFilePath = path.join(__dirname,'../data/products.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf8'));

const usersFilePath = path.join(__dirname,'../data/users.json');
const users = JSON.parse(fs.readFileSync(usersFilePath, 'utf8'));

let mainController = {
    home: (req, res) => {
      let featuredProducts =  products.filter(product =>((product.featured==true) || (product.featured=="on")));
        res.render('products/home',{featuredProducts});
    },
    aboutUs: (req, res) => {
        res.render('products/aboutUs');
    },
    login: (req, res) => {
        res.render('users/login');
    },
    register: (req, res) => {
        res.render('users/register');
    },

    userDetail: (req, res) => {
      let idUser = req.params.id;
      let userDetail =  users.filter(user =>(user.id==idUser));
        res.render('users/userDetail',{userDetail});
    },

    newUser: (req, res) => { //vista newUser - para newUser producto nuevo.
      let userDetail = [{"image": "empty.png"}];
        res.render('users/newUser',{userDetail});
    },
    createUser: (req, res) => {
      let newUser = {
        // "image": req.file.userImage,
        "id": req.body.id || users.length+2 ,
        "fullName": req.body.name,
        "documentType": req.body.documentType,
        "document": req.body.document,
        "email": req.body.email,
        "phoneNumber": req.body.phone,
        "birthDate": req.body.birthDate,
        "password": req.body.password
    };

    users.push(newUser);//Se agrega la información
    console.info(users);
      //sobreescritura del JSON
      let usersJSON = JSON.stringify(users);
      fs.writeFileSync(usersFilePath,usersJSON);
      res.redirect('/users/userDetail');
    },

    userEdition: (req, res) => { //vista crear - para userEdition usuario existente.
      let idUser = req.params.id;
      idIndex = idUser; //para compartir el ID del usuario que se va a userEdition  Y CONSEGUIR EL INDICE DEL ARRAY en (editarUsuarios)
      let userDetail =  users.filter(user =>(user.id == idUser));
        res.render('users/userEdition',{userDetail});
    },

    editProduct: (req, res) => {
      let idUser = idIndex;
      let userDetail =  users.find(user =>(user.id == idUser));
      let indexUser = users.indexOf(userDetail);
      //edicion de producto-----------------------------
      if(req.file!==undefined){
        users[indexUser].image = req.file.filename;
      };
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
      fs.writeFileSync(usersFilePath,usersJSON);
      res.redirect('/users/userDetail');
    },

    delete:(req, res) =>{
      let idUser = req.params.id;
      let user =  users.find(user =>product.id==idUser);
      let indexUser = users.indexOf(user);
      users.splice(indexUser, 1)

      //sobreescritura del JSON
      let usersJSON = JSON.stringify(users);
      fs.writeFileSync(usersFilePath,usersJSON);
      res.redirect('/users/userDetail');
    }
}

module.exports = mainController;
