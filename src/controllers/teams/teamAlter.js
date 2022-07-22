const express = require("express");
const router = express.Router();
const alter = require("../../libs/teams/alterTeam.js");

// Route for create team
router.put("/access/team/alter", async (req, res) => {
    // Body (JSON)
    const { 
        team_name, team_logo, team_banner, team_CNPJ
    } = req.body;

    // Calling the class for create user
    const teamResult = await alter.alterTeam(req.session.user.userId, team_name, team_logo, team_banner, team_CNPJ);

    res.status(teamResult[0].status).json({message: teamResult[0].message, statusCode: teamResult[0].status });
});

module.exports = router;