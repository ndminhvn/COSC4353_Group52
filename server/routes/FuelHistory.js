const express = require('express');
const router = express.Router();
const pool = require('../database/dbCreds');

// Get user fuel quote history
router.get("/:username", async (req, res) => {
    try {
        const { username } = req.params;

        if(username == "null" || username == null) {
            throw new Error({ message: "Invalid URL query" });
        }

        const results = await pool.query(
            `select * from order_history where username = '${username}'`
        );
        // send history data back to client
        return res.status(201).json(results.rows);
    } catch (error) {
        return res.status(404).json({ message: error.message });
    }
});

module.exports = router;