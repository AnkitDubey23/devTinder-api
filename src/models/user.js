const mongoose = require("mongoose");
const validator = require("validator")

// Creating Schema for user
const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true,
    validate(value) {
    if(!validator.isEmail(value))
        throw new Error("Invalid Email address: " + value)
  } },
  password: { type: String, required: true, minLength: 8 },
  age: { type: Number, min: 18 },
  gender: { type: String,
    validate(value) {
        if(!["male", "female", "other"].includes(value)) {
            throw new Error("Gender data is not valid")
        }
    }
  },
  photoUrl: {
    type: String,
    default:
      "https://img.magnific.com/premium-photo/user-icon-person-circle-style-illustration_1342618-13775.jpg",
      validate(value) {
        if(!validator.isURL(value))
            throw new Error("Invalid Photo URL: " + value)
      }
  },
  about: { type: String, default: "This is default about of the user!" },
  skills: { type: [String] },
}, {timestamps: true});

// Creating model for User
const User = mongoose.model("User", userSchema);

module.exports = User;
