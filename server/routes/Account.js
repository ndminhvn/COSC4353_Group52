const express = require("express");
const router = express.Router();
const db = require("../database/dbCreds");

// Get user profile given the username
router.get("/:username", async (req, res) => {
  const { username } = req.params;
  // console.log(username);
  try {
    const results = await db.query(
      `select * from users_info where username = '${username}'`
    );
    // No username found
    if (results.rows.length == 0) {
      throw new Error();
    }
    // send user info to client
    res.status(200).json(results.rows[0]);
  } catch (error) {
    res.status(404).send("Failed to fetch data...");
  }
});

// Create/Update profile
router.put("/:username", async (req, res) => {
  const { username } = req.params;
  const { fullname, address1, address2, city, state, zipcode } = req.body;
  try {
    const results = await db.query(
      "UPDATE users_info\
      SET fullname=$1, address1=$2, address2=$3, city=$4, state=$5, zipcode=$6\
      WHERE username=$7 returning *",
      [fullname, address1, address2, city, state, zipcode, username]
    );
    // No username found
    if (results.rows.length == 0) {
      throw new Error();
    }
    res.status(201).json(results.rows[0]);
  } catch (error) {
    res.status(404).json({msg: "Unable to update your profile. Please try again!"});
  }
});

module.exports = router;
