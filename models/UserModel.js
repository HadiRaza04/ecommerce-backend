import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    email: {
        type: String,
        unique: true,
    },
    password: {
        type: String,
    },
    role: {
      type: String,
      enum: ["admin", "user"],
      default: "user",
    },
    provider: {
        type: String,
        enum: ["local", "google"],
        default: "local",
    }
});

const User = mongoose.model("User", UserSchema);

export default User;