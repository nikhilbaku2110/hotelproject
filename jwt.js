const jwt = require("jsonwebtoken")

const jwtauthmiddleware = (req,res,next)=>{

    //first chek the request headers has authorization or not

    const authorization = req.headers.authorization
    if(!authorization) return res.status(401).json({error:"invalid token"})

    //extract the jwt token from the request header
    const token = req.headers.authorization.split(" ")[1];
    if(!token) return res.status(401).json({error:"unauthorization"})

    try {
        //verify the jwt token
        const decoded = jwt.verify(token,process.env.JWT_SECRET)
        //attach user information to the request object
        req.user = decoded  
        next()
    } catch (err) {
        console.log(err);
        res.status(401).json({error:"invalid token"})
    }
}

//function to generate jwt token
const generatetoken = (userdata)=>{
     //generate a new jwt token using user data
     return jwt.sign(userdata,process.env.JWT_SECRET,{expiresIn:3000})
}

module.exports={jwtauthmiddleware,generatetoken}