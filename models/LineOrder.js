const { DataTypes } = require('sequelize');
const bcrypt = require('bcryptjs');
const db = require('../config/db.js');

const LineOrder = db.define('lineorder', {
    id_lineOrder: {//objeto con las características del campo
        type: dataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        unsigned: true,
  
      },
      id_user: {//objeto con las características del campo
        type: dataTypes.INTEGER,
        allowNull: false,
        unsigned: true,
  
      },
      id_purchaseOrders: {//objeto con las características del campo
        type: dataTypes.INTEGER,
        allowNull: false,
        unsigned: true,
      }
});

module.exports = LineOrder;