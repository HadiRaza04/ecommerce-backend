import mongoose from 'mongoose';
import { mongoDB_URI } from '../env.js';
let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function connectDB() {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    cached.promise = mongoose.connect(mongoDB_URI);
    console.log("db connected");
  }

  cached.conn = await cached.promise;
  return cached.conn;
}
export default connectDB;