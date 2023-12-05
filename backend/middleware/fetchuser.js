const jwt = require('jsonwebtoken');
const jwt_secret='bhanu@123123123';


const fetchuser=(req,res,next)=>{
    //Get the user from the jwt token and ad id to req object
    const token=req.header('auth-token');
    if(!token){
        return res.status(401).send({error: "Please authenticate witha a valid token"})
    }
    try {
        const data=jwt.verify(token,jwt_secret);
        req.user=data.user;
        next();
    } catch (error)  {
        res.status(401).send({error: "Please authenticate witha a valid token"})
    }

}
module.exports=fetchuser;