let productsController = {
    basics: (req, res) => {
        res.render('products/basics');
    },
    original: (req, res) => {
        res.render('products/original');
    },
    producto: (req, res) => {
        res.render('products/producto');
    },
    carrito: (req, res) => {
        res.render('products/carrito');
    },
    edicion: (req, res) => {
        res.render('products/edicion');
    }
}


module.exports = productsController;