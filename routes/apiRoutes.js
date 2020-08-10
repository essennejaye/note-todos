const router = require('express').Router();
const {findById, createNote, deleteNote} = require('../public/assets/js/notes')
const db = require('../db/db.json');

router.get('/db', (req, res) => {
    res.json(db);
})
router.get('/db/:id', (req, res) => {
    const note = findById(req.params.id, db)
    res.json(note);
})
router.post('/db', (req, res) => {
    // req.body.id = uuidv4();
    const note = createNote(req.body, db);
    res.json(note);
})
router.delete('/db/:id', (req, res) => {
    // const note = findById(req.params.id, db)
    deleteNote(note, db)
    res.send('Note deleted')
})

module.exports = router;