const express = require("express");
const router = express.Router();
const create = require("../../libs/teams/createTeam.js");

// Route for create team
router.post("/access/team/create", (req, res) => {
    // Body (JSON)
    const { 
        teamName, image, bio        
    } = req.body;

    // Calling the class for create user
    const status = create.createTeam(req.session.user.userId, teamName, bio, image);
    
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