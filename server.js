const express = require('express');
require('dotenv').config();
const UserRoute = require('./routes/UserRoute');
const connectDB = require('./config/db');
const ProductRouter = require('./routes/ProductRoute');

const app = express();
connectDB();
app.use(express.json());
const PORT = process.env.PORT;

app.use('/', UserRoute)
app.use('/products', ProductRouter)

app.listen(PORT, () => {
    console.log("Server listen on port", PORT)
})