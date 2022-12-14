const { DataTypes } = require('sequelize');
const bcrypt = require('bcryptjs');
const db = require('../config/db.js');

const User = db.define('users', {
    image: {
        type: DataTypes.STRING,
    },
    fullname: {
        type: DataTypes.STRING,
        allowNull: false
    },
    documentType: {
        type: DataTypes.STRING,
        allowNull: false
    },
    documentNumber: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    phoneNumber: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    dateBirth: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    hooks: {
        beforeCreate: async function(User){
            const salt = await bcrypt.genSalt(10);
            User.password = await bcrypt.hash( User.password, salt);
        }
    }
});

module.exports = User;