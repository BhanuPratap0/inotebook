const express = require('express');
const router = express.Router();
const fetchuser = require('../middleware/fetchuser');
const { body, validationResult } = require('express-validator');
const Note = require('../models/Note');

//ROUTE:1 get all the notes using GET
router.get('/fetchallnotes', fetchuser, async (req, res) => {

    try {
        const notes = await Note.find({ user: req.user.id })
        res.json(notes)
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal server error");
    }

})

//ROUTE:2 Add notes using POST
router.post('/addnote',fetchuser,[
    body('title', 'Enter a valid title').isLength({ min: 5 }),
    body('description', 'Description must be atleast 5 characters').isLength({ min: 5 }),], async (req, res) => {
        try {
        
        const { title, description, tag } = req.body;

        //If there are errors, return Bad request and the errors;
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).send({ error: "Internal  Error" })
        }
        const note = new Note({
            title, description, tag, user: req.user.id
        })
        const savedNote = await note.save();
        res.json(savedNote);
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal server error");
    }

})

module.exports = router;