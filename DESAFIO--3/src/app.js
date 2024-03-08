//Importo FileSystem
const { log } = require("console");
const fs = require ("fs")




//Importamos el modulo servidor:
const PUERTO = 3000;
const express = require("express");

const app = express ();

// Inicialización del servidor
app.listen(PUERTO, () => {
    console.log(`Escuchando en http://localhost:${PUERTO}`);
});
// Ruta principal
app.get("/", (req, res) => {
    res.send("¡Bienvenido a la aplicación de gestión de productos!");
});






// Se creará una instancia de la clase "ProductManager"
class ProductManager {
    //variante para generar id automaticamente
    static id = 0;
    
    constructor() {
        this.products=[];
        this.path = "./src/products.json";
    }
    
    addProduct(title,description,price,img,code,stock){

        if(!title || !description || !price || !img || !code || !stock ){
        console.log('Error. Complete todos los campos');
        return;
        }
        if(this.products.some(item=>item.code === code)){
        console.log('El código debe ser único');
    }
    const newProduct = {
        id: ++ProductManager.id,
        title,
        description,
        price,
        img,
        code,
        stock
    }
    this.products.push(newProduct);



//creacion del archivo.json
    fs.writeFileSync(this.path, JSON.stringify(this.products,null,2));
    
    };
    //leer el archivo de productos
    getProduct() {
        return JSON.parse(fs.readFileSync(this.path, "utf-8"));
        
    }

//leer el archivo buscando el prod especifico por ID
    getProductsById(id){
        if(!this.products.find((product)=> product.id  == id)){
            console.log( `Producto con ID ${id} no encontado, intente con otro ID.` );
        }else{
            console.log("Producto encontrado: ",this.products.find(( product )=> product.id == id));
        }
    };


//actualizacion de id y productos
    updateProduct(id, updatedProduct) {
        const index = this.products.findIndex((product) => product.id == id);

        if (index === -1) {
            return console.log(`Not Found id: ${id}`);
        }

        // Actualizar el producto con el nuevo objeto
        this.products[index] = { ...this.products[index], ...updatedProduct };

        // Escribir en el archivo JSON después de la actualización
        fs.writeFileSync(this.path, JSON.stringify(this.products, null, 2));
        console.log(`Producto ${id} editado`);
    };



//eliminamos un producto por su id
    deleteProduct(id) {
        const index = this.products.findIndex((product) => product.id == id);

        if (index === -1) {
            return console.log(`no se encontró el id: ${id}`);
        }

        // Eliminar el producto del array
        this.products.splice(index, 1);

        // Escribir en el archivo JSON después de la eliminación
        fs.writeFileSync(this.path, JSON.stringify(this.products, null, 2));
        console.log(`Producto ${id} eliminado`);
    }
    
}



// ARRAY de productos

app.get("/products", (req,res) => {
    let limit = parseInt(req.query.limit);
    console.log(typeof limit);

    let products = new ProductManager().getProduct().slice(0, limit);
    if(products){
        res.send(products);
    }else{
        res.send("no se encontro el array")
    }
    console.log("Productos: ",products);
}); // para verlo en la web //* /products?limit=1



















