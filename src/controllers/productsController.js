const { check, validationResult } = require('express-validator');
const Product = require('../../models/Product');

const brandOriginal = async (req, res) => {
    const [productDatabase] = await Promise.all([
        Product.findAll()
    ]);
    let brand = productDatabase.filter((product) => product.brand == 'Original');
    res.render('products/brands', { brand })
};

const brandBasics = async (req, res) => {
    const [productDatabase] = await Promise.all([
        Product.findAll()
    ]);
    let brand = productDatabase.filter((product) => product.brand == 'Basics');
    res.render('products/brands', { brand })
};

const viewProductDetail = async (req, res) => {
    const [productDatabase] = await Promise.all([
        Product.findAll()
    ]);
    let idProducto = req.params.id;
    let productDetail =  productDatabase.filter((product) => product.id == idProducto);
    res.render('products/productDetail', { productDetail })
};

const bag = (req, res) => {
    res.render('products/bag')
};

const viewNewProduct = (req, res) => {
    res.render('products/newProduct')
};

const newProduct = async (req, res) => {
    //Destructuring del registro
    const { productImage, name, price, productDescription, collection, collectionDescription, brand, categories, size, color, quantity, featured } = req.body;
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
        brand,
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
  let idProducto = req.params.id;
  console.info('este es el req.params________________________________________________________________', idProducto);
  const [product] = await Promise.all([
  Product.findByPk(idProducto)
]);
console.info('este es producct ______________________________________________',product);
    res.render('products/productEdition',{product});

};

module.exports = {
    brandOriginal,
    brandBasics,
    viewProductDetail,
    bag,
    viewNewProduct,
    newProduct,
    viewAdminProduct,
    viewProductEdition
}

