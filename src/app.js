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

// Get API fo find one user with email filter
// Always use async await whenevr making connection to db 
// for fetching data/sending data/updating data/ deleting data
app.get("/user", async (req, res) => {
    const userEmail = req.body.email;
    try {
        const users = await User.find({email: userEmail})
        if(users.length === 0) {
            res.status(404).send("User not found")
        } else {
            res.send(users)
        }
    } catch(err) {
        res.status(400).send("Something went wrong")
    }
})

// Get API - GET: /feed - Fetch all the user from DB.
app.get("/feed", async (req, res) => {
    try {
        const user = await User.find({})
        res.send(user)
    }  catch(err) {
        res.status(400).send("Something went wrong")
    }
})

// Delete API to deleted user based on ID
app.delete("/user", async(req, res) => {
    const userId = req.body.userId
    try {
        const deleteUser = await User.findByIdAndDelete(userId)
        res.send(deleteUser.firstName + ":" + " User deleted successfully")
    } catch(err) {
        res.status(400).send("Something went wrong")
    }
})

// PATCH API to update the data
app.patch("/user/:userId", async(req, res) => {
    const userId = req.params.userId
    const data = req.body;
    try {
      const ALLOWED_UPDATES = ["skills", "photoUrl", "about", "gender", "age"]
      const isAllowedUpdates = Object.keys(data).every(k => 
        ALLOWED_UPDATES.includes(k)
      )
      if(data?.skills.length > 10) {
        throw new Error("Skills cannot be more then 10.")
      }
      if(!isAllowedUpdates) {
        throw new Error("Updates not allowed")
      }
      const user = await User.findByIdAndUpdate({_id: userId}, data, {
        returnDocument: "after",
        runValidators: true
        })
        console.log(user)
        res.send("Data updated successfully")
    }catch(err) {
        res.status(400).send("UPDATE FAILED:" + err.message)
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
