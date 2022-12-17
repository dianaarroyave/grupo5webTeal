const home = (req, res) => {
  res.render('products/home')
};

const aboutUs = (req, res) => {
  res.render('products/aboutUs')
};


module.exports = { home, aboutUs}