const express = require('express');
const router = express.Router();
const pool = require('../database/dbCreds');
const bcrypt = require("bcrypt");

router.post("/", async (req, res) => {
    try {
        const username = req.body.usernameRegister;
        
        let query = await pool.query(
            `SELECT username
            FROM users 
            WHERE username = '${username}'`);
            
        if (query.rows.length == 0) {
            const hashedPassword = await bcrypt.hash(req.body.passwordRegister, 10);

            try {
                await pool.query(
                    `INSERT INTO users (username, password) 
                    VALUES ('${username}','${hashedPassword}');
                    INSERT INTO users_info (username)
                    VALUES ('${username}');`
                );
                res.status(200).send(username);
            } catch (error) {
                res.status(201).send("Error while adding this user.");
            }
        }
        else {
            res.status(400).send("Username already existed. Please log in.");
        }
    } catch (error) {
        res.status(500).send("Error occurred while adding a new user. Please try again!");
    }
});

module.exports = router;