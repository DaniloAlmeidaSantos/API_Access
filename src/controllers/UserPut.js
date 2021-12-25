const express = require("express");
const router = express.Router();

const update = require('../libs/alterUser');

router.put("/access/alter/:id", (req, res) => {
    const { 
        name, lastName, password, email, age, departament       
    } = req.body;

    const { id } = req.params;
        
    const status = update.alterUserHash(name, lastName, email, password, age, departament, id);

    status
    .then(value => {
        res.status(value[0]).json({message: value[1], statusCode: value[0]});
    })
    .catch(err => {
        res.status(500).json({message: "Error on server: " + err, statusCode: 500});
    });
});

module.exports = router;