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
    corporativo: (req, res) => {
        res.render('products/corporativo');
    },
    login: (req, res) => {
        res.render('users/login');
    },
    registro: (req, res) => {
        res.render('users/registro');
    },
}


module.exports = mainController;
