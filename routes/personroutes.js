const express = require("express")
const router = express.Router()
const person = require("./../models/person")
// const { route } = require("./personroutes")
const {jwtauthmiddleware,generatetoken} = require("./../jwt")

//person post method 
router.post('/signup', async (req, res)=> {
    try {
     const data = req.body
     const newperson = new person(data);
     const response = await newperson.save()
     console.log("data saved");

     const payload = {
      id:response.id,
      username:req.username
     }
     console.log(JSON.stringify(payload));
     const token = generatetoken(payload)
     console.log("token is :",token);

     res.status(200).json({response:response,token:token})
    } catch (err) {
     console.log(err);
     res.status(500).json({err:"internal server error"})
    }
 })

//login route 
 router.post('/login', async (req, res)=> {
     try {
      //extract username and password from the request body
      const {username,password} = req.body
      //find the user by username 
      const user = await person.findOne({username:username})
      //if user does not exists or password does not match , return error
      if(!user || !(await user.comparePassword(password))){
        return res.status(401).json({error:"invalid username or password"})
      }
      //generate  tokens 
      const payload = {
          id:user.id,
          username:user.username
      }
      const token = generatetoken(payload)
      res.json({token})
    }catch(err){
      console.log(err);
      res.status(500).json({error:"internal server error"})
    }
 })

//profile route
router.get('/profile',jwtauthmiddleware ,async (req, res) => {
  try {
    const userdata = req.user;
    console.log("user data",userdata);

    const userid = userdata.id;
    const user = await person.findById(userid)

    res.status(200).json({user})
  } catch (err) {
    console.log(err);
    res.status(500).json({error:"internal server error"})
  }
})


 
 //person get method 
 router.get('/', jwtauthmiddleware,async (req, res) => {
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
 