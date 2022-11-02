//requerir fs y path
let fs = require('fs');
let path = require('path');
//requerir archivo JSON de productos
const productsFilePath = path.join(__dirname,'../data/products.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf8'));

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
    createUser:(req, res) => {
      let newUser = {
        "image": req.file.productImage,
        "fullName": req.body.name,
        "documentType": req.body.documentType,
        "document": req.body.document,
        "email": req.body.email,
        "phoneNumber": req.body.phone,
        "birthDate": req.body.birthDate,
        "password": req.body.password
    };
    },
    user: (req, res) => {
      res.render('register/user');
  },
}


module.exports = mainController;
