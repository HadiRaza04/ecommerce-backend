const express = require('express');
const { getUserFavorites, toggleFavorite } = require('../controller/FavouriteController');
const protect = require('../middleware/auth');
const authorize = require('../middleware/role');

const FavRouter = express.Router();

FavRouter.get('/', protect, getUserFavorites);
FavRouter.post('/:productId', protect, toggleFavorite);

module.exports = FavRouter;