const { check, validationResult } = require('express-validator');
const { Product, Brand } = require('../../models/index');

//imagen de usuario
let userImage = {userImage:"empty.png",fullName:"INICIAR SESIÓN"};

const brandOriginal = async (req, res) => {
  //session user image
  if(req.session.userImage){
    userImage = req.session.userImage
  }
  const [productDatabase] = await Promise.all([
    Product.findAll()
  ]);
  let brand = productDatabase.filter((product) => product.brand_id == '2');
  res.render('products/brands', { brand, userImage })
};

const brandBasics = async (req, res) => {
  //session user image
  if(req.session.userImage){
    userImage = req.session.userImage
  };

  const [productDatabase] = await Promise.all([
    Product.findAll()
  ]);

  let brand = productDatabase.filter((product) => product.brand_id == '1');
  res.render('products/brands', { brand, userImage })
};

const viewProductDetail = async (req, res) => {
  const {id} = req.params;
  const productDetail = await Product.findByPk(id);

  if (!productDetail){
    return res.redirect('/')
  };

  //session user image
  if(req.session.userImage){
    userImage = req.session.userImage
  };

  res.render('products/productDetail', { productDetail, userImage })
};

const bag = (req, res) => {
  res.render('products/bag')
};

const viewNewProduct = async (req, res) => {
  const [brands] = await Promise.all([
    Brand.findAll()
  ]);
   //session user image
   if(req.session.userImage){
    userImage = req.session.userImage
  };
  res.render('products/newProduct', { brands, userImage })
};

const newProduct = async (req, res) => {
  //Destructuring del registro
  const { name, price, productDescription, collection, collectionDescription, brand: brand_id, categories, size, color, quantity } = req.body;
  const productImage = req.file.filename;
  //featured de string a integer
  const featuredString = req.body.featured;
  let featured = 0;
  if (featuredString=='on'){
    featured = 1;
  };

  // const productImage = req.file.newFileName;
  //Validaciones
  await check('name').isLength({ min: 2 }).withMessage('Asigne el nombre del producto').run(req);
  await check('price').isNumeric().withMessage('Asigne el precio del producto').run(req);
  await check('productDescription').isLength({ min: 20 }).withMessage('La descripción debe tener mínimo 20 carcteres').run(req);
  await check('brand').notEmpty().withMessage('Asigne la submarca del producto').run(req);
  await check('categories').notEmpty().withMessage('Seleccione la categoría del producto').run(req);
  await check('size').notEmpty().withMessage('Seleccione la categoría del producto').run(req);
  await check('color').notEmpty().withMessage('Seleccione el color del producto').run(req);
  await check('quantity').notEmpty().withMessage('Seleccione la cantidad del producto').run(req);

  await Product.create({
    productImage,
    name,
    price,
    productDescription,
    collection,
    collectionDescription,
    brand_id,
    categories,
    size,
    color,
    quantity,
    featured
  })
  res.redirect('/');
};

const viewAdminProduct = async (req, res) => {
  const [productDatabase] = await Promise.all([
    Product.findAll()
  ]);

  //session user image
  if(req.session.userImage){
    userImage = req.session.userImage
  };

  res.render('products/adminProducts', { productDatabase, userImage });
};

const viewProductEdition = async (req, res) => {
  const { id } = req.params;

  // Validacion de que el producto si existe
  const product = await Product.findByPk(id);

  if (!product) {
    return res.redirect('/');
  };

  //session user image
  if(req.session.userImage){
    userImage = req.session.userImage
  };

  // Hacer la consulta del producto en la base de datos
  const [brand] = await Promise.all([
    Brand.findAll()
  ])

  return res.render('products/productEdition', {
    brand,
    product,
    userImage
  });
};

const productEdition = async (req, res) => {

  await check('name').isLength({ min: 3 }).withMessage('Asigne el nombre del producto').run(req);
  await check('price').isNumeric().withMessage('Asigne el precio del producto').run(req);
  await check('brand').notEmpty().withMessage('Asigne la submarca del producto').run(req);
  await check('categories').notEmpty().withMessage('Seleccione la categoría del producto').run(req);
  await check('size').notEmpty().withMessage('Seleccione la categoría del producto').run(req);
  await check('color').notEmpty().withMessage('Seleccione el color del producto').run(req);
  await check('quantity').notEmpty().withMessage('Seleccione la cantidad del producto').run(req);

  let resultado = validationResult(req);

    if(!resultado.isEmpty()){

      const [brand] = await Promise.all([
        Brand.findAll()
      ])
      const product = await Product.findByPk(req.params.id);

        return res.render('products/productEdition', {
            brand,product
        });
    };

  const { id } = req.params;

  // Validacion de que el producto si existe
  const product = await Product.findByPk(id);

  if (!product) {
    return res.redirect('/');
  }

  const [brand] = await Promise.all([
    Brand.findAll()
  ])

  try {
    const { name, price, productDescription, collection, collectionDescription, brand: brand_id, categories, size, color, quantity} = req.body;
    const productImage = req?.file?.filename;
    if(!!productImage){
      product.set({
      productImage,});
    }
    //featured de string a integer
    let featured = 0;
  const featuredString = req.body.featured;
  if (featuredString=='on'){
    featured = 1;
  }else{
    featured = 0;
  }
    product.set({
      name,
      price,
      productDescription,
      collection,
      collectionDescription,
      brand_id,
      categories,
      size,
      color,
      quantity,
      featured
    })

    await product.save();

    res.redirect('/')
  } catch (error) {
    console.log(error);
  }
}
const deletProduct = async (req, res) => {
  const { id } = req.params
    // Validar que el producto exista

    const producto = await Product.findByPk(id)

    if(!producto){
        return res.redirect('/')
    }


    // Eliminar el producto
    await producto.destroy()
    res.redirect('/')
}

module.exports = {
  brandOriginal,
  brandBasics,
  viewProductDetail,
  bag,
  viewNewProduct,
  newProduct,
  viewAdminProduct,
  viewProductEdition,
  productEdition,
  deletProduct
}

