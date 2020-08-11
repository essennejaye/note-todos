const router = require('express').Router();
const { findById, createNote, deleteNote, validateNote } = require('../public/assets/js/notes')
const db = require('../db/db.json');

// retreives all notes in db
router.get('/db', (req, res) => {
    res.json(db);
});
// retreives specific note when searching by id
router.get('/db/:id', (req, res) => {
    const note = findById(req.params.id, db);
    if (note) {
        res.json(note);
    } else {
        res.status(404).send("Note not found!");
    }
});
// creates new note and writes to db
router.post('/db', (req, res) => {
    if (!validateNote(req.body)) {
        res.status(400).send('The note is not properly formatted.');
    } else {
        const note = createNote(req.body, db);
        res.json(note);
    }
});
// deletes specifc note by id
router.delete('/db/:id', (req, res) => {
    const note = findById(req.params.id, db)
    if (note) {
        deleteNote(note, db);
        res.json(db);
    } else {
        res.status(404).send("Note not found!");
    }
});

module.exports = router;