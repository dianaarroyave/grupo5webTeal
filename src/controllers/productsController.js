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
    //3 metodos para editar (1)todas las marcas (2)original (3)basicas-----
    edicionTodos: (req,res) => {
      res.render('products/edicion',{products});
    },
    //---------------------------------------------------------------------
    producto: (req, res) => {
      let idProducto = req.params.id;
      let productDetail =  products.filter(product =>(product.id==idProducto));
        res.render('products/producto',{productDetail});
    },
    //---------------------------------------------------
    //---------------------------------------------------
    crear: (req, res) => { //vista crear - para crear producto nuevo.
      let productDetail = [
        {"id": null,
    "name": null,
    "price": null,
    "description": null,
    "colectionDescription": null,
    "categories": null,
    "featured": false,
    "marca": null,
    "image": "empty.png"
      }
      ];
        res.render('products/crear',{productDetail});
    },
    editar: (req, res) => { //vista crear - para editar producto existente.
      let idProducto = req.params.id;
      let productDetail =  products.filter(product =>(product.id==idProducto));
        res.render('products/crear',{productDetail});
    },
}

module.exports = productsController;
