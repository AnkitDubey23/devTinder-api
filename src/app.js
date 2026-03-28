const express  =  require("express")

const app = express()

app.use( "/music", (req, res) => {
   res.send("Hello from the music servers")
})

app.use( "/", (req, res) => {
    res.send("Namaste from the home server")
 })

 app.use( "/hello", (req, res) => {
    res.send("Namaste from the home server")
 })

app.listen(3000, () => {
    console.log("Server started successfully");
    
})