const { check, validationResult } = require('express-validator');
const { Product, Brand } = require('../../models/index');

const brandOriginal = async (req, res) => {
  const [productDatabase] = await Promise.all([
    Product.findAll()
  ]);
  let brand = productDatabase.filter((product) => product.brand_id == '2');
  res.render('products/brands', { brand })
};

const brandBasics = async (req, res) => {
  const [productDatabase] = await Promise.all([
    Product.findAll()
  ]);

  let brand = productDatabase.filter((product) => product.brand_id == '1');
  res.render('products/brands', { brand })
};

const viewProductDetail = async (req, res) => {
  const [productDatabase] = await Promise.all([
    Product.findAll()
  ]);
  let idProducto = req.params.id;
  let productDetail = productDatabase.filter((product) => product.id == idProducto);
  res.render('products/productDetail', { productDetail })
};

const bag = (req, res) => {
  res.render('products/bag')
};

const viewNewProduct = async (req, res) => {
  const [brands] = await Promise.all([
    Brand.findAll()
  ])
  res.render('products/newProduct', { brands })
};

const newProduct = async (req, res) => {
  //Destructuring del registro
  const { name, price, productDescription, collection, collectionDescription, brand: brand_id, categories, size, color, quantity, featured } = req.body;
  const productImage = req.file.filename;

  // const productImage = req.file.newFileName;
  //Validaciones
  await check('name').isLength({ min: 3 }).withMessage('Asigne el nombre del producto').run(req);
  await check('price').isNumeric().withMessage('Asigne el precio del producto').run(req);
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
  res.render('products/adminProducts', { productDatabase });
};

const viewProductEdition = async (req, res) => {
  const { id } = req.params;

  // Validacion de que el producto si existe
  const product = await Product.findByPk(id);

  if (!product) {
    return res.redirect('/');
  }

  // Hacer la consulta del producto en la base de datos
  const [brand] = await Promise.all([
    Brand.findAll()
  ])

  return res.render('products/productEdition', {
    brand,
    product
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

        return res.render('products/productEdit', {
            brand,
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
    const { productImage, name, price, productDescription, collection, collectionDescription, brand: brand_id, categories, size, color, quantity, featured} = req.body;

    product.set({
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

    await product.save();

    res.redirect('/')
  } catch (error) {
    console.log(error);
  }
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
  productEdition
}

