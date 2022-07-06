const Note = require("../model/notes_model");

exports.createNote = (req, res) => {

    //Creating Note
    try{
        const {title, content, date} = req.body;
        var note = new Note({
            title, 
            content, 
            date, 
            user_id: req.user.id
        });
        res.send({
            message: "User Id" + user_id + "."
        })
    }
    catch(err){
        res.status(500).send({
            message: err.message || "Error occured while saving the note. Try Again Later!"
        });
    }
};

exports.getNote = (res, req) => {

    try{
        req.user.populate("notes");

        res.send(req.user.notes);
    }
    catch(err) {
        res.status(500).send({
            message: err.message || "Error occured while retrieving the note. Try Again Later!"
        });
    }
};

exports.getNoteById = (res, req) => {

    try{
        const note = Note.findById({_id: req.params.id});
        if(!note){
            res.status(404).send({
                message: "Error."
            });
        }
        res.send(note);
    }
    catch(err){
        res.status(500).send({
            message: err.message || "Error occured while retrieving the note. Try Again Later!"
        });
    }
};

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