import express from 'express';
import { addFunds, getWallet, decreaseFunds, getAllWallets } from '../controller/WalletController.js';
import protect from '../middleware/auth.js';
import authorize from '../middleware/role.js';

const WalletRouter = express.Router();

// User can view their own wallet
WalletRouter.get('/', protect, getWallet);
WalletRouter.post('/decrease', protect, decreaseFunds);

// ONLY Admin can add funds
WalletRouter.post('/', protect, authorize("admin"), addFunds);
WalletRouter.get('/allwallets', protect, authorize("admin"), getAllWallets);

export default WalletRouter;