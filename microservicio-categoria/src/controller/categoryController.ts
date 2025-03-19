import { Request, Response } from 'express';
import categoryService from '../service/categoryService';

class categoryController {
    //controllador para obtener todas las categorias
    async getCategory(req: Request, res: Response) {
        try {
            const category = await categoryService.getCategories();
            res.status(200).json({ message: 'Categorias Encontradas', category })
        } catch (error) {
            res.status(500).json({ message: 'Error al obtener las categorias, intente mas tarde' })
        }
    }

    //controlador para crear una categoria
    async postCategory(req: Request, res: Response) {
        try {
            const newCategory = await categoryService.createCategory(req.body);
            res.status(200).json({ message: 'Categoria creada', newCategory })
        } catch (error) {
            res.status(500).json({ message: 'Error al crear la categoria, intente mas tarde' })
        }
    }

    //controlador para obtener una categoria por id
    async getCategoryById(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const categoryForId = await categoryService.getCategoryByID(id);
            res.status(200).json({ message: 'Categoria encontrada', categoryForId })
        } catch (error) {
            res.status(500).json({ message: 'Error al encontrar la categoria por id, intente mas tarde' })
        }
    }

    //controlador para actualizar una categoria

    async updateCategory(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const categoryUpdated = await categoryService.updateCategory(id, req.body);
            res.status(200).json({ message: 'Categoria actualizada', categoryUpdated })
        } catch (error) {
            res.status(500).json({ message: 'Error al actualizar la categoria, intente mas tarde' })
        }
    }

    //controlador para eliminar una categoria
    async deleteCategory(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const categoryDeleted = await categoryService.deleteCategory(id);
            res.status(200).json({ message: 'Categoria Eliminada', categoryDeleted })
        } catch (error) {
            res.status(500).json({ message: 'Error al eliminar la categoria, intente mas tarde' })
        }
    }

    //contrlador para hacer un borrado logico
    async softDeleteCategory(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const categorySoftDeleted = await categoryService.softDeleteCategory(id);
            res.status(200).json({ message: 'Categoria eliminada logicamente', categorySoftDeleted })
        } catch (error) {
            res.status(500).json({ message: 'Errro al eliminar la categoria logicamente, intente mas tarde' })
        }
    }
}


export default new categoryController;