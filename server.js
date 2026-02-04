const express = require('express');
const cors = require('cors');
require('dotenv').config();
const UserRoute = require('./routes/UserRoute');
const connectDB = require('./config/db');
const ProductRouter = require('./routes/ProductRoute');
const OrderRouter = require('./routes/OrderRoute');
const authRoute = require('./routes/googleRouter');


const app = express();
app.use(cors('*'))
app.use("/uploads", express.static("uploads"));
// app.use(cors({
//   origin: "http://localhost:5173",
//   credentials: true,
// }));
connectDB();
app.use(express.json());
const PORT = process.env.PORT;

app.use('/user', UserRoute)
app.use('/social',authRoute)
app.use('/products', ProductRouter)
app.use('/orders', OrderRouter)

app.get('/', (req, res) => {
  res.send('Server is running!')
})

app.listen(PORT, () => {
    console.log("Server listen on port", PORT)
})