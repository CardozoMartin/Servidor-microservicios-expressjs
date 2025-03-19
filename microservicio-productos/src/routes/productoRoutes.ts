import {Router} from 'express';
import productController from '../controller/productController';

const router = Router();

router.post('/',productController.postProduct)


export default router;