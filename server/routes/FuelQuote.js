const express = require('express');
const router = express.Router();
const pool = require('../database/dbCreds')

// Helps get the price using client_id, and gallon requested
// Client will send url query
router.get("/", async (req, res) => {

    const username = req.query.username;
    const gallons = req.query.gallons;
    

    try {
        const state = (await pool.query(
            `SELECT state 
            FROM users_info 
            WHERE username = '${username}'`));
        console.log(state.rows[0].state)

    } catch (error) {
        console.log(error)
    }
         
});

router.post("/", (req, res) => {
    res.send("Purchase Successfully")
});

module.exports = router;