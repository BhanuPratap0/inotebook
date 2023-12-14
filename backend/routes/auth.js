const express = require('express');
const User = require('../models/User');
const Image = require('../models/Profile');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const jwt_secret = 'bhanu@123123123';
const fetchuser = require('../middleware/fetchuser');


//ROUTE:1  Creat a user using POST:"api/auth/createuser". Doesn't require Auth
router.post('/createuser', [
    body('name', 'Enter a valid name'),
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password must be atleast 5 characters').isLength({ min: 5 }),
    body('avatar')

], async (req, res) => {
    let success=false;
    const error = validationResult(req);
    if (!error.isEmpty()) {
        return res.status(400).json({ success,error: error.array() });
    }

    try {
        let user = await User.findOne({ email: req.body.email });
        if (user) {
            return res.status(400).json({ success,error: "Sorry a user with this email already exists" });
        }

        //Adding Salt to the password 
        const salt = await bcrypt.genSaltSync(10);
        const secPass = await bcrypt.hashSync(req.body.password, salt);

        //Create User
        user = await User.create({
            name: req.body.name,
            password: secPass,
            email: req.body.email,
            avatar: req.body.avatar
        })
        //.then(user=>res.json(user))

        //WebToken
        const data = {
            user: {
                id: user.id
            }
        }
        const authToken = jwt.sign(data, jwt_secret);
        success=true;
        res.json({success, authToken })

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server error occurred");
    }

})

//ROUTE:2 LogIn For user using  POST:"api/auth/;login"
router.post('/login', [
    body('email', 'Enter a valid email'),
    body('password', 'Password cannot be blank').exists(),

], async (req, res) => {
    let success=false;
    const error = validationResult(req);
    if (!error.isEmpty()) {
        return res.status(400).json({ error: error.array() });
    }

    const { email, password } = req.body;
    try {
        let user = await User.findOne({ email });
        if (!user) {
            success=false;
            return res.status(400).json({ success,error: "Please log in with correct credential" })
        }

        const checkPassword = await bcrypt.compare(password, user.password);
        if (!checkPassword) {
            success=false;
            return res.status(400).json({ success,error: "Please log in with correct credential" })
        }

        const payload = {
            user: {
                id: user.id
            }
        }

        const authToken = jwt.sign(payload, jwt_secret)
        success=true;
        res.json({success,authToken})
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server error occurred");
    }

})

//ROUTE:3 for getting user data by login credential
router.post('/getuser', fetchuser, async (req, res) => {
    try {
        userId = req.user.id;
        const user = await User.findById(userId).select("-password");
        res.send(user)
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})

module.exports = router