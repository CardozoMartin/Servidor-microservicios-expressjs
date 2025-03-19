import productoModels ,{IProduct} from '../models/productoModels';

class productoServicio{

    async createProduct(productData:IProduct):Promise<IProduct>{
        const newProduct = new productoModels(productData);
        return await newProduct.save();
    }
}

export default new productoServicio;