//Importo FileSystem
const fs = require ("fs")


// Se creará una instancia de la clase "ProductManager"
class ProductManager {
    //variante para generar id automaticamente
    static Id = 0;
    
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
        id: ++ProductManager.Id,
        title,
        description,
        price,
        img,
        code,
        stock
    }
    this.products.push(newProduct);
    }

    getProducts(){
        return this.products;
    }

    getProductsByID(id){

        const product = this.products.find(item=>item.id === id);

        if(!product){
            console.log('Producto no encontrado');
        }else{
            console.log('Producto encontrado',product);
        }
    }
}

//Testing

// _1_
const manager = new ProductManager();

// _2_
console.log(manager.getProducts());

//_3_
manager.addProduct('Producto prueba','este es un producto prueba', 200,'sin imagen','abc123',25);

//_4_
manager.addProduct('Zapallo','anco',1000,'sin imagen','abc123',10)
console.log(manager.getProducts());

//_5_
manager.getProductsByID(3);







