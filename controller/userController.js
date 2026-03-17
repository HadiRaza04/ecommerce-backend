import User from '../models/UserModel.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import Favourite from '../models/FavouriteModel.js';
import Product from '../models/ProductModel.js';
import { createWallet } from './WalletController.js';
import { SALT_ROUNDS, JWT_Secret, JWT_EXPIRES_IN } from '../env.js';


export async function registerUser(req, res) {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) return res.status(400).json({ message: 'Missing fields' });

        const existing = await User.findOne({ email });
        if (existing) return res.status(409).json({ message: 'Email already registered' });

        const passwordHash = await bcrypt.hash(password, SALT_ROUNDS);
        const user = new User({ name, email, password: passwordHash });

        await user.save();

        return res.status(201).json({
            message: "User created successfully",
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
            }
        });
    } 
    catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export async function login(req, res) {
    try {
        const { email, password } = req.body;
        if (!email || !password) return res.status(400).json({ message: 'Missing email or password' });

        const user = await User.findOne({ email });
        if (!user) return res.status(401).json({ message: 'Invalid credentials' });

        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch) return res.status(401).json({ message: "Wrong Password"});

        const token = jwt.sign(
            {id: user.id, role: user.role}, 
            JWT_Secret, 
            {expiresIn: JWT_EXPIRES_IN}
        );
        
        await createWallet(user._id);
        
        return res.json({
            message: "Login success",
            token,
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        });
    } 
    catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
}

export const AddFavourite = async (req, res) => {
  try {
    const userId = req.user.id;
    const { productId } = req.body;

    if (!productId) {
      return res.status(400).json({ message: "Product ID is required" });
    }

    const productExists = await Product.findById(productId);
    if (!productExists) {
      return res.status(404).json({ message: "Product not found" });
    }

    let favourite = await Favourite.findOne({ user: userId });

    if (!favourite) {
      favourite = await Favourite.create({
        user: userId,
        products: [productId],
      });

      return res.status(201).json({
        success: true,
        message: "Added to favourites",
        data: favourite,
      });
    }

    if (favourite.products.includes(productId)) {
      return res.status(409).json({
        message: "Product already in favourites",
      });
    }

    favourite.products.push(productId);
    await favourite.save();

    return res.status(200).json({
      success: true,
      message: "Product added to favourites",
      data: favourite,
    });

  } catch (error) {
    return res.status(500).json({
      error: error.message,
    });
  }
};