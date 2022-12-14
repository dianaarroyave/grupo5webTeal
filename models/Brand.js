const { DataTypes } = require('sequelize');
const bcrypt = require('bcryptjs');
const db = require('../config/db.js');

const Brand = db.define('brands', {
  id_brands: {
    type: dataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
    unsigned: true,
  },
  brandDescription: {
    type: dataTypes.STRING,
    defaultValue: true,
    allowNull: true,
  }
});

module.exports = Brand;

