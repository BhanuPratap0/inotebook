const express= require('express');
const User = require('../models/User');
const router=express.Router();
const {body,validationResult}= require('express-validator');

// Creat a user usin POST:"api/auth/createuser". Doesn't require Auth
router.post('/createuser', [
    body('name','Enter a valid name').isLength({min:5}),
    body('email','Enter a valid email').isEmail(),
    body('password','Password must be atleast 5 characters').isLength({min:5}),

] ,async(req,res)=>{
    
   const error=validationResult(req);
   if(!error.isEmpty()){
    return res.status(400).json({error: error.array()});
   }

   try {
   let user= await User.findOne({email:req.body.email});
   if(user){
    return res.status(400).json({error: "Sorry a user with this email already exists"});
   }
   user=await User.create({
    name: req.body.name,
    password: req.body.password,
    email: req.body.email,
   })
   //.then(user=>res.json(user))
   res.json(user)
} catch (error) {
    console.error(error.message);
    res.status(500).send("Some error occurred");
}

})

module.exports=router