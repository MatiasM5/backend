const express = require("express");
const app = express();
const Contenedor = require("./routes/contenedor.js"); //

const ContenedorRouter = require("./routes/Container");

const contenedor = new Contenedor("productos.json");

app.use(express.json()); 
app.use("/content", express.static("public")); 


app.get("/", (req, res) => {
  res.send("Welcome todos");
});

const server = app.listen(8080, () => console.log("server up!!"));

server.on("error", (error) => console.log(`Error con el servidor`));

let numeroAleatorio = 0;
let productoRandom = [];
const fileSystem = new Contenedor("productos.json");

const main = async () => {
  const productos = await fileSystem.getAll();

  app.get("/productos", async (req, res) => {
    const allProducts = await contenedor.getAll();

    res.status(200).json(allProducts);
  });

  app.get("/productosRandom", (req, res) => {
    numeroAleatorio = Math.floor(Math.random() * productos.length) + 1;
    productoRandom = productos.find((prod) => prod.id === numeroAleatorio);
    res.json(productoRandom);
  });
};

main();