const Note = require("../model/notes_model");

exports.createNote = (req, res) => {

    //Creating Note
    var note = new Note({
        title: req.body.title, 
        content: req.body.content
    });
    note
        .save(note)
        .then(data =>{
            res.send(data);
            res.send("Note Saved");
        })
        .catch(err =>{
            res.status(500).send({
                message: err.message || "Error occured while saving the note. Try Again Later!"
            });
        });
};

//not working
exports.getNoteById = (res, req) => {
    const id = req.query.user_id;

    Note
        .findById(id)
        .then(data => {
            if (!data)
                res.status(404).send({
                    message: "No notes attached to user."
                });
            else{
                res.send(data);
            } 
        })
        .catch(err => {
            res.status(500).send({
                    message: err.message || "Error when retrieving note from Database."
                });
        });
};

//not working
exports.deleteNote = (res, req) => {

    try{
        const note = Note.findByIdAndDelete({ _id: req.params.id});

        if(!note){
            res.status(404).send({
                message: "Error."
            });
        }
        res.send({
            message: "Note was deleted successfully."
        });
    }
    catch(err){
        res.status(500).send({
            message: err.message || "Error occured while deleting the note. Try Again Later!"
        })
    };
};