const express = require("express");
const router = express.Router();
const create = require("../../libs/users/createUser");

// Route for create user
router.post("/access/create", (req, res) => {
    // Body (JSON)
    const { 
        name, lastName, image, password, email, age, genre, city, state, country, ddd, phone       
    } = req.body;
    
    // Calling the class for create user
    const status = create.createUserHash(name, lastName, image, password, email, age, genre, city, state, country, ddd, phone);
    
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