import 'dotenv/config';
export const PORT=process.env.PORT
// export const mongoDB_URI= process.env.mongoDB_URI
export const mongoDB_URI=process.env.mongoDB_URI
export const SALT_ROUNDS=process.env.SALT_ROUNDS
export const JWT_EXPIRES_IN=process.env.JWT_EXPIRES_IN
export const JWT_Secret=process.env.JWT_Secret
export const GOOGLE_CLIENT_ID=process.env.GOOGLE_CLIENT_ID
export const GOOGLE_CLIENT_SECRET=process.env.GOOGLE_CLIENT_SECRET
export const STRIPE_SECRET_KEY=process.env.STRIPE_SECRET_KEY