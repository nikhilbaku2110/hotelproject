const mongoose = require("mongoose")

const mongourl = "mongodb://localhost:27017/hotels"

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