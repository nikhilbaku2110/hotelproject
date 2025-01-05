const mongoose = require("mongoose")
require("dotenv").config()
const mongourl = process.env.MONGODB_URL

mongoose.connect(mongourl);

const db = mongoose.connection

db.on("connected",()=>{
    console.log("database connected")
})

db.on("error",()=>{
    console.log("database connection error")
})

db.on("disconnected",()=>{
    console.log("database disconnected")
});

module.exports=db