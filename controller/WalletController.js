const Wallet = require('../models/WalletModel');

// 1. Logic to be called during User Registration/Login
// You can call this function inside your Auth controller
exports.createWallet = async (userId) => {
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
exports.addFunds = async (req, res) => {
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

// 3. Get own wallet balance
exports.getWallet = async (req, res) => {
    try {
        const wallet = await Wallet.findOne({ user: req.user.id });
        res.status(200).json(wallet || { balance: 0 });
    } catch (error) {
        res.status(500).json({ message: "Error fetching wallet" });
    }
};