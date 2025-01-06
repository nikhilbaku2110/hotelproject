const mongoose = require("mongoose");
const bcrypt = require("bcrypt")
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
    username:{
        required:true,
        type:String
    },
    password:{
        required:true,
        type:String
    },
});

personschema.pre("save", async function(next){
    const person = this;
    //  hash the password only if it has been modified (or is new)
    if(!person.isModified("password")) return next()
    try {
        // hash pasword generation
        const salt = await bcrypt.genSalt(10)
        //hash password
        const hashedpassword = await bcrypt.hash(person.password,salt)
        //override is the plain password with the hashed one
        person.password=hashedpassword
        next()
    } catch (err) {
        return next(err)
    }
})

personschema.methods.comparePassword = async function (candidatePassword) {
    try {
         //use bcrypt to compare the provided password with the hashe password
         const ismatch = await bcrypt.compare(candidatePassword,this.password)
         return ismatch;
    } catch (err) {
        throw err
    }
}

const person = mongoose.model("person",personschema)

module.exports=person