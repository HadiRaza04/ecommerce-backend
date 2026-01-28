const mongoose = require('mongoose');

const User = new mongoose.Schema({
    name: {
        type: String,
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
      type: String,
      enum: ["admin", "user"],
      default: "user",
    },
})

module.exports = mongoose.model("User", User);