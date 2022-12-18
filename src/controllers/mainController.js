const Product = require('../../models/Product');

const home = async (req, res) => {
  const [productDatabase] = await Promise.all([
    Product.findAll()
  ]);
  let featuredProducts = productDatabase.filter(
    (product) => product.featured == 'on'
  );
  res.render('products/home', {featuredProducts})
};

const aboutUs = (req, res) => {
  res.render('products/aboutUs')
};


module.exports = { home, aboutUs }