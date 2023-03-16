const express = require('express');
const router = express.Router();
const pool = require('../database/dbCreds')
const PriceModule = require('../modules/PriceModule');

// Client will send url query
// baseurl/quote/?username=eli&gallons=500
router.get("/", async (req, res) => {

    try {

        let username, gallons;
        let hasHistory, unitCost, totalCost, fullAddress;
        let address1, city, state, zipcode;

        username = req.query.username;
        gallons = Number(req.query.gallons);

        // Handle bad url paremeters
        if (username == null || !(gallons > 100)) {
            throw new Error({ message: "Invalid URL query" });
        }

        // Get client info
        try {
            let query = await pool.query(
                `SELECT address1, city, state, zipcode 
                FROM users_info 
                WHERE username = '${username}'`);
            query = query.rows[0];

            // Empty profile data handling
            for (let key in query) {
                if (query[key] == null) {
                    return res.status(403).send("Client profile is missing");
                }
            }

            // Populate variables with client data
            address1 = query.address1;
            city = query.city;
            state = query.state;
            zipcode = query.zipcode;
            fullAddress = address1 + ", " + city + ", " + state + ", " + zipcode;

        } catch (error) {
            return res.status(404).send("No client with this username");
        }

        // Get client history
        let query = await pool.query(
            `SELECT username 
            FROM order_history
            WHERE username = '${username}' LIMIT 1`);
        hasHistory = query.rows.length != 0 ? true : false

        // Get prices and send back to client
        const quote = new PriceModule(state, hasHistory, gallons);
        unitCost = quote.getUnitCost();
        totalCost = quote.getQuote();
        res.status(200).send({
            "gallons": gallons,
            "unitCost": unitCost,
            "totalCost": totalCost,
            "deliveryAddress": fullAddress,
            "inStateDiscount": state == "TX" ? true : false,
            "historyDiscount": hasHistory
        });

    } catch (error) {
        return res.status(500).send(error);
    }
});

router.post("/", async (req, res) => {

    try {

        // Handle incomming data
        let orderDate = new Date().toISOString().slice(0, 10);
        const { username, deliveryDate, deliveryAddress, unitCost, gallons, totalCost } = req.body;

        // Save to database
        await pool.query(
            `INSERT INTO order_history 
            (username, purchase_date, delivery_date, delivery_address, unit_cost, gallons_amount, total_cost)
            VALUES 
            ($1, $2, $3, $4, $5, $6, $7);`,
            [username, orderDate, deliveryDate, deliveryAddress, unitCost, gallons, totalCost]);

        console.log("Successfully save order to database")
        return res.status(201).send("Success");

    } catch (error) {
        return res.status(400).send(error);
    }

});

module.exports = router;