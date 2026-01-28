const express = require('express');
const { registerUser, login } = require('../controller/userController');

const UserRoute = express.Router();

UserRoute.post('/signup', registerUser);
UserRoute.post('/login', login)

module.exports = UserRoute;