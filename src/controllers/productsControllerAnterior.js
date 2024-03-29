//requerir fs y path
let fs = require('fs');
let path = require('path');

//requerir archivo JSON de productos
const productsFilePath = path.join(__dirname,'../data/products.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf8'));


//inicializar variable indice para la edicion de produtos--------
let idIndex = 0;
//---------------------------------------------------------------

let productsController = {
    // ESTATIC
    bag: (req, res) => {
        res.render('products/bag');
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
    adminProductsAll: (req,res) => {
      //linea para refrescar y ver los productos que están en el json y no en la memoria temporal---
      const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf8'));
      //--------------------------------------------------------------------------------------------
      res.render('products/adminProducts',{products});
    },
    //---------------------------------------------------------------------
    productDetail: (req, res) => {
      let idProducto = req.params.id;
      let productDetail =  products.filter(product =>(product.id==idProducto));
        res.render('products/productDetail',{productDetail});
    },
    newProduct: (req, res) => { //vista newProduct - para newProduct producto nuevo.
      let productDetail = [{"image": "empty.png"}];
        res.render('products/newProduct',{productDetail});
    },
    createProduct: (req, res) => {
       let newProduct = {
        "id": req.body.id || products.length+2 ,
        "image": req.file.filename,
        "name": req.body.name,
        "price": req.body.price,
        "description": req.body.description,
        "collection": req.body.collection,
        "collectionDescription": req.body.collectionDescription,
        "featured": req.body.featured,
        "marca": req.body.marca,
        "categories": req.body.categories
       };
      products.push(newProduct);//Se agrega la información
      //sobreescritura del JSON
      let productsJSON = JSON.stringify(products);
      fs.writeFileSync(productsFilePath,productsJSON);
      res.redirect('/products/adminProducts');
    },
    productEdition: (req, res) => { //vista crear - para productEdition producto existente.
      let idProducto = req.params.id;
      idIndex = idProducto; //para compartir el ID del producto que se va a productEdition  Y CONSEGUIR EL INDICE DEL ARRAY en (editarProducto)
      let productDetail =  products.filter(product =>(product.id == idProducto));
        res.render('products/productEdition',{productDetail});
    },
    editProduct: (req, res) => {
      let idProducto = idIndex;
      let productDetail =  products.find(product =>(product.id == idProducto));
      let indexProduct = products.indexOf(productDetail);
      //edicion de producto-----------------------------
      if(req.file!==undefined){
        products[indexProduct].image = req.file.filename;
      };
      products[indexProduct].name = req.body.name;
      products[indexProduct].price = req.body.price;
      products[indexProduct].description = req.body.description;
      products[indexProduct].collection = req.body.collection;
      products[indexProduct].collectionDescription = req.body.collectionDescription;
      products[indexProduct].featured = req.body.featured;
      products[indexProduct].marca = req.body.marca;
      products[indexProduct].categories = req.body.categories;
      //------------------------------------------------
      //sobreescritura del JSON
      let productsJSON = JSON.stringify(products);
      fs.writeFileSync(productsFilePath,productsJSON);
      res.redirect('/products/adminProducts');
    },
    delete:(req, res) =>{
      let idProducto = req.params.id;
      let product =  products.find(product =>product.id==idProducto);
      let indexProduct = products.indexOf(product);
      products.splice(indexProduct, 1)

      //sobreescritura del JSON
      let productsJSON = JSON.stringify(products);
      fs.writeFileSync(productsFilePath,productsJSON);
      res.redirect('/products/adminProducts');
    }
}

module.exports = productsController;
