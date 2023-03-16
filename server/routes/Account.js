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
    // send user info to client
    res.status(201).json(results.rows[0]);
  } catch (error) {
    res.status(404).json({message: error.message});
  }
});

// // Create profile
// router.post("/:username", async (req, res) => {
//   console.log(req.body);
//   const { username } = req.params;
//   const { fullname, address2, address1, city, state, zipcode } = req.body;
//   try {
//     const results = await db.query(
//       "INSERT INTO users_info VALUES ($1, $2, $3, $4, $5, $6, $7) returning *",
//       [username, fullname, address1, address2, city, state, zipcode]
//     );

//     res.status(200).json(results.rows[0]);
//   } catch (error) {
//     res.status(404).json({message: error.message});
//   }
// });

// Update profile
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
    
    res.status(201).json(results.rows[0]);
  } catch (error) {
    res.status(404).json({message: error.message});
  }
});

module.exports = router;
