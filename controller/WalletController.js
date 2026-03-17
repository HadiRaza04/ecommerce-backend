import Wallet from '../models/WalletModel.js';

// 1. Logic to be called during User Registration/Login
export const createWallet = async (userId) => {
    try {
        const existingWallet = await Wallet.findOne({ user: userId });
        if (!existingWallet) {
            await Wallet.create({ user: userId, balance: 0 });
        }
    } catch (error) {
        console.error("Wallet creation failed:", error.message);
    }
};

// 2. Admin Only: Add amount to user wallet
export const addFunds = async (req, res) => {
    try {
        const { userId, amount } = req.body;

        if (amount <= 0) {
            return res.status(400).json({ message: "Amount must be greater than 0" });
        }

        const wallet = await Wallet.findOneAndUpdate(
            { user: userId },
            { $inc: { balance: amount } }, // $inc increases the current value
            { new: true, upsert: true } // upsert creates it if it doesn't exist
        );

        res.status(200).json({ message: "Funds added successfully", wallet });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

export const decreaseFunds = async (req, res) => {
    try {
        const { userId, amount } = req.body;

        // 1. Validate input
        if (amount <= 0) {
            return res.status(400).json({ message: "Amount must be greater than 0" });
        }

        // 2. Find the wallet first to check balance
        const wallet = await Wallet.findOne({ user: userId });

        if (!wallet) {
            return res.status(404).json({ message: "Wallet not found for this user" });
        }

        // 3. Check for sufficient funds
        if (wallet.balance < amount) {
            return res.status(400).json({ 
                message: "Insufficient funds", 
                currentBalance: wallet.balance 
            });
        }

        // 4. Deduct the amount
        const updatedWallet = await Wallet.findOneAndUpdate(
            { user: userId },
            { $inc: { balance: -amount } }, 
            { new: true }
        );

        res.status(200).json({ 
            message: "Funds deducted successfully", 
            wallet: updatedWallet 
        });

    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

// Admin Only: Get all wallets with user details
export const getAllWallets = async (req, res) => {
    try {
        const wallets = await Wallet.find()
            .populate('user', 'name email') 
            .sort({ createdAt: -1 });

        res.status(200).json(wallets);
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

// 3. Get own wallet balance
export const getWallet = async (req, res) => {
    try {
        const wallet = await Wallet.findOne({ user: req.user.id });
        res.status(200).json(wallet || { balance: 0 });
    } catch (error) {
        res.status(500).json({ message: "Error fetching wallet" });
    }
};