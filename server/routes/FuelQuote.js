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

// Helps get the price using client_id, and gallon requested
router.get("/", (req, res) => {
    res.send("Purchase Successfully")
});

router.post("/", (req, res) => {
    res.send("Purchase Successfully")

    pool.query('SELECT * FROM users', (err,res) => {
        if(!err){
            console.log(res.rows);
        } else {
            console.log(err.message)
        }
    });

});

module.exports = router;