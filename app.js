const express = require("express");
const app = express();
const path = require('path');
const mainRouter = require('./src/routes/main');
const productsRouter = require('./src/routes/products');

//procedimiento para login----------------------------------------
const session = require('express-session');
app.use(session({secret: 'secret'}));

//metodo override-------------------------------------------------
const methodOverride = require('method-override');
app.use(methodOverride('_method'));
//----------------------------------------------------------------
//Para captar info de formularios-------------------------------------------------
app.use(express.urlencoded({extended: false}));
app.use(express.json());
//----------------------------------------------------------------

app.set('views', path.join(__dirname, '/src/views'));
app.set("view engine", "ejs");

app.use(express.static('public'));

app.use('/', mainRouter);
app.use('/products', productsRouter);


app.listen(3000, () => console.log("servidor corriendo"));
