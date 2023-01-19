const Product = require('../../models/Product');
let userImage = {userImage:"empty.png",fullName:"INICIAR SESIÓN"};
const home = async (req, res) => {
  const [productDatabase] = await Promise.all([
    Product.findAll()
  ]);
  let featuredProducts = productDatabase.filter(
    (product) => product.featured == 'on'
  );
  //session user image
  if(req.session.userImage){
    userImage = req.session.userImage
    console.info('___________________________________________________',userImage);
  }
  res.render('products/home', {featuredProducts,userImage})
};

const aboutUs = (req, res) => {
  res.render('products/aboutUs')
};


module.exports = { home, aboutUs }
