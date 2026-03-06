const Cart = require('../models/CartModel');

// @desc    Add item to cart or increment quantity
// @route   POST /api/cart/add
exports.addToCart = async (req, res) => {
    try {
        const userId = req.user.id;
        const { productId } = req.body;

        let cart = await Cart.findOne({ user: userId });

        if (!cart) {
            // Create new cart if it doesn't exist
            cart = await Cart.create({
                user: userId,
                items: [{ product: productId, quantity: 1 }]
            });
        } else {
            // Check if product already exists in cart
            const itemIndex = cart.items.findIndex(item => item.product.toString() === productId);

            if (itemIndex > -1) {
                // If exists, increment quantity
                cart.items[itemIndex].quantity += 1;
            } else {
                // If not, push new item
                cart.items.push({ product: productId, quantity: 1 });
            }
            await cart.save();
        }

        res.status(200).json({ message: "Item added to cart", data: cart });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

// @desc    Decrease quantity or remove if quantity is 1
// @route   POST /api/cart/decrease
// @desc    Increase quantity of an existing item in cart
// @route   POST /api/cart/increase
exports.increaseQuantity = async (req, res) => {
    try {
        const { productId } = req.body;
        const cart = await Cart.findOne({ user: req.user.id });

        if (!cart) return res.status(404).json({ message: "Cart not found" });

        const itemIndex = cart.items.findIndex(item => item.product.toString() === productId);

        if (itemIndex > -1) {
            // Increment quantity
            cart.items[itemIndex].quantity += 1;
            
            await cart.save();
            
            // Populate product details so frontend doesn't break
            const updatedCart = await Cart.findById(cart._id).populate('items.product');
            
            res.status(200).json({ message: "Quantity increased", data: updatedCart });
        } else {
            res.status(404).json({ message: "Product not in cart" });
        }
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

// @desc    Updated Decrease logic with Population
exports.decreaseQuantity = async (req, res) => {
    try {
        const { productId } = req.body;
        const cart = await Cart.findOne({ user: req.user.id });

        if (!cart) return res.status(404).json({ message: "Cart not found" });

        const itemIndex = cart.items.findIndex(item => item.product.toString() === productId);

        if (itemIndex > -1) {
            if (cart.items[itemIndex].quantity > 1) {
                cart.items[itemIndex].quantity -= 1;
            } else {
                cart.items.splice(itemIndex, 1);
            }
            
            await cart.save();
            
            // Populate so the frontend gets full product info back
            const updatedCart = await Cart.findById(cart._id).populate('items.product');
            
            res.status(200).json({ message: "Quantity decreased", data: updatedCart });
        } else {
            res.status(404).json({ message: "Product not in cart" });
        }
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
};

// @desc    Get user cart
// @route   GET /api/cart
exports.getCart = async (req, res) => {
    try {
        const cart = await Cart.findOne({ user: req.user.id }).populate('items.product');
        res.status(200).json(cart || { items: [] });
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
};

// @desc    Remove product entirely from cart
// @route   DELETE /api/cart/remove/:productId
exports.deleteFromCart = async (req, res) => {
    try {
        const { productId } = req.params; // Using params is standard for DELETE
        const userId = req.user.id;

        const cart = await Cart.findOneAndUpdate(
            { user: userId },
            { $pull: { items: { product: productId } } },
            { new: true }
        ).populate('items.product');

        if (!cart) {
            return res.status(404).json({ message: "Cart not found" });
        }

        res.status(200).json({ 
            message: "Product removed from cart", 
            data: cart 
        });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};