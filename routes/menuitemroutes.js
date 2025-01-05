const express = require("express")
const router = express.Router()
const menuitem = require("./../models/menuitem")


//menu post method
router.post('/', async (req, res)=>{
    try {
      const data =  req.body
      const newmenu = new menuitem(data)
      const response = await newmenu.save()
      console.log("data saved");
      res.status(200).json(response)
    } catch (err) {
      console.log(err);
      res.status(500).json({err:"internal server error"})
    }
  })

//menu get method
router.get('/', async (req, res) => {
    try {
      const data =await  menuitem.find();
      console.log("data fetched");
      res.status(200).json(data)
    } catch (err) {
      console.log(err);
      res.status(500).json({err:"internal server error"})
    }
  })

//menu tastetype get method
router.get('/:tastetype', async (req, res) => {
  try {
    const tastetype = req.params.tastetype
    if (tastetype == "sour" ||tastetype == "sweet" ||tastetype == "spicy") {
        const response = await menuitem.find({taste:tastetype})
        console.log("response fetched");
        res.status(200).json(response)
    } else {
        res.status(404).json({error:"invalid tastetype"})
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({err:"internal server error"})
  }
})


//put method 
router.put("/:id",async (req,res)=>{
  try {
    const menuitemid = req.params.id
    const updatedmenuitemdata = req.body
    const response = await menuitem.findByIdAndUpdate(menuitemid,updatedmenuitemdata,{
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
      const menuid = req.params.id
      const response = await menuitem.findByIdAndDelete(menuid)
      if (!response) {
          res.status(404).json({error:"invalid person"})
      }
  console.log("data deleted");
  res.status(200).json({msg:"menuitem deleted successfully"})
  } catch (err) {
      console.log(err);
      res.status(500).json({err:"internal server error"})
  }
})

//comment adees for testing purpose
module.exports=router

