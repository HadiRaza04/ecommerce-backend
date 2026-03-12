const express = require('express');
const WalletRouter = express.Router();
const { addFunds, getWallet } = require('../controller/WalletController');
const protect = require('../middleware/auth'); // Adjust paths as needed
const authorize = require('../middleware/role'); // Adjust paths as needed

// User can view their own wallet
WalletRouter.get('/', protect, getWallet);

// ONLY Admin can add funds
WalletRouter.post('/', protect, authorize("admin"), addFunds);

module.exports = WalletRouter;