//requerir fs y path
let fs = require('fs');
let path = require('path');

let productsController = {
    // ESTATIC
    carrito: (req, res) => {
        res.render('products/carrito');
    },
    // DINAMICS
    basics: (req, res) => {
        res.render('products/basics');
    },
    original: (req, res) => {
        res.render('products/original');
    },
    producto: (req, res) => {
        res.render('products/producto');
    },
    
    edicion: (req, res) => {
        res.render('products/edicion');
    },
    crear: (req, res) => {
        res.render('products/crear');
    },
    //nuevos para sprint 4
    //listar: (req, res) => {
        //let productsJSON = fs.readFileSync('products.json', {encoding: 'utf8'});
        //let productsObject=JSON.parse(productsJSON);
   // },
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