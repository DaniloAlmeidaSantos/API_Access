const express = require("express");
const router = express.Router();
const create = require("../../libs/teams/createTeam.js");

// Route for create team
router.post("/access/team/create", async (req, res) => {
    // Body (JSON)
    const { 
        team_name, team_logo, team_banner, team_CNPJ
    } = req.body;

    // Calling the class for create user
    const teamResult = await create.createTeam(req.session.user.userId, team_name, team_logo, team_banner, team_CNPJ);

    res.status(teamResult[0].status).json({message: teamResult[0].message, statusCode: teamResult[0].status });
});

module.exports = router;