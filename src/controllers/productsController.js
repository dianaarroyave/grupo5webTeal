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
    }
}


module.exports = productsController;