const express = require('express');
const { registerUser, login, AddFavourite } = require('../controller/userController');
const { googleAuth } = require('../controller/authController');
const Checkout = require('../controller/CheckoutController');
const authorize = require('../middleware/role');
const protect = require('../middleware/auth');

const UserRoute = express.Router();

UserRoute.post('/signup', registerUser);
UserRoute.post('/login', login);
UserRoute.post("/google", googleAuth);
UserRoute.post("/checkout", protect, authorize("admin", "user"), Checkout);
UserRoute.post("/addFavourite", protect, authorize("admin", "user"), AddFavourite)

module.exports = UserRoute;