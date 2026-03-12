const express = require('express');
const { getCart, addToCart, decreaseQuantity, deleteFromCart, increaseQuantity, toggleCart } = require('../controller/CartController');
const protect = require('../middleware/auth');
const CartRouter = express.Router();

CartRouter.get('/', protect,  getCart)
CartRouter.post('/add', protect, addToCart);
CartRouter.post('/decrease', protect, decreaseQuantity);
CartRouter.post('/:productId', protect, toggleCart);
CartRouter.post('/increase', protect, increaseQuantity);
CartRouter.delete('/:productId', protect, deleteFromCart);

module.exports = CartRouter;