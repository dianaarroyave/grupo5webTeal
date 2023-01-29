const { DataTypes } = require('sequelize');
const bcrypt = require('bcryptjs');
const db = require('../config/db.js');

const Brand = db.define('brands', {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  }
});

module.exports = Brand;

