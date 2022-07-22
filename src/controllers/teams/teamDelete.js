const express = require("express");
const router = express.Router();
const del = require("../../libs/teams/deleteTeam.js");

// Route for create team
router.put("/access/team/delete", async (req, res) => {
    // Calling the class for create user
    const teamResult = await del.deleteTeam(req.session.user.userId);

    res.status(teamResult[0].status).json({message: teamResult[0].message, statusCode: teamResult[0].status });
});

module.exports = router;