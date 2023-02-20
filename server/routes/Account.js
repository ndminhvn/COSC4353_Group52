const express = require('express');
const router = express.Router();

router.get("/", (req, res) => {
    res.send("Retrived profile Successfully")
});

router.post("/", (req, res) => {
    res.send("Update profile Successfully")
});



module.exports = router;