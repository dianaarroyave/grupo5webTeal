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
      let productDetail = [{"image": "empty.png"}];
        res.render('products/crear',{productDetail});
    },
    crearProducto: (req, res) => {
       let newProduct = {
        "id": req.body.id,
        "image": req.body.image,
        "name": req.body.name,
        "price": req.body.price,
        "description": req.body.description,
        "collection": req.body.collection,
        "collectionDescription": req.body.collectionDescription,
        "featured": req.body.featured,
        "marca": req.body.marca,
        "categories": req.body.categories
       };
       console.log(newProduct);
      //guardarla
      let newProductJSON = JSON.stringify(newProduct);
      fs.appendFileSync('products.json', newProductJSON);

      res.redirect("/products/edicion");

    },
    editar: (req, res) => { //vista crear - para editar producto existente.
      let idProducto = req.params.id;
      let productDetail =  products.filter(product =>(product.id==idProducto));
        res.render('products/editar',{productDetail});
    },
}

module.exports = productsController;
