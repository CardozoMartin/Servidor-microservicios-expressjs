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

}

export default new ProductController();