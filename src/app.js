const express = require("express");
const connectDb = require("./config/database");
const User = require("./models/user");

const app = express();

app.post("/signup", async(req, res) => {
    const user = new User({
        firstName: "MS",
        LastName: "Dhoni",
        email: "msd@gmail.com",
        password: "ms@123"
    })
    try {
        await user.save()
        res.send("User added successfully..")
    } catch(err) {
        res.status(401).send("Error saving records to DB" + err.message)
    }
})

connectDb()
  .then(() => {
    console.log("Database connected successfully..");
    app.listen(3000, () => {
      console.log("Server started successfully");
    });
  })
  .catch((err) => {
    throw new Error("Connection Failed");
  });
