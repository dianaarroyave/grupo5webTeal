const express = require("express");
const app = express();
const path = require('path');
const main = require('./src/routes/main');
const cookies = require('cookie-parser');
const productsRoutes = require('./src/routes/productsRoutes');
const userRoutes = require('./src/routes/userRoutes');
const db = require('./config/db')

//procedimiento para login----------------------------------------
app.use(cookies())

//metodo override-------------------------------------------------
const methodOverride = require('method-override');
app.use(methodOverride('_method'));
//----------------------------------------------------------------
//Para captar info de formularios-------------------------------------------------
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
//----------------------------------------------------------------

//Conexión a la base de datos
try {
  db.authenticate();
  db.sync();
  console.log('Conexión a la base de datos');
} catch (error) {
  console.log(error);
}
//---------------------------------------------------
app.set('views', path.join(__dirname, '/src/views'));
app.set("view engine", "ejs");

app.use(express.static('public'));

app.use('/', main);
app.use('/products', main);
app.use('/', userRoutes);
app.use('/products', productsRoutes);


app.listen(3000, () => console.log("servidor corriendo"));
