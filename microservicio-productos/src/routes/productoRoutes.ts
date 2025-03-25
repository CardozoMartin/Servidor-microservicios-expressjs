import {Router} from 'express';
import productController from '../controller/productController';

const router = Router();

router.post('/',productController.postProduct)
router.get('/',productController.getProducts)
router.put('/modify/:id',productController.modifyStatusProducts)
router.put('/updateProduct/:id',productController.putProducts)
router.delete('/deleteProduct/:id',productController.deleteProducts)
export default router;