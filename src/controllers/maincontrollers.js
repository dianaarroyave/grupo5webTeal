let mainController = {
    home: (req, res) => {
        res.render('products/home');
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