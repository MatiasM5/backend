const fs = require("fs");

export class Container {
  constructor(file) {
    this.file = file;
  }

  async save(object) {
    const dataToParse = await fs.readFileSync(this.file, "utf-8");
    const dataParsed = JSON.parse(dataToParse);
    const productFound = dataParsed.find(({ title }) => title == object.title);

    try {
      if (productFound) {
        console.log("El producto no existe");
      } else {
        object.id = dataParsed.length + 1;
        dataParsed.push(object);
        const updatedFile = JSON.stringify(dataParsed, null, " ");
        fs.writeFileSync(this.file, updatedFile);
        console.log(
          `Producto agregado: ${object.title} y su id es ${object.id}`
        );
        return object.id;
      }
    } catch (error) {
      console.log(`Se detecto un error:${error}`);
    }
  }

  async getById(idEntered) {
    const dataToParse = await fs.readFileSync(this.file, "utf-8");
    const dataParsed = JSON.parse(dataToParse);
    const idFound = dataParsed.find(({ id }) => id === idEntered);

    try {
      if (idFound) {
        console.table(idFound);
        return idFound;

      } else {
        console.log("No se ha encontrado el producto");
        return null;
      }

    } catch (error) {
      console.error(`Error en getByID: ${error}`);
    }
  }

  async getAll() {
    const dataToParse = await fs.readFileSync(this.file, "utf-8");
    const dataParsed = JSON.parse(dataToParse);

    try {
      if (dataParsed.length > 0) {
        console.log(dataParsed);
        return dataParsed;

      } else {
        console.log("No hay productos en la lista");
      }

    } catch (error) {
      console.error(`Error en getAll: ${error}`);
    }
  }

  async deleteById(idEntered) {
    const dataToParse = await fs.readFileSync(this.file, "utf-8");
    const dataParsed = JSON.parse(dataToParse);
    const leakedID = dataParsed.filter(({id}) =>  id !== idEntered);
    const idFound = dataParsed.find(({ id }) => id === idEntered);

    try {
      if (idFound) {
        console.log(`Se ha eliminado el producto:${idEntered} >> [[${idFound.title}]]`)
        const updatedFile = JSON.stringify(leakedID, null, " ");
        fs.writeFileSync(this.file, updatedFile);
        
      } else {
        console.log(`No se encontró el producto: ${idEntered}`);
      }

    } catch (error) {
      console.log(`Error en deleteById: ${error}`)
    }
  }

  async deleteAll() {
    console.log("Se han eliminado todos los productos")
    await fs.writeFileSync(this.file, "[]")
  }
}

const file = "./productos.json";
const contenedor = new Container(file);

let nuevoProducto = {
  title: "Procesador2",
  price: 150000,
  thumbnail:
    "https://mexx-img-2019.s3.amazonaws.com/Procesador-IntelCorei9-12900K--5.2Ghz-AlderLake-1700-SinCooler_41360_2.jpeg",
};

/*contenedor.save(nuevoProducto);*/

module.exports = Container