const express = require('express');
const router = express.Router();
const fetchuser = require('../middleware/fetchuser');
const { body, validationResult } = require('express-validator');
const Note = require('../models/Note');

//ROUTE:1 get all the notes using GET ; GET "/api/notes.fetchallnotes". Login Req
router.get('/fetchallnotes', fetchuser, async (req, res) => {

    try {
        const notes = await Note.find({ user: req.user.id })
        res.json(notes)
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal server error");
    }

})

//ROUTE:2 Add notes using POST: POST "/api/notes/addnote". Login Req
router.post('/addnote', fetchuser, [
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


//ROUTE:3 Udate note using PUT using: PUT "/api/notes/updatenote/:id". Login Required
router.put('/updatenote/:id', fetchuser, async (req, res) => {

    try {
        const { title, description, tag } = req.body;
        //Create a new object
        const newNote = {};
        if (title) { newNote.title = title };
        if (description) { newNote.description = description };
        if (tag) { newNote.tag = tag };

        //Find the note to be updated and update it
        let note = await Note.findById(req.params.id);
        if (!note) { return res.status(400).send("Not found") }
        if (note.user.toString() !== req.user.id) {
            return res.status(400).send("Not found")
        }

        note = await Note.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true });
        res.json({ note });
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal server error");
    }


})


//ROUTE:4 Delete note using DELETE using: DELETE "/api/notes/deletenote/:id". Login Required
router.delete('/deletenote/:id', fetchuser, async (req, res) => {

    try {
        const { title, description, tag } = req.body;

        //Find the note to be deleted and delete it
        let note = await Note.findById(req.params.id);
        if (!note) { return res.status(400).send("Not found") }

        //ALlow deletion only if user own this note
        if (note.user.toString() !== req.user.id) {
            return res.status(400).send("Not found")
        }

        note = await Note.findByIdAndDelete(req.params.id)
        res.json({ "Success": "note has been deleted", note: note });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server error occurred");
    }


})

module.exports = router;