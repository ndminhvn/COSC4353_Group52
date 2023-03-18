const express = require('express');
const router = express.Router();
const pool = require('../database/dbCreds');

// Get user fuel quote history
router.get("/:username", async (req, res) => {
    const { username } = req.params;
    try {
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