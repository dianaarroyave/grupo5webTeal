//requerir fs y path
let fs = require('fs');
let path = require('path');

//inicialización de array brand
//let brand = [];
//-------------------------------

//requerir archivo JSON de productos
const productsFilePath = path.join(__dirname,'../data/products.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf8'));

let productsController = {
    // ESTATIC
    carrito: (req, res) => {
        res.render('products/carrito');
    },
    // DINAMICS
    //se trabajará inicialmente basics (página dinámica)
    brands: (req, res) => {
      res.render('products/brands');
    },
    brandsOriginal: (req, res) => {
      //aqui traer products
      //let brand =  products.filter(product =>(product.marca=="original"));
      //res.render('products/brands',{brand});
      res.render('products/brands');
    },






    basics: (req, res) => {
      //unica vista para todas las marcas se separa con caracterización de cada prenda para que muestre unicamente la marca seleccionada
      //basics
      let original =  products.filter(product =>(product.marca=="basics"));

        res.render('products/basics',{original}); //el segundo parámetro comparte la variable con la
    },
    //---------------------------------------------------
    original: (req, res) => {
      let original = products.filter(product =>(product.marca=="original"));
      res.render('products/original',{original});
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

// app.get('/categories/:categoryId', (req, res) => {
//     const { categoryId } = req.params;
//     res.json([
//       {
//         categoryId,
//         genero: 'hombre'
//       },
//       {
//         categoryId,
//         genero: 'dama'
//       }
//     ]);
//   });

