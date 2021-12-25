const express = require("express");
const router = express.Router();
const db = require('../../config/db');

router.get("/access/:id", (req, res) => {
    const { id } = req.params;
    
    db.where('id', id).select().table('users')
        .then(data => {
            if (data > 0) {
                res.status(200).json(
                    {
                        userData: {
                            name: data[0].name,
                            lastName: data[0].lastName,
                            email: data[0].email,
                            departament: data[0].departament,
                            age: data[0].age
                        },
                        auth: true,
                        tokenValid: req.token,
                        error: null
                    }
                )
            }
        })
        .catch(err => {
            res.status(200).json(
                {
                    userData: {},
                    auth: true,
                    tokenValid: req.token,
                    error: err
                }
            )
        });
});

module.exports = router;