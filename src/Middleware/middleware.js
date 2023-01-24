const  jwt  = require("jsonwebtoken")
const validator = require("validator");




const verifyToken = async (req,res,next)=>{

    let token = req.headers["token"]

    if(!token) return res.status(400).send({status:false,msg:"Token is mandatory"})

    if(!validator.isJWT(token)) return res.status(400).send({status:false,msg:"Token is invalid"})

    if(token){

    jwt.verify(token, "group2project-4",(err,tokenDetails)=>{
        if(err) return res.status(403).send({status:false,msg:"Token is Invalid or expire"})
        req.tokenDetails = tokenDetails
        next()
    })
    }else{
        return res.status(401).send({status:false,msg:"you are not authenticated"})
    }
   
}



const verifyTokenAndAuthorization = (req,res,next)=>{
    verifyToken(req,res,()=>{
        if(req.tokenDetails.userId === req.params.id){
            next()
        }else{
            res.status(403).send({msg:"you are not authorized to perform this task"})
        }
    })
}






module.exports = {verifyToken,verifyTokenAndAuthorization}