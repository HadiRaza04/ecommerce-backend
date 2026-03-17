import Product from '../models/ProductModel.js';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

// Replicating __dirname for ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json({
            success: true,
            count: products.length,
            data: products,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message,
        });
    }
};

export const getSingleProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findById(id);

        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found",
            });
        }
        res.status(200).json({
            success: true,
            data: product,
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            error: error.message,
        });
    }
};

export const addProduct = async (req, res) => {
    try {
        const { name, description, price } = req.body;
        if (!req.files || req.files.length === 0) {
            return res.status(400).json({ message: "Images are required" });
        }
        const filePath = req.files.map(file => `/uploads/products/${file.filename}`);

        const product = new Product({ name, description, price, image: filePath });
        await product.save();
        return res.status(201).json({
            success: true,
            data: product,
        });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

export const updateProduct = async (req, res) => {
    try {
        const { id } = req.params;

        const existingProduct = await Product.findById(id);
        if (!existingProduct) return res.status(404).json({ message: "Not found" });

        const { name, description, price } = req.body;
        let imageArray = existingProduct.image;
        if (req.files && req.files.length > 0) {
            imageArray = req.files.map(file => `/uploads/products/${file.filename}`);
        }

        const product = await Product.findByIdAndUpdate(
            id,
            { name, description, price, image: imageArray },
            {
                new: true,
                runValidators: true
            }
        );
        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found",
            });
        }

        res.status(200).json({
            success: true,
            message: "Product updated successfully",
            data: product,
        });
    } catch (error) {
        res.status(400).json({
            error: error.message
        });
    }
};

export const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findById(id);
        if (!product) return res.status(404).json({ message: "Product not found" });

        if (Array.isArray(product.image)) {
            product.image.forEach((img) => {
                const imagePath = path.join(__dirname, "..", img);

                if (fs.existsSync(imagePath)) {
                    fs.unlinkSync(imagePath);
                }
            });
        }
        await Product.findByIdAndDelete(id);
        res.status(200).json({ message: "Product and image deleted success" });
    } catch (error) {
        res.status(400).json({
            success: false,
            error: error.message
        });
    }
};