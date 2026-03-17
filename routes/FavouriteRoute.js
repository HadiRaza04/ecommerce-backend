import express from 'express';
import { getUserFavorites, toggleFavorite } from '../controller/FavouriteController.js';
import protect from '../middleware/auth.js';
import authorize from '../middleware/role.js';

const FavRouter = express.Router();

FavRouter.get('/', protect, getUserFavorites);
FavRouter.post('/:productId', protect, toggleFavorite);

export default FavRouter;