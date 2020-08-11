const fs = require('fs');
const path = require('path');
const { v4: uuidv4, validate } = require('uuid');

// finding a specific note by id
function findById(id, db) {
    var note;
    // if note is uuid check for '-', otherwise parse id to integer
    if (id.includes('-')) {
        note = db.filter(note => note.id === id)[0];
    } else {
        note = db.filter(note => note.id === parseInt(id))[0];
    }
    return note;
};
// create a new note assign uuid as unique id
function createNote(body, db) {
    body.id = uuidv4();
    db.push(body);
    writeFile(db);
    return body;
};    
// delete specific note by position in array after finding
function deleteNote(note, db) {
    let noteIndex = db.indexOf(note);
    db.splice(noteIndex, 1);
    writeFile(db);
};
function validateNote(note) {
    if (!note.title || typeof note.title !== "string") {
        return false;
    }
    if (!note.text) {
        return false;
    }
    return true;
};
// write new note to file or rewrite file if record deleted
function writeFile(db) {
    try {
        fs.writeFileSync(
            path.join(__dirname, '../../../db/db.json'),
            JSON.stringify(db)
        );
        return db;
    }
    catch (err) {
        console.log('File not written');
    }
}
module.exports = { findById, createNote, deleteNote, validateNote };