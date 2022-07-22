const express = require("express");
const router = express.Router();
const create = require("../../libs/users/createUser");

// Route for create user
router.post("/access/create", (req, res) => {
    // Body (JSON)
    const { 
        usuname, usulogo, usunickname, usudob, usuemail, usupassword
    } = req.body;
    
    // Calling the class for create user
    const status = create.createUserHash(usuname, usulogo, usunickname, usudob, usuemail, usupassword);
    // Validation a return for the methods
    status
    .then(value => {
        res.status(value[0]).json({message: value[1], statusCode: value[0]});
    })
    .catch(err => {
        res.status(500).json({message: "Error on server", statusCode: 500});
        throw new Error(err);
    });
});

module.exports = router;