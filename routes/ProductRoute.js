import express from 'express';
import { 
    getAllProducts, 
    addProduct, 
    getSingleProduct, 
    updateProduct, 
    deleteProduct 
} from '../controller/ProductController.js';
import protect from '../middleware/auth.js';
import authorize from '../middleware/role.js';
import upload from '../middleware/upload.js';

const ProductRouter = express.Router();

ProductRouter.get('/', protect, authorize("admin", "user"), getAllProducts);
ProductRouter.get('/:id', protect, authorize("admin", "user"), getSingleProduct);
ProductRouter.post('/addProduct', protect, authorize("admin"), upload.array('image', 5), addProduct);
ProductRouter.put('/updateProduct/:id', protect, authorize("admin"), upload.array('image', 5), updateProduct);
ProductRouter.delete('/deleteProduct/:id', protect, authorize("admin"), deleteProduct);

export default ProductRouter;