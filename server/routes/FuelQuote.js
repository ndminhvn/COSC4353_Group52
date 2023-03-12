const express = require('express');
const router = express.Router();
const pool = require('../database/dbCreds')
const PriceModule = require('../modules/PriceModule');

// Client will send url query
// baseurl/quote/?username=eli&gallons=500
router.get("/", async (req, res) => {

    const username = req.query.username;
    const gallons = req.query.gallons;
    let state;
    let hasHistory;
    let unitCost;
    let totalCost;
    
    // Get client state
    try {
        let query = await pool.query(
            `SELECT state 
            FROM users_info 
            WHERE username = '${username}'`);
        state = query.rows[0].state;

    } catch (error) {
        console.log(error)
    }

    // Get client history
    try {
        let query = await pool.query(
            `SELECT username 
            FROM order_history
            WHERE username = '${username}' LIMIT 1`);
        hasHistory = query.rows.length != 0 ? true : false

    } catch (error) {
        console.log(error)
    }

    // Get unit price and quote price
    const quote = new PriceModule(state,hasHistory,gallons);
    unitCost = quote.getUnitCost()
    totalCost = quote.getQuote()

    // Prepare JSON for front-end
    let body = {
        "gallons" : gallons, 
        "unitCost" : unitCost,
        "totalCost" : totalCost,
        "inStateDiscount" : state == 'TX' ? true : false,
        "historyDiscount" : hasHistory}

    res.send(body);
         
});

router.post("/", (req, res) => {

    // Handle dates
    let orderDate = new Date().toISOString().slice(0, 10);
    let purchaseDate = req.body.date;

    // Save to database

});

module.exports = router;