import {Router} from 'express';
import productController from '../controller/productController';

const router = Router();

router.post('/',productController.postProduct)
router.get('/',productController.getProducts)

export default router;