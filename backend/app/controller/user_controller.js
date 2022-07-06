const User = require("../model/user_model");


exports.createUser = (req, res) => {

    //Creating User
    var user = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password,
        accountType: req.body.accountType,
        loginattempts: 0,
    });

    user
        .save(user)

        .then(data =>{
            res.send({
                message: "Successfully added to Database."
            });
        })

        .catch(err => {
                if (user.password.length < 8){
                    res.status(500).send({
                        message: " Password needs to be more than 8 characters."
                    });
                }
                else if (err.keyPattern.email == 1){
                    res.status(500).send({
                        message: "Email Address is already in use. Try a different Email Address."
                    });
                }
                else{
                    res.status(500).send({
                        message: "Error ocurred while creating user. Try Again Later!"
                    });
                }
            });
}

exports.adminLogin = (req,res) => {
    const email = req.body.email;
    const password = req.body.password;
    const accountType = req.body.accountType;

    var condition = {
        email: email,
        password: password,
        accountType: accountType,
    };
    User.find(condition)
        .then(data => {
            if (accountType == "Admin"){
                if (data.length == 0){
                    res.status(404).send({
                        message: "User not found in Database."
                    });
                }
                else{
                    // res.send({
                    //     message: "Admin: Successfully logged in."
                    // })
                    res.send(data);
                }  
            }
            else{
                res.send({
                    message: "User not found."
                });
            }
            
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Error ocurred while logging in. Try Again Later!"
            });
        });
};

exports.studentLogin = (req,res) => {
    const email = req.body.email;
    const password = req.body.password;
    const accountType = req.body.accountType;

    var condition = {
        email: email,
        password: password,
        accountType: accountType,
    };
    User.find(condition)
        .then(data => {
            if (accountType == "Student"){
                if (data.length == 0){
                    res.status(404).send({
                        message: "User not found in Database."
                    });
                }
                else{
                    // res.send({
                    //     message: "Student: Successfully logged in."
                    // })
                    res.send(data);
                }  
            }
            else{
                res.send({
                    message: "User not found."
                });
            }
            
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Error ocurred while logging in. Try Again Later!"
            });
        });
};

exports.updateAttempts = (req, res) => {
    const id = req.query.id;

    User.findByIdAndUpdate(id, req.body, {
        useFindAndModify: false
    })

    .then(data => {
        if (!data) {
            res.status(404).send({
                message: "Incorrect User Details."
            });
        } else res.send({
            message: "User Details Updated."
        });
    })
    .catch(err => {
        res.status(500).send({
            message: "Error updating User with id=" + id + ". Try Again Later!"
        });
    });
};

exports.editUser = (req, res) => {
    const id = req.query.id;

    User.findByIdAndUpdate(id, req.body, {
        useFindAndModify: false
    })

    .then(data => {
        if (!data) {
            res.status(404).send({
                message: "Incorrect User Details."
            });
        } else res.send({
            message: "User Details Updated."
        });
    })
    .catch(err => {
        res.status(500).send({
            message: "Error updating User with id=" + id + ". Try Again Later!"
        });
    });
};

exports.deleteUser = (req, res) => {
    const id = req.query.id;

    User.findByIdAndRemove(id)
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: "Incorrect User Details."
                });
            } else {
                res.send({
                    message: "Notify Account Deleted."
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete User with id=" + id + ". Try Again Later!"
            });
        });
};

//not working
exports.logout = (req,res) => {
    User
        .save(req.user)

        .then(date =>{
            res.send({
                message: "Successully Logged Out."
            })
        })
        
        .catch(err =>{
            res.status(500).send("An Error has occurred while logging out.")
        });
};