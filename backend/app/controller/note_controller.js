const Note = require("../model/notes_model");

exports.createNote = (req, res) => {

    //Creating Note
    var note = new Note({
        ...req.body,
        owner: req.user._id,
    });

    note
        .save(note)

        .then(data =>{
            res.send({
                message: "Note saved Successfully."
            });
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Error occured while saving the note. Try Again Later!"
            });
        });
};

exports.getNote = (res, req) => {

    try{
        req.user.populate("notes");

        res.send(req.user.notes);
    }
    catch(err) {
        res.status(500).send({
            message: err.message || "Error occured while retrieving the note. Try Again Later!"
        })
    }
};

exports.getNoteById = (res, req) => {

    
};