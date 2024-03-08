//Importo FileSystem
const { log } = require("console");
const fs = require ("fs")


// Se creará una instancia de la clase "ProductManager"
class ProductManager {
    //variante para generar id automaticamente
    static id = 0;
    
    constructor() {
        this.products=[];
        this.path = "./products.json";
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




//Testing

// _1_
const manager = new ProductManager();

//A)_ 
manager.addProduct('Procesador AMD', 'Ryzen 9', 400000,"img",'20',10 );
manager.addProduct('Procesador AMD', 'Ryzen 5', 280000,"img",'20',5 );

//B)_
console.log(manager.getProduct());

//C)_
manager.getProductsById(2);

//D)_
manager.updateProduct(1, {
    title: 'Procesador AMD',
    description: 'Ryzen 3',
    price: 200000,
    img: 'img',
    code: '30',
    stock: 10
});


//E)_
manager.deleteProduct(1)








