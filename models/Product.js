const { DataTypes } = require('sequelize');
const bcrypt = require('bcryptjs');
const db = require('../config/db.js');

const Product = db.define('products', {
    id_products: {
        autoIncrement: true,
        primaryKey: true,
        type: dataTypes.INTEGER,
        unsigned: true,
        allowNull: false
      },
      name: {
        type: dataTypes.STRING,
        allowNull: false
      },
      price: {
        type: dataTypes.INTEGER,
        allowNull: false
      },
      productDescription: {
        type: dataTypes.STRING,
        allowNull: true,
        defaultValue: true
      },
      collectionDescription: {
        type: dataTypes.STRING,
        allowNull: true,
        defaultValue: true
      },
      collection: {
        type: dataTypes.STRING,
        allowNull: true,
        defaultValue: true
      },
      id_brands: {
        type: dataTypes.INTEGER,
        allowNull: true,
        defaultValue: true
      }
});

module.exports = Product;

//Relaciones
// Products.associate = function (models) {
//   Products.belongsTo(models.Brand, {
//     as: 'products', // El nombre del modelo pero en plural
//     foreingKey: 'id_brands'
//   }),

//   Products.hasMany(models.PurchaseOrder, {
//     as: 'products',
//     foreingKey: 'id_purchaseOrders'
//   })
// }