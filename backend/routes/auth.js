const express= require('express');
const User = require('../models/User');
const router=express.Router();
const {body,validationResult}= require('express-validator');

// Creat a user usin POST:"api/auth". Doesn't require Auth
router.post('/', [
    body('name','Enter a valid name').isLength({min:5}),
    body('email','Enter a valid email').isEmail(),
    body('password','Password must be atleast 5 characters').isLength({min:5}),

] ,(req,res)=>{
   const error=validationResult(req);
   if(!error.isEmpty()){
    return res.status(400).json({error: error.array()});
   }
   User.create({
    name: req.body.name,
    password: req.body.password,
    email: req.body.email,
   }).then(user=>res.json(user))

})

module.exports=router