const mongoose = require('mongoose');

const WalletSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        unique: true
    },
    balance: {
        type: Number,
        default: 0,
        min: [0, 'Balance cannot be negative']
    }
}, { timestamps: true });

module.exports = mongoose.model("Wallet", WalletSchema);