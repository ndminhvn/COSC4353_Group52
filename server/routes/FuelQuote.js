const express = require('express');
const router = express.Router();

// Helps get the price using client_id, and gallon requested
router.get("/", (req, res) => {
    res.send("Purchase Successfully")
});

router.post("/", (req, res) => {
    res.send("Purchase Successfully")
});

module.exports = router;