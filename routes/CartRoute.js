import express from 'express';
import { 
    getCart, 
    addToCart, 
    decreaseQuantity, 
    deleteFromCart, 
    increaseQuantity, 
    toggleCart 
} from '../controller/CartController.js';
import protect from '../middleware/auth.js';

const CartRouter = express.Router();

CartRouter.get('/', protect, getCart);
CartRouter.post('/add', protect, addToCart);
CartRouter.post('/decrease', protect, decreaseQuantity);
CartRouter.post('/:productId', protect, toggleCart);
CartRouter.post('/increase', protect, increaseQuantity);
CartRouter.delete('/:productId', protect, deleteFromCart);

export default CartRouter;