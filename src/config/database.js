const mongoose = require("mongoose");

// use async await to establish connection with mongoose
const connectDb = async () => {
  await mongoose.connect(
    "mongodb+srv://ankit:rumzvA3pJj15MeFV@cluster0.pzqrfth.mongodb.net/devTinder"
  );
};

module.exports = connectDb;
