const express=require('express')
const router=express.Router();
var fetchuser = require('../middleWare/fetchuser');
const Notes = require('../models/Notes');
const { body, validationResult } = require('express-validator');

router.get('/fetchallnotes',fetchuser,async (req,res)=>{
   try {
      const notes = await Notes.find({user: req.user.id});
      res.json(notes);
      
   } catch (error) {
      console.error(error.message);
    res.status(500).send("Internal Server Error");
   }
})

router.post('/addnotes',fetchuser, [
   body('title', 'Enter a title').isLength({ min: 3 }),
   body('description', 'Write the Description').isLength({ min: 5 }),
 ], async (req, res) => {

   try {
      const {title , description , tag} = req.body;
      // If there are errors, return Bad request and the errors
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const note = new Notes({
          title, description,tag, user:req.user.id
      })
      const savednotes = await note.save();
      res.json(savednotes);
      
   } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
   }
 })

 router.put('/updatenote/:id', fetchuser, async (req, res) => {
   const { title, description, tag } = req.body;
   try {
       // Create a newNote object
       const newNote = {};
       if (title) { newNote.title = title };
       if (description) { newNote.description = description };
       if (tag) { newNote.tag = tag };

       // Find the note to be updated and update it
       let note = await Notes.findById(req.params.id);
       if (!note) { return res.status(404).send("Not Found") }

       if (note.user.toString() !== req.user.id) {
           return res.status(401).send("Not Allowed");
       }
       note = await Notes.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true })
       res.json({ note });
   } catch (error) {
       console.error(error.message);
       res.status(500).send("Internal Server Error");
   }
})
 router.delete('/deletenote/:id', fetchuser, async (req, res) => {
   const { title, description, tag } = req.body;
   try {
      

       // Find the note to be updated and delete it
       let note = await Notes.findById(req.params.id);
       if (!note) { return res.status(404).send("Not Found") }

       if (note.user.toString() !== req.user.id) {
           return res.status(401).send("Not Allowed");
       }
       note = await Notes.findByIdAndDelete(req.params.id);
       res.json({ "Success":"Note has been deleted", note:note });
   } catch (error) {
       console.error(error.message);
       res.status(500).send("Internal Server Error");
   }
})



module.exports =router;