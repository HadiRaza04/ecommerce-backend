const Favorite = require('../models/FavouriteModel');

exports.toggleFavorite = async (req, res) => {
    try {
        const userId = req.user.id;
        const { productId } = req.params;

        // 1. Find the user's favorite document
        let favDoc = await Favorite.findOne({ user: userId });

        // 2. If no document exists, create one with the first product
        if (!favDoc) {
            favDoc = await Favorite.create({
                user: userId,
                products: [productId]
            });
            return res.status(201).json({ message: "Added to favorites", isFavorite: true });
        }

        // 3. Check if product is already in the array
        const isFavorite = favDoc.products.includes(productId);

        if (isFavorite) {
            // Remove product from array
            await Favorite.findOneAndUpdate(
                { user: userId },
                { $pull: { products: productId } }
            );
            res.status(200).json({ message: "Removed from favorites", isFavorite: false });
        } else {
            // Add product to array (using $addToSet to prevent duplicates)
            await Favorite.findOneAndUpdate(
                { user: userId },
                { $addToSet: { products: productId } }
            );
            res.status(200).json({ message: "Added to favorites", isFavorite: true });
        }

    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

exports.getUserFavorites = async (req, res) => {
    try {
        // Populate the products array to get full details
        const favorites = await Favorite.findOne({ user: req.user.id }).populate('products');
        if (!favorites) {
            return res.status(200).json({ count: 0, data: [] });
        }

        res.status(200).json({ 
            count: favorites.products.length, 
            data: favorites.products // Returns the array of product objects
        });
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
};