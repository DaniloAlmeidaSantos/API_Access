const express = require("express");
const router = express.Router();
const create = require('../libs/createUser');

router.post("/access/create", (req, res) => {
    const { 
        name, lastName, password, email, age, departament        
    } = req.body;
    
    var status = create.createUserHash(name, lastName, email, password, age, departament);
    
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