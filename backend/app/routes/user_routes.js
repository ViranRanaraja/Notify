module.exports = app => {
    const users = require("../controller/user_controller");
    var router = require("express").Router();

    router.post("/adminCreate", users.createUser);
    router.post("/adminLogin", users.adminLogin);
    router.post("/studentLogin", users.studentLogin);
    router.put("/editUser", users.editUser);
    router.put("/updateAttempts", users.updateAttempts);
    router.delete("/deleteUser", users.deleteUser);
    router.post("/logout", users.logout);

    app.use("/user", router);
};