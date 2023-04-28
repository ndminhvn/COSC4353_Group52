const express = require("express");
const router = express.Router();
const pool = require("../database/dbCreds");
const bcrypt = require("bcrypt");

router.post("/", async (req, res) => {
  try {
    const username = req.body.usernameLogin;

    let existingUser = await pool.query(
      `SELECT a.username, a.password, b.fullname 
                FROM users a JOIN users_info b 
                ON a.username = b.username
                WHERE a.username = '${username}'`
    );

    if (existingUser.rows.length === 0) {
      return res.status(404).send("Username not found.");
    } else {
      // Check if password entered is correct
      let correctPassword = existingUser.rows[0].password;
      let isPasswordCorrect = await bcrypt.compare(
        req.body.passwordLogin,
        correctPassword
      );

      if (!isPasswordCorrect) {
        return res.status(400).send("Incorrect password.");
      } else {
        // check if the user is a first time user
        // (if the fullName is null then this is a first time user)
        let fullName = existingUser.rows[0].fullname;

        if (fullName == null) {
          return res.status(200).send({ username, navigateTo: "/account" });
        } else return res.status(200).send({ username, navigateTo: "/" });
      }
    }
  } catch (err) {
    // res.status(500).json({ message: err.message})
    // console.console.error();
    return res.status(500).send("Something went wrong. Please try again!");
  }
});

module.exports = router;