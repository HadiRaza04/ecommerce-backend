// const express = require('express');
// const cors = require('cors');
// require('dotenv').config();
// const UserRoute = require('./routes/UserRoute');
// const connectDB = require('./config/db');
// const ProductRouter = require('./routes/ProductRoute');
// const OrderRouter = require('./routes/OrderRoute');
// const authRoute = require('./routes/googleRouter');


// const app = express();
// app.use(cors('*'))
// app.use("/uploads", express.static("uploads"));
// // app.use(cors({
// //   origin: "http://localhost:5173",
// //   credentials: true,
// // }));
// connectDB();
// app.use(express.json());
// const PORT = process.env.PORT;

// app.use('/user', UserRoute)
// app.use('/social',authRoute)
// app.use('/products', ProductRouter)
// app.use('/orders', OrderRouter)

// app.get('/', (req, res) => {
//   res.send('Server is running!')
// })

// app.listen(PORT, () => {
//     console.log("Server listen on port", PORT)
// })

const express = require('express');
const cors = require('cors');
require('dotenv').config();

const UserRoute = require('./routes/UserRoute');
<<<<<<< HEAD
// const connectDB = require('./config/db');
=======
>>>>>>> a1b531908173838ab6bd46866e3dfa03635ce8e3
const ProductRouter = require('./routes/ProductRoute');
const OrderRouter = require('./routes/OrderRoute');
const authRoute = require('./routes/googleRouter');
const connectDB = require('./config/db');

const app = express();
<<<<<<< HEAD
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
=======
>>>>>>> a1b531908173838ab6bd46866e3dfa03635ce8e3

app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));

connectDB();

app.use('/user', UserRoute);
app.use('/social', authRoute);
app.use('/products', ProductRouter);
app.use('/orders', OrderRouter);

<<<<<<< HEAD
// app.listen(PORT, () => {
//     console.log("Server listen on port", PORT)
// })

module.exports = app;
=======
app.get('/', (req, res) => {
  res.send('Server is running!');
});

module.exports = app;
>>>>>>> a1b531908173838ab6bd46866e3dfa03635ce8e3
