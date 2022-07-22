const express = require("express");
const router = express.Router();
const del = require("../../libs/championship/deleteChampionship");

router.delete("/championship/delete/:id", async (req, res) => {
    const { id } = req.params;

    const championshipResult = await del.deleteChampionship(id);
    console.log(championshipResult);

    res.status(championshipResult[0].status).json({message: championshipResult[0].message, statusCode: championshipResult[0].status });
});

module.exports = router;