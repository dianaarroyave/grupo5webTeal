const express = require("express");
const path = require('path')
const app = express();

const publicPath = path.resolve(__dirname, "./public");
app.use( express.static(publicPath) );

app.listen(3000, () => console.log("servidor corriendo"));

// app.get("/", (req, res) => {
//     res.sendFile(path.resolve(__dirname, "./views/homeSombrilla.html"));
// })

app.get("/", (req, res) => {
<<<<<<< HEAD
    res.sendFile(path.resolve(__dirname, "./views/descripcionProducto.html"));
=======
    res.sendFile(path.resolve(__dirname, "./views/homeCorporativo.html"));
>>>>>>> aaccca145140afc5e5471a367518ddcb8c1e7a81
})