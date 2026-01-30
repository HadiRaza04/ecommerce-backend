const express = require('express');
const cors = require('cors');
require('dotenv').config();
const UserRoute = require('./routes/UserRoute');
const connectDB = require('./config/db');
const ProductRouter = require('./routes/ProductRoute');

const app = express();
// app.use(cors('*'))
app.use("/uploads", express.static("uploads"));
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
}));
connectDB();
app.use(express.json());
const PORT = process.env.PORT;

app.use('/', UserRoute)
app.use('/products', ProductRouter)

app.listen(PORT, () => {
    console.log("Server listen on port", PORT)
})