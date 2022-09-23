const express = require("express");
const app = express();
const path = require('path');
const mainRouter = require('./src/routes/main');

app.set('views', path.join(__dirname, '/src/views'));
app.set("view engine", "ejs");

app.use( express.static('public'));

app.use('/', mainRouter);

app.listen(3000, () => console.log("servidor corriendo"));

// app.get("/", (req, res) => {
//     res.sendFile(path.resolve(__dirname, "./views/home.html"));
// });

// app.get("/submarcas", (req, res) => {
//
