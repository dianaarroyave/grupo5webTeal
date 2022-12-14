const { DataTypes } = require('sequelize');
const bcrypt = require('bcryptjs');
const db = require('../config/db.js');

const Product = db.define('products', {
  id_products: {
    type: dataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
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

