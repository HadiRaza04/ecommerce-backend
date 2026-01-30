const express = require('express');
const { registerUser, login } = require('../controller/userController');
const { googleAuth } = require('../controller/authController');

const UserRoute = express.Router();

UserRoute.post('/signup', registerUser);
UserRoute.post('/login', login);
UserRoute.post("/google", googleAuth);

module.exports = UserRoute;