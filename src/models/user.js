const mongoose = require("mongoose")

// Creating Schema for user
const userSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    email: String,
    password: String,
    age: Number,
    gender: String
})

// Creating model for User
const User = mongoose.model('User', userSchema)

module.exports = User;