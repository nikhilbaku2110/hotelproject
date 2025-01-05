const mongoose = require("mongoose");

const personschema =  new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    age:{
        type:Number,
        // require:true
    },
    work:{
        type:String,
        enum:["chef","waiter","manager"],
        required:true
    },
    mobile:{
        type:String,
        required:true
    },
    email:{
        type:String,
        unique:true,
        required:true
    },
    address:{
        type:String,
        // required:true
    },
    salary:{
        type:Number,
        required:true
    },
});

const person = mongoose.model("person",personschema)

module.exports=person