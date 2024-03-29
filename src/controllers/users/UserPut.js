const express = require("express");
const router = express.Router();

const update = require("../../libs/users/alterUser");
const forgotPassword = require("../../libs/users/forgotPassword");

router.put("/access/alter/:id", (req, res) => {
    const { 
        name, lastName, bio, image, password, email, age, genre, city, state, country, ddd, phone, cover   
    } = req.body;

    const {id} = req.params;
    
    const status = update.alterUserHash(name, lastName, image, password, email, age, genre, city, state, country, ddd, phone, bio, cover, id);

    status
    .then(value => {
        res.status(value[0]).json({message: value[1], statusCode: value[0]});
    })
    .catch(err => {
        res.status(500).json({message: "Error on server: " + err, statusCode: 500});
    });
});

router.get("/access/forgotPassword/:email", (req, res) => {
    const {email} = req.params;
    
    const status = forgotPassword.ForgotPassword(email);
    
    status
    .then(value => {
        res.status(value[0]).json({message: value[1], statusCode: value[0]});
    })
    .catch(err => {
        res.status(500).json({message: "Error on server: " + err, statusCode: 500});
    });
});

router.put("/access/recover/:id", (req, res) => {
    const {password, code} = req.body;
    const {id} = req.params;

    const status = forgotPassword.AlterPassword(password, code, id);
    
    status
    .then(value => {
        res.status(value[0]).json({message: value[1], statusCode: value[0]});
    })
    .catch(err => {
        res.status(500).json({message: "Error on server: " + err, statusCode: 500});
    });
});

module.exports = router;