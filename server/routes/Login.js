const express = require('express');
const router = express.Router();
const pool = require('../database/dbCreds');
const bcrypt = require("bcrypt");

router.post("/", async(req, res) => {
    const username = req.body.usernameLogin
    const password = req.body.passwordLogin
    // console.log(username, password)

    try {
        // Check if user exists
        const existingUser = await pool.query(
            `SELECT * FROM users 
            WHERE username = '${username}'`);
        
        // console.log(existingUser.rows[0])

        if (!existingUser)
            return res.status(404).send("User doesn't exist.")
            
        // console.log('User registered. Proceed to check password')

        // Check if password entered is correct
        correctPassword = existingUser.rows[0].password
        const isPasswordCorrect = await bcrypt.compare(password, correctPassword)
        
        if (!isPasswordCorrect)
            return res.status(400).send("Incorrect password.")

        res.status(200).send(username)

    } catch(err) {
        res.status(500).json({ message: err.message})
    }
});

module.exports = router;