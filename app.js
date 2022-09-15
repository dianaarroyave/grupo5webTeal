const express = require("express");
const path = require('path');
const app = express();

const publicPath = path.resolve(__dirname, "./public");
app.use( express.static(publicPath) );

app.listen(3000, () => console.log("servidor corriendo"));


//Paths:

app.get("/", (req, res) => {
    res.sendFile(path.resolve(__dirname, "./views/home.html"));
})

app.get("/css/homeCorporativo.html", (req, res) => {
    res.sendFile(path.resolve(__dirname, "./views/homeCorporativo.html"));
    
})

app.get("/css/homeSubmarcas.html", (req, res) => {
    res.sendFile(path.resolve(__dirname, "./views/homeSubmarcas.html"));
    
})
