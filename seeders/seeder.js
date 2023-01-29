const { exit } = require('node:process');
const { User, Product, Brand } = require('../models/index');
const user = require('./user');
const products = require('./product');
const brands = require('./brand');
const db = require('../config/db');

const importData = async () => {
    try {
        //Autenticación en la base de datos
        await db.authenticate();
        //Generar las columnas
        await db.sync();
        //Insertara los datos
        await Promise.all([
            User.bulkCreate(user),
            Brand.bulkCreate(brands),
            Product.bulkCreate(products),
        ])
    } catch (error) {
        console.log(error);
    };
};

const deletData = async () => {
    try {
        await db.sync({ force: true });
        console.log('Datos eliminados correctamente');
        exit();
    } catch (error) {
        console.log(error)
        exit(1)
    }
};

//con lo que se trabaja en el package
//argv siempre toma un arreglo
if (process.argv[2] === "-i") {
    importData();
}

if (process.argv[2] === "-e") {
    deletData();
}
