const express = require('express');
const { registerUser, login } = require('../controller/userController');
const { googleAuth } = require('../controller/authController.js');
const Checkout = require('../controller/checkoutController');
const authorize = require('../middleware/role');
const protect = require('../middleware/auth');

const UserRoute = express.Router();

UserRoute.get('/', (req, res) => {
    res.send('Server is running!')
});
UserRoute.post('/signup', registerUser);
UserRoute.post('/login', login);
UserRoute.post("/google", googleAuth);
UserRoute.post("/checkout", protect, authorize("admin", "user"), Checkout);

module.exports = UserRoute;