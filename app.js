const express = require("express");
const app = express();
const path = require('path');
const productsRouter = require('./src/routes/products');
const db = require('./config/db.js')

//procedimiento para login----------------------------------------
const session = require('express-session');
app.use(session({
  secret: 'secret word!',
  resave: false,
  saveUninitialized: true,
}))

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


app.use('/products', productsRouter);


app.listen(3000, () => console.log("servidor corriendo"));
