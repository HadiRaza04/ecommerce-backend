import express from 'express';
import protect from '../middleware/auth.js';
import authorize from '../middleware/role.js';
import upload from '../middleware/upload.js';
import { getAllOrders, updateStatus } from '../controller/OrderController.js';

const OrderRouter = express.Router();

OrderRouter.get('/', protect, authorize("admin", "user"), getAllOrders);
OrderRouter.put('/editstatus', protect, authorize("admin", "user"), updateStatus);

// OrderRouter.get('/:id', protect, authorize("admin", "user"), getSingleProduct)
// OrderRouter.post('/addProduct', protect, authorize("admin"), upload.array('image', 5), addProduct)
// OrderRouter.put('/updateProduct/:id', protect, authorize("admin"), upload.array('image', 5), updateProduct)
// OrderRouter.delete('/deleteProduct/:id', protect, authorize("admin"), deleteProduct)

export default OrderRouter;