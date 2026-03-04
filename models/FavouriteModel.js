const mongoose = require('mongoose');

const FavoriteSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        unique: true // One document per user
    },
    products: [{ // Notice this is now an array
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product'
    }]
}, { timestamps: true });

const Favorite = mongoose.model("Favorite", FavoriteSchema);
module.exports = Favorite;