const express = require('express');
const router = express.Router();

// View user profile
router.get("/", (req, res) => {
    res.status(200).json({
        "message": "success"
    })
});

// Create profile
router.post("/", (req, res) => {
    res.send("Created profile Successfully")
});

// Edit profile
router.put("/", (req, res) => {
    res.send("Updated profile Successfully")
});

module.exports = router;



module.exports = router;