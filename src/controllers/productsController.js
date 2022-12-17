const { check, validationResult } = require('express-validator');
const Product = require('../../models/Product');

const brandOriginal = (req, res) => {
    res.render('products/brands')
};

const brandBasics = (req, res) => {
    res.render('products/brands')
};

const bag = (req, res) => {
    res.render('products/bag')
};
const viewNewProduct = (req, res) => {
    res.render('products/newProduct')
};

const newProduct = async (req, res) => {
    //Destructuring del registro
    const { name, price, productDescription, collection, collectionDescription, brand, categories, size, color, quantity, featured } = req.body;
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
    res.render('products/productEdition');
};

module.exports = {
    brandOriginal,
    brandBasics,
    bag,
    viewNewProduct,
    newProduct,
    viewAdminProduct,
    viewProductEdition
}