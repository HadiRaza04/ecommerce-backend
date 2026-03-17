import express from 'express';
import { registerUser, login, AddFavourite } from '../controller/userController.js';
import googleAuth from '../controller/AuthController.js';
import Checkout from '../controller/CheckoutController.js';
import authorize from '../middleware/role.js';
import protect from '../middleware/auth.js';

const UserRoute = express.Router();

UserRoute.post('/signup', registerUser);
UserRoute.post('/login', login);
UserRoute.post("/google", googleAuth);
UserRoute.post("/checkout", protect, authorize("admin", "user"), Checkout);
UserRoute.post("/addFavourite", protect, authorize("admin", "user"), AddFavourite);

export default UserRoute;