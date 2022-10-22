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
    // thermal: (req, res) => {
    //   // let collectionName =  products.filter(product =>(product.collection==collection));
    //   // res.render('products/producto',{collectionName});
    //   let brand =  products.filter(product =>(product.marca=="Thermal"));
    //   res.render('products/brands',{brand});
    // },
    //---------------------------------------------------
    //---------------------------------------------------
    crear: (req, res) => { //vista crear - para crear producto nuevo.
      let productDetail = [{"image": "empty.png"}];
        res.render('products/crear',{productDetail});
    },
    crearProducto: (req, res) => {
       let newProduct = {
        "id": req.body.id || products.length+2 ,
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

      //guardarla
      //leer lo que ya hay
      // let productsJson = fs.readFileSync('products.json',{encoding: 'utf-8'});
      // let newProducts;
      // //se valida si tiene o no info
      // if(productsJson == ""){
      //   newProducts = [];
      // }else{
      //   newProducts = JSON.parse(productsJson);//Se descomprime
      // }

      products.push(newProduct);//Se agrega la información

      //Volver a convertir a archivo JSON
      //  productsJSON = JSON.stringify(products);
      //Se vuelve a guardar la info-se sobrescribe
      //  fs.writeFileSync('products.json', productsJSON)

        res.render('products/edicion', {products});
        // res.redirect("/products/edicion");

      // let newProductJSON = JSON.stringify(newProduct);
      // products.push(newProduct);
      // let productsJson = JSON.stringify(products);
      // fs.appendFileSync('products.json', productsJson);
      // fs.readFileSync('products.json',{encoding: 'utf-8'})//leer
      // res.redirect("/products/edicion");

    },
    editar: (req, res) => { //vista crear - para editar producto existente.
      let idProducto = req.params.id;
      let productDetail =  products.filter(product =>(product.id == idProducto));
        res.render('products/editar',{productDetail});
    },
    editarProducto: (req, res) => {

      // console.info(productDetail);
      let idProducto = req.params.id;
      let productDetail =  products.find(product =>(product.id == idProducto));
      console.info(productDetail);

      let indexProduct = products.indexOf(productDetail);
      console.info(idProducto);
      console.info(indexProduct);

      products[0].name = req.body.name;
      products[0].price = req.body.price;

      //res.redirect('/products/edicion');
      res.render('products/edicion',{products})


      // "image": req.body.image,
      // "name": req.body.name,
      // "price": req.body.price,
      // "description": req.body.description,
      // "collection": req.body.collection,
      // "collectionDescription": req.body.collectionDescription,
      // "featured": req.body.featured,
      // "marca": req.body.marca,
      // "categories": req.body.categories

    },
    delete:(req, res) =>{
      let idProducto = req.params.id;
      let product =  products.find(product =>product.id==idProducto);
      let indexProduct = products.indexOf(product);
      products.splice(indexProduct, 1)
      // let productsJson = JSON.stringify(products);
      // fs.writeFileSync('products.json', productsJson);
      //se realizó el cambio (res.render(ruta, {products}))--------
        res.redirect('../edicion');
        //--------------------------
    }
}

module.exports = productsController;
