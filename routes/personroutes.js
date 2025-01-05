const express = require("express")
const router = express.Router()
const person = require("./../models/person")
const { route } = require("./personroutes")

//person post method 
router.post('/', async (req, res)=> {
    try {
     const data = req.body
     const newperson = new person(data);
     const response = await newperson.save()
     console.log("data saved");
     res.status(200).json(response)
    } catch (err) {
     console.log(err);
     res.status(500).json({err:"internal server error"})
    }
 })
 
 //person get method 
 router.get('/', async (req, res) => {
   try {
     const data =await  person.find();
     console.log("data fetched");
     res.status(200).json(data)
   } catch (err) {
     console.log(err);
     res.status(500).json({err:"internal server error"})
   }
 })
 
 //person worktype get method 
 router.get('/:worktype', async (req, res) => {
     try {
       const worktype = req.params.worktype
       if(worktype == "chef" || worktype == "manager" || worktype == "waiter" ){
       const response = await person.find({work:worktype})
       console.log("response fetched");
       res.status(200).json(response)
       }else{
         res.status(404).json({error:"invalid worktype"})
       }
     } catch (err) {
       console.log(err);
       res.status(500).json({err:"internal server error"})
     }
   })

//put method 
router.put("/:id",async (req,res)=>{
  try {
    const personid = req.params.id
    const updatedpersondata = req.body
    const response = await person.findByIdAndUpdate(personid,updatedpersondata,{
        new:true,
        runValidators:true,
    })
    if (!response) {
        return res.status(404).json({error:"person not found"})
    }
    console.log("data updated");
    res.status(200).json(response)
  } catch (err) {
    console.log(err);
    res.status(500).json({err:"internal server error"})
  }
})

//delete method
router.delete("/:id",async (req,res)=>{
    try {
        const personid = req.params.id
        const response = await person.findByIdAndDelete(personid)
        if (!response) {
            res.status(404).json({error:"invalid person"})
        }
    console.log("data deleted");
    res.status(200).json({msg:"person deleted successfully"})
    } catch (err) {
        console.log(err);
        res.status(500).json({err:"internal server error"})
    }
})
 
 module.exports=router
 