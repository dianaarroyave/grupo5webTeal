let fs = require('fs');
let path = require('path');

const productsFilePath = path.join(__dirname, '../data/products.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf8'));

let homeDynamicObject = [{
    image: "/images/user.png",
    name: "",
    logged: false
  }];

const home = (req, res)=>{
        homeDynamicObject = [homeDynamicObject[0]];
        let featuredProducts = products.filter(
          (product) => product.featured == true || product.featured == 'on'
        );
        for (let i = 0; i < featuredProducts.length; i++) {
            homeDynamicObject.push(featuredProducts[i]);
          }
          console.info(homeDynamicObject);
          res.render('products/home', { homeDynamicObject });
}

module.exports = home;