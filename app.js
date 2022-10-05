const express = require("express");
const app = express();
const path = require('path');
const mainRouter = require('./src/routes/main');
const productsRouter = require('./src/routes/products')

//metodo override-------------------------------------------------
app.use(methodOverride('_method'));
//----------------------------------------------------------------
app.set('views', path.join(__dirname, '/src/views'));
app.set("view engine", "ejs");

app.use(express.static('public'));

app.use('/', mainRouter);
app.use('/products', productsRouter)

app.listen(3000, () => console.log("servidor corriendo"));
