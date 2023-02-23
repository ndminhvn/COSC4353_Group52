const express = require('express');
const router = express.Router();

router.post("/", (req, res) => {
    res.send("Purchase Successfully")
});

module.exports = router;