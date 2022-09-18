const express = require("express");
const path = require('path');
const app = express();

const publicPath = path.resolve(__dirname, "./public");
app.use( express.static(publicPath) );

app.listen(3000, () => console.log("servidor corriendo"));

app.get("/", (req, res) => {
    res.sendFile(path.resolve(__dirname, "./views/home.html"));
});

app.get("/submarcas", (req, res) => {
    res.sendFile(path.resolve(__dirname, "./views/submarcas.html"));
});

app.get("/ingresar", (req, res) => {
    res.sendFile(path.resolve(__dirname, "./views/formularioLogin.html"));
});

app.get("/registro", (req, res) => {
    res.sendFile(path.resolve(__dirname, "./views/formularioRegistro.html"));
});

app.get("/carrito", (req, res) => {
    res.sendFile(path.resolve(__dirname, "./views/carritoCompras.html"));
});

app.get("/detalle", (req, res) => {
    res.sendFile(path.resolve(__dirname, "./views/descripcionProducto.html"));
});

app.get("/nosotros", (req, res) => {
    res.sendFile(path.resolve(__dirname, "./views/corporativo.html"));
});

app.post("/",(req,res)=>{
    res.sendFile(path.join(__dirname,"./views/home.html"))
})