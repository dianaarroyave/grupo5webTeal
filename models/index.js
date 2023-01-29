//Aquí se importan los modelos para hacer las RELACIONES
const Product = require('./Product');
const Brand = require('./Brand');
const User = require('./User');

Product.belongsTo(Brand, { foreignKey: 'brand_id'});



module.exports = { Product, Brand, User };