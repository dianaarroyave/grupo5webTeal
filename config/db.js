const { Sequelize } = require('sequelize');
const dotenv = require('dotenv');
dotenv.config({path: '.env'});

const db = new Sequelize(process.env.BD_NAME, process.env.BD_USER, process.env.BD_PASSWORD,{
    host: process.env.BD_HOST,
    port: process.env.BD_PORT,
    dialect: 'mysql',
    define: {
        timestamps: true
    },
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000,
    },
});

module.exports = db;