module.exports = app => {
    const notes = require("../controller/note_controller");
    var router = require("express").Router();

    router.post("/createNote", notes.createNote);
    router.get("/getNote", notes.getNote);




    app.use("/notes", router);
};