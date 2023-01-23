const { DataTypes } = require('sequelize');
const bcrypt = require('bcryptjs');
const db = require('../config/db.js');

const Product = db.define('products', {
  productImage: {
    type: DataTypes.STRING,
    allowNull: false
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  price: {
    type: DataTypes.STRING,
    allowNull: false
  },
  productDescription: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  collection: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  collectionDescription: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  categories: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  size: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  color: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  quantity: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  featured: {
    type: DataTypes.INTEGER,
    allowNull: true,
  }
});

module.exports = Product;

