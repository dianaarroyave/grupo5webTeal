//requerir fs y path
let fs = require('fs');
let path = require('path');
//requerir archivo JSON de productos
const productsFilePath = path.join(__dirname,'../data/products.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf8'));

let productsController = {
    // ESTATIC
    carrito: (req, res) => {
        res.render('products/carrito');
    },
    // DINAMICS
    brandOriginal: (req, res) => {
      //aqui traer products
      let brand =  products.filter(product =>(product.marca=="original"));
      res.render('products/brands',{brand});
    },
    brandBasics: (req, res) => {
      //aqui traer products
      let brand =  products.filter(product =>(product.marca=="basics"));
      res.render('products/brands',{brand});
    },
    edicionTodos: (req,res) => {
      res.render('products/edicion',{products});
    },
    //----------------------------------------------------
    producto: (req, res) => {
        res.render('products/producto');
    },
    //---------------------------------------------------
    edicion: (req, res) => {
        let original =  products.filter(product =>(product.marca=="original"));
        res.render('products/edicion', {original});
    },
    //---------------------------------------------------
    crear: (req, res) => {
        res.render('products/crear');
    },
}

module.exports = productsController;
