import axios from "axios";
import { Request, Response } from "express";
import dotenv from 'dotenv';
import productoService from "../service/productoService";

dotenv.config();
const categoryService = process.env.SERVICE_CATEGORY || "http://localhost:3002/api/category"; // Corrige esto

class ProductController {
    async getProducts(req: Request, res: Response) {
        try {
            const products = await productoService.getProducts();
            res.status(200).json({ message: "Todos los Productos", products })
        } catch (error) {
            res.status(500).json({ message: 'ocurrio un error al obtener los productos' })
        }
    }

    async postProduct(req: Request, res: Response) {
        try {
            // Validar el cuerpo
            if (!req.body || !req.body.category) {
                return res.status(400).json({ error: "El campo 'category' es requerido" });
            }

            const categoryId = req.body.category; // "bebidas"
            console.log("URL de la solicitud:", `${categoryService}/${categoryId}`); 
            const verifyCategory = await axios.get(`${categoryService}/${categoryId}`);

            if (!verifyCategory.data) {
                return res.status(400).json({ error: "Categoría no encontrada" });
            }

            const categoryName = verifyCategory.data.categoryForId?.name; // Usa optional chaining por seguridad
            if (!categoryName) {
                return res.status(400).json({ error: "Nombre de categoría no encontrado en la respuesta" });
            }

            const productData = { ...req.body, category: categoryName };
            const newProduct = await productoService.createProduct(productData);
            res.status(200).json({ message: 'Producto creado con éxito', newProduct });
        } catch (error) {
            console.error("Error en postProduct:", error.message); // Agrega log para depurar
            res.status(500).json({ message: 'Error al crear el producto', details: error.message });
        }
    }

    async modifyStatusProducts(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const productModify = await productoService.modifyStatusProducts(id);

            if (!productModify) {
                return res.status(404).json({ message: 'Producto no encontrado' });
            }

            res.status(200).json({
                message: 'El estado del producto cambió exitosamente',
                product: productModify
            });
        } catch (error) {
            res.status(500).json({
                message: 'Ocurrió un error al modificar el estado del producto',
                error: error instanceof Error ? error.message : 'Error desconocido'
            });
        }
    }

    //controlador para actualizar un producto
    async putProducts(req: Request, res: Response) {
        try {
            const { id } = req.params; // ID del producto a actualizar
            if (!id) {
                return res.status(400).json({ error: "El ID del producto es requerido" });
            }
    
            // Validar si hay datos en el cuerpo de la solicitud
            if (!req.body || Object.keys(req.body).length === 0) {
                return res.status(400).json({ error: "No se proporcionaron datos para actualizar" });
            }
    
            // Si se proporciona una nueva categoría, verificarla
            let updatedData = { ...req.body };
            if (req.body.category) {
                const categoryId = req.body.category;
                console.log("URL de la solicitud:", `${categoryService}/${categoryId}`);
                const verifyCategory = await axios.get(`${categoryService}/${categoryId}`);
    
                if (!verifyCategory.data) {
                    return res.status(400).json({ error: "Categoría no encontrada" });
                }
    
                const categoryName = verifyCategory.data.categoryForId?.name;
                if (!categoryName) {
                    return res.status(400).json({ error: "Nombre de categoría no encontrado en la respuesta" });
                }
    
                // Reemplazar el ID de la categoría por el nombre en los datos actualizados
                updatedData.category = categoryName;
            }
    
            // Llamar al servicio para actualizar el producto
            const updatedProduct = await productoService.updateProduct(id, updatedData);
    
            if (!updatedProduct) {
                return res.status(404).json({ message: "Producto no encontrado" });
            }
    
            res.status(200).json({
                message: "Producto actualizado con éxito",
                product: updatedProduct
            });
        } catch (error) {
            console.error("Error en putProducts:", error.message);
            res.status(500).json({
                message: "Error al actualizar el producto",
                details: error instanceof Error ? error.message : "Error desconocido"
            });
        }
    }

    //controlador para eliminar un producto
    async deleteProducts(req:Request,res:Response){
try {
    const { id} = req.params;
    const deleteProducts = await productoService.deleteProducts(id);
    res.status(200).json({message:'Producto Eliminado',deleteProducts})
} catch (error) {
    res.status(500).json({message:'ocurrio un error al eliminar el producto'})
}
    }
}

export default new ProductController();