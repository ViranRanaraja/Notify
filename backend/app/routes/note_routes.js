module.exports = app => {
    const notes = require("../controller/note_controller");
    var router = require("express").Router();

    router.post("/createNote", notes.createNote);
    router.get("/getNote", notes.getNote);
    router.get("/getNoteById", notes.getNoteById);
    router.delete("/deleteNote", notes.deleteNote);

    app.use("/notes", router);
};