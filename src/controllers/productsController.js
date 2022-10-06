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
    listar: (req, res) => {
        
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