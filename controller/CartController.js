import Cart from '../models/CartModel.js';

// @desc    Toggle item in cart (Add if missing, Remove if exists)
// @route   POST /api/cart/toggle/:productId
export const toggleCart = async (req, res) => {
    try {
        const userId = req.user.id;
        const { productId } = req.params;

        // 1. Find the user's cart
        let cart = await Cart.findOne({ user: userId });

        // 2. If no cart exists, create one with the item
        if (!cart) {
            cart = await Cart.create({
                user: userId,
                items: [{ product: productId, quantity: 1 }]
            });
            return res.status(201).json({ 
                message: "Product added to cart", 
                isInCart: true 
            });
        }

        // 3. Check if the product already exists in the items array
        const itemIndex = cart.items.findIndex(item => 
            item.product.toString() === productId
        );

        if (itemIndex > -1) {
            // Product exists: Remove it (Toggle OFF)
            await Cart.findOneAndUpdate(
                { user: userId },
                { $pull: { items: { product: productId } } },
                { new: true }
            );
            res.status(200).json({ 
                message: "Removed from cart", 
                isInCart: false 
            });
        } else {
            // Product doesn't exist: Add it (Toggle ON)
            await Cart.findOneAndUpdate(
                { user: userId },
                { $push: { items: { product: productId, quantity: 1 } } },
                { new: true }
            );
            res.status(200).json({ 
                message: "Added to cart", 
                isInCart: true 
            });
        }
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

// @desc    Add item to cart or increment quantity
// @route   POST /api/cart/add
export const addToCart = async (req, res) => {
    try {
        const userId = req.user.id;
        const { productId } = req.body;

        let cart = await Cart.findOne({ user: userId });

        if (!cart) {
            cart = await Cart.create({
                user: userId,
                items: [{ product: productId, quantity: 1 }]
            });
        } else {
            const itemIndex = cart.items.findIndex(item => item.product.toString() === productId);

            if (itemIndex > -1) {
                cart.items[itemIndex].quantity += 1;
            } else {
                cart.items.push({ product: productId, quantity: 1 });
            }
            await cart.save();
        }

        res.status(200).json({ message: "Item added to cart", data: cart });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

// @desc    Increase quantity of an existing item in cart
// @route   POST /api/cart/increase
export const increaseQuantity = async (req, res) => {
    try {
        const { productId } = req.body;
        const cart = await Cart.findOne({ user: req.user.id });

        if (!cart) return res.status(404).json({ message: "Cart not found" });

        const itemIndex = cart.items.findIndex(item => item.product.toString() === productId);

        if (itemIndex > -1) {
            cart.items[itemIndex].quantity += 1;
            await cart.save();
            
            const updatedCart = await Cart.findById(cart._id).populate('items.product');
            res.status(200).json({ message: "Quantity increased", data: updatedCart });
        } else {
            res.status(404).json({ message: "Product not in cart" });
        }
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

// @desc    Decrease quantity or remove if quantity is 1
// @route   POST /api/cart/decrease
export const decreaseQuantity = async (req, res) => {
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
export const getCart = async (req, res) => {
    try {
        const cart = await Cart.findOne({ user: req.user.id }).populate('items.product');
        res.status(200).json(cart || { items: [] });
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
};

// @desc    Remove product entirely from cart
// @route   DELETE /api/cart/remove/:productId
export const deleteFromCart = async (req, res) => {
    try {
        const { productId } = req.params;
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