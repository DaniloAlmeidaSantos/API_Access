const express = require("express");
const router = express.Router();
const create = require("../../libs/championship/createChampionship");

router.post("/championship/create", async (req, res) => {
    const { 
        championship_name, 
        championship_start_date, 
        championship_final_date,
        championship_award, 
        championship_type
    } = req.body;

    const championshipResult = await create.createChampionship(
        championship_name, 
        championship_start_date, 
        championship_final_date,
        championship_award, 
        championship_type
    )

    res.status(championshipResult[0].status).json({message: championshipResult[0].message, statusCode: championshipResult[0].status });
});

module.exports = router;