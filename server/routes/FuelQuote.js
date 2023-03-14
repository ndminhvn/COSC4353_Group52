const express = require('express');
const router = express.Router();
const pool = require('../database/dbCreds')
const PriceModule = require('../modules/PriceModule');

// Client will send url query
// baseurl/quote/?username=eli&gallons=500
router.get("/", async (req, res) => {

    const username = req.query.username;
    const gallons = Number(req.query.gallons);

    let hasHistory, unitCost, totalCost, fullAddress;
    let address1, city, state, zipcode;
    
    // Get client info
    try {
        let query = await pool.query(
            `SELECT address1, city, state, zipcode 
            FROM users_info 
            WHERE username = '${username}'`);
        
        address1 = query.rows[0].address1;
        city = query.rows[0].city;
        state = query.rows[0].state;
        zipcode = query.rows[0].zipcode;
        fullAddress = address1 + ", " + city + ", " + state + ", " + zipcode;

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
    unitCost = quote.getUnitCost();
    totalCost = quote.getQuote();

    // Prepare JSON for front-end
    let body = {
        "gallons" : gallons, 
        "unitCost" : unitCost,
        "totalCost" : totalCost,
        "deliveryAddress" : fullAddress,
        "inStateDiscount" : state == "TX" ? true : false,
        "historyDiscount" : hasHistory}

    res.send(body);
         
});

router.post("/", async(req, res) => {

    // Handle incomming data
    let orderDate = new Date().toISOString().slice(0, 10);
    const {username, deliveryDate, deliveryAddress, unitCost, gallons, totalCost} = req.body;

    // Save to database
    try {

        let query = await pool.query(
            `INSERT INTO order_history 
            (username, purchase_date, delivery_date, delivery_address, unit_cost, gallons_amount, total_cost)
            VALUES 
            ($1, $2, $3, $4, $5, $6, $7)`,
            [username, orderDate, deliveryDate, deliveryAddress, unitCost, gallons, totalCost]);

        console.log("Successfully save order to database")

    } catch (error) {
        console.log(error)
    }

});

module.exports = router;