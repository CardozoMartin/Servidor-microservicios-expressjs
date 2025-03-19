import { Router } from 'express';
import categoryController from '../controller/categoryController';


const router = Router();

router.post('/', categoryController.postCategory)
router.get('/', categoryController.getCategory);
router.get('/:id', categoryController.getCategoryById)
router.put('/:id', categoryController.updateCategory)
router.put('/:id', categoryController.softDeleteCategory)
router.delete('/category/:id', categoryController.deleteCategory)


export default router;
