const { DataTypes } = require('sequelize');
const bcrypt = require('bcryptjs');
const db = require('../config/db.js');

const User = db.define('users', {
    userImage: {
        type: DataTypes.STRING,
        allowNull: true,
        // default:"user.png"
    },
    fullName: {
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
        type: DataTypes.STRING,
        allowNull: false
    },
   password: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    //Encriptar contraseña
    hooks: {
        beforeCreate: async function (User) {
            const salt = await bcrypt.genSalt(10);
            User.password = await bcrypt.hash(User.password, salt);
        }
    },
    scopes: {
        eliminarPassword:{
            attributes: {
        exclude: ['userImage','documentType','documentNumber','password', 'createdAt', 'updatedAt']
            }
        }
    }
});

User.prototype.verificarPassword = function(password){
    return bcrypt.compareSync(password, this.password)
};

module.exports = User;
