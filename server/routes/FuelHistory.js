const express = require('express');
const router = express.Router();
const historyData = require('./mock-fqhistory.json');

router.get("/", async (req, res) => {
    try {
        res.json(historyData);
    } catch (error) {
        console.error(error.message);
    }
});

module.exports = router;