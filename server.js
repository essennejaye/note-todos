const db = require('./db/db.json');
const express = require('express');
const htmlRoutes = require('./routes/htmlRoutes');

const PORT = process.env.PORT || 3001;
const app = express();


app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/', htmlRoutes);
app.use(express.static('public'));

app.get('/api/db', (req, res) => {
    let notes = db;
    if (req.query) {
        results = filterByQuery(req.query, results);
      }
    res.json(notes);
})

app.get('/api/db/notes', (req, res) => {
    return res.json(db.notes);
})

app.get('/api/db/notes/:id', (req, res) => {
    let filteredNotes = db.notes.filter(n => n.id === parseInt(req.params.id));
    res.json(filteredNotes[0]);
})

app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
})
