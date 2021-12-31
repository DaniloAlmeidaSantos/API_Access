const express = require("express");
const router = express.Router();

router.post("/access/", (req, res) => {
    res.status(200);
});

router.put("/access/", (req, res) => {
    res.status(200);
});

router.delete("/access/", (req, res) => {
    res.status(200);
});

module.exports = router;