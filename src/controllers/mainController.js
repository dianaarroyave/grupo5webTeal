const Product = require('../../models/Product');
let userImage = {userImage:"empty.png",fullName:"INICIAR SESIÓN"};
const home = async (req, res) => {
  const [productDatabase] = await Promise.all([
    Product.findAll()
  ]);
  let featuredProducts = productDatabase.filter(
    (product) => product.featured == 1
  );
  //session user image
  if(req.session.userImage){
    userImage = req.session.userImage
  }
  res.render('products/home', {featuredProducts,userImage})
};

const aboutUs = (req, res) => {
   //session user image
   if(req.session.userImage){
    userImage = req.session.userImage
  };
  res.render('products/aboutUs', {userImage})
};


module.exports = { home, aboutUs }
