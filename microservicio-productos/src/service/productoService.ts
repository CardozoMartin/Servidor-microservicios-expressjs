import productoModels ,{IProduct} from '../models/productoModels';

class productoServicio{

    async createProduct(productData:IProduct):Promise<IProduct>{
        const newProduct = new productoModels(productData);
        return await newProduct.save();
    }

    //servicio para obtener todos los productos
    async getProducts(): Promise<IProduct[]>{
        return await productoModels.find();
    } 
    //servicio para obtener un producto por id
    async getProductsById(id:string): Promise<IProduct | null>{
        return await productoModels.findById(id);
    }

    // servicio para actualizar un producto
    async putProducts(id:string):Promise<IProduct | null>{
        return await productoModels.findByIdAndUpdate(id);
    }

    //servicio para eliminar un producto
    async deleteProducts(id:string):Promise<IProduct | null>{
        return await productoModels.findByIdAndDelete(id)
    }

    
}

export default new productoServicio;