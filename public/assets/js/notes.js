const fs = require('fs');
const path = require('path');
const { v4: uuidv4, validate } = require('uuid');

function findById(id, db) {
    var note;
    if (id.includes('-')) {
        note = db.filter(note => note.id === id)[0];
    } else {
        note = db.filter(note => note.id === parseInt(id))[0];
    }
    return note;
}
function createNote(body, db) {
    req.body.id = uuidv4();
    // const note = body;
    db.push(body);
    writeFile(db);
    return body;
}
function deleteNote(note, db) {
    const note = findById(req.params.id, db)
    let noteIndex = db.indexOf(note)
    db.splice(noteIndex, 1);
    writeFile(db);
}
function writeFile(db) {
    fs.writeFileSync(
        path.join(__dirname, './db/db.json'),
        JSON.stringify(db)
    );
}
module.exports = {findById, createNote, deleteNote};