const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: [true, "username already exists"]
    },
    email: {
        type: String,
        required: [true, "email is required"],
        unique: [true, "email already exists"]
    },
    password: {
        type: String,
        required: true
    }
})

const userModel = mongoose.model("user", userSchema)
module.exports = userModel