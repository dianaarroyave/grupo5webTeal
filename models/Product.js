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
    type: DataTypes.INTEGER,
    allowNull: false
  },
  productDescription: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  collection: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  collectionDescription: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  categories: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  size: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  color: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  quantity: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  featured: {
    type: DataTypes.BOOLEAN,
    allowNull: true,
  }
});

module.exports = Product;

