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
    async updateProduct(id: string, data: Partial<IProduct>): Promise<IProduct | null> {
        try {
            // Buscar y actualizar el producto con los datos proporcionados
            const updatedProduct = await productoModels.findByIdAndUpdate(
                id,
                { $set: data }, // Usamos $set para actualizar solo los campos proporcionados
                { new: true, runValidators: true } // new: true devuelve el documento actualizado, runValidators asegura que las validaciones del modelo se ejecuten
            );

            return updatedProduct;
        } catch (error) {
            console.error(`Error al actualizar el producto con ID ${id}:`, error);
            throw new Error("No se pudo actualizar el producto");
        }
    }

    //servicio para eliminar un producto
    async deleteProducts(id:string):Promise<IProduct | null>{
        return await productoModels.findByIdAndDelete(id)
    }
    // servicio para modificar el estado de un producto

    async modifyStatusProducts(id: string): Promise<IProduct | null> {
        // Primero obtenemos el producto actual
        const product = await productoModels.findById(id);
        
        if (!product) {
            return null; // Retornamos null si no se encuentra el producto
        }

        // Alternamos el estado actual
        const newStatus = !product.status;

        // Actualizamos el producto con el nuevo estado
        return await productoModels.findByIdAndUpdate(
            id,
            { status: newStatus },
            { new: true } // Retorna el documento actualizado
        );
    }
    
}

export default new productoServicio;