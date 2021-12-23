const express = require("express");
const router = express.Router();
const userLogin = require('../libs/loginUser');

router.put("/access/login", (req, res) => {
    const { 
        name, lastName, password, email, age, departament        
    } = req.body;

    var status = userLogin.login(email, password);
    
    var status = create.createUserHash(name, lastName, email, password, age, departament);
    
    status
    .then(value => {
        if (value === 201) {
            res.status(value).json({message: "User create success", statusCode: value});
        } else {
            res.status(value).json({message: "Not created user", statusCode: value});
        }
    })
    .catch(err => {
        res.status(500).json({message: "Error on server", statusCode: 500});
        throw new Error(err);
    });
});

module.exports = router;