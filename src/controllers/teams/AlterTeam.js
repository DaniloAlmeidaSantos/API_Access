const express = require("express");
const router = express.Router();
const alter = require("../../libs/teams/alterTeam.js");

// Route for create team
router.post("/access/team/alter/:id", (req, res) => {
    // Body (JSON)
    const { 
        teamName, image, bio, tiktok, twitter, facebook, whatsapp        
    } = req.body;

    const {id} = req.params;
    
    // Calling the class for create user
    const status = alter.alterTeam(req.session.user.userId, teamName, bio, image, tiktok, twitter, facebook, whatsapp, id);
    
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