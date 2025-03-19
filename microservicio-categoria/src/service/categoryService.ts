import categoryModel, { Icategory } from "../models/categoryModel";

class categoryService {

    //Servicio para crear ua categoria
    async createCategory(categoryData: Icategory): Promise<Icategory> {
        const category = new categoryModel(categoryData);
        return await category.save();
    }

    //Servicio para obtener todas las categorias
    async getCategories(): Promise<Icategory[]> {
        return await categoryModel.find();
    }

    //Servicio para obtener una categoria por id
    async getCategoryByID(id: string): Promise<Icategory | null> {
        return await categoryModel.findById(id);

    }

    //Servicio para actualizar una categoria
    async updateCategory(id: string, categoryData:Partial<Icategory>): Promise<Icategory | null> {
        return await categoryModel.findByIdAndUpdate(id, categoryData, { new: true });
    }

    //Servicio para eliminar una categoria
    async deleteCategory(id:string): Promise<Icategory | null>{
        return await categoryModel.findByIdAndDelete(id);
    }

    //servicio para hacer un borrando logico
    async softDeleteCategory(id:string): Promise<Icategory | null>{
        return await categoryModel.findByIdAndUpdate(id, {status:false}, {new: true})
    }
}

export default new categoryService;