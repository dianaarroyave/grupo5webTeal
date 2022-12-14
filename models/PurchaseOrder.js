const { DataTypes } = require('sequelize');
const bcrypt = require('bcryptjs');
const db = require('../config/db.js');

const PurchaseOrder = db.define('purchaseorders', {
  id_purchaseOrders: {//objeto con las características del campo
    type: dataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
    unsigned: true,

  },
  id_products: {//objeto con las características del campo
    type: dataTypes.INTEGER,
    allowNull: false,
    unsigned: true,

  },
  quantity: {//objeto con las características del campo
    type: dataTypes.INTEGER,
    allowNull: false,
    unsigned: true,
  }
});

module.exports = PurchaseOrder;

