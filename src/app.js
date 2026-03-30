const express = require("express");
const connectDb = require("./config/database");
const User = require("./models/user");

const app = express();

// express.json() is the middlewear provided by express
// to make json readable js.
app.use(express.json())

app.post("/signup", async(req, res) => {
    //Dynamic Data in request body by sending payload.
    const user = new User(req.body)
    try {
        // Save data to db
        await user.save()
        res.send("User added successfully..")
    } catch(err) {
        res.status(401).send("Error saving records to DB" + err.message)
    }
})

// connect db before listening to port
// use then and catch methods for error handling
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
