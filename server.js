const express = require('express')
const app = express()
const db = require("./db")
const menuitem = require("./models/menuitem")
const passport = require("./auth")
const bodyparser = require("body-parser")
require("dotenv").config()

app.use(express.json())
const PORT = process.env.PORT

//middleware function 
const logrequest = (req,res,next)=>{
  console.log(`[${new Date().toLocaleString()}] request made to : ${req.originalUrl} `);
  next(); //move on to the next phase
}
app.use(logrequest)

//passport authenction use
app.use(passport.initialize());
const localauthmiddleware = passport.authenticate('local', { session: false })

app.get('/' ,(req, res) => {
  res.send('welcome to the our hotel')
});

//export router file
const personroutes = require("./routes/personroutes")
const menuitemroutes = require("./routes/menuitemroutes")
//use
app.use("/person",localauthmiddleware,personroutes)
app.use("/menu",menuitemroutes)



app.listen(PORT,() => console.log(`Example app listening on port 3000`))