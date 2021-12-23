const express = require("express");
const router = express.Router();
const userLogin = require('../libs/loginUser');
const jwt = require('jsonwebtoken');

router.post("/access/login", (req, res) => {
    const { 
        email, password        
    } = req.body;

    var status = userLogin.login(email, password);
    
    status
    .then(value => {
        const userId = value[1];

        if (value[0] === 200) {
            const token = jwt.sign({ userId }, process.env.SECRET, {
                expiresIn: 300 // expires in 5min
            });

            res.status(value[0]).json({message: "User login", statusCode: value[0], data: { userId: userId, email: email, token: token, auth: true }});
        } else if (value[0] === 401) {
            res.status(value[0]).json({message: "Password incorrect.", statusCode: value[0], data: { userId: null, email: email, token: null, auth: false }});
        } else {
            res.status(value[0]).json({message: "User not found.", statusCode: value[0], data: { userId: null, email: email, token: null, auth: false }});
        }
    })
    .catch(err => {
        res.status(500).json({message: "Error on server", statusCode: 500, data: {userId: null, email: email, token: null, auth: false}});
        throw new Error(err);
    });
});

module.exports = router;