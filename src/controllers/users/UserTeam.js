const express = require("express");
const router = express.Router();

// Foward implemetation in next release
router.post("/access/", (req, res) => {
    res.status(200);
});

module.exports = router;