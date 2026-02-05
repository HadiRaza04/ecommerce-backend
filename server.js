const express = require('express');
const cors = require('cors');
require('dotenv').config();
const UserRoute = require('./routes/UserRoute');
// const connectDB = require('./config/db');
const ProductRouter = require('./routes/ProductRoute');
const OrderRouter = require('./routes/OrderRoute');

const app = express();
app.use(cors('*'))
app.use("/uploads", express.static("uploads"));
// app.use(cors({
//   origin: "http://localhost:5173",
//   credentials: true,
// }));
// connectDB();

let isConnected = false;
async function connectToMongodb() {
  try {
    await mongoose.connect(process.env.mongoDB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    isConnected = true;
    console.log("Mongodb Connected.");
    
  } catch (error) {
    console.error("Error connected to Db: ", error)
    
  }
}

app.use(express.json());

app.use((req, res, next) => {
  if(!isConnected) {
    connectToMongodb();
  }
  next()
})

// const PORT = process.env.PORT;

app.use('/', UserRoute)
app.use('/products', ProductRouter)
app.use('/orders', OrderRouter)

// app.listen(PORT, () => {
//     console.log("Server listen on port", PORT)
// })

module.exports = app;