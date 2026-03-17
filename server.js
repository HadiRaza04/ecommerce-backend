import express from 'express';
import cors from 'cors';
import 'dotenv/config'; // Shortcut for require('dotenv').config() in ESM
import UserRoute from './routes/UserRoute.js';
import connectDB from './config/db.js';
import ProductRouter from './routes/ProductRoute.js';
import OrderRouter from './routes/OrderRoute.js';
import FavRouter from './routes/FavouriteRoute.js';
import CartRouter from './routes/CartRoute.js';
import WalletRouter from './routes/WalletRoute.js';
import { PORT } from './env.js';

const app = express();

// Database Connection
connectDB();

// Middlewares
app.use(cors('*'));
app.use("/uploads", express.static("./uploads"));
app.use(express.json());

// Routes
app.use('/', UserRoute);
app.use('/products', ProductRouter);
app.use('/orders', OrderRouter);
app.use('/favourite', FavRouter);
app.use('/cart', CartRouter);
app.use('/wallet', WalletRouter);

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});

export default app;