const express = require("express");
const router = express.Router();
const db = require("../database/dbCreds");

// Get all users (testing)
// router.get("/", async (req, res) => {
//   try {
//     const results = await db.query(`SELECT * FROM USERS_INFO`);
//     //console.log(results)
//     res.status(200).json({
//       status: "success",
//       results: results.rows.length,
//       data: {
//         users: results.rows,
//       },
//     });
//   } catch (err) {
//     console.log(err);
//   }
// });

// View a specific user profile
router.get("/:username", async (req, res) => {
  try {
    const username = req.params.username;
    console.log(username);
    const results = await db.query(
      `select * from users_info where username = '${username}'`
    );
    // console.log(results.rows[0])
    res.status(200).json({
      status: "success",
      data: {
        user: results.rows[0],
      },
    });
  } catch (error) {
    console.log(error);
  }
});

// Create profile
router.post("/:username", async (req, res) => {
  //   console.log(req.body);
  const username = req.params.username;
  const { fullname, address1, address2, city, state, zipcode } = req.body;
  try {
    const results = await db.query(
      "INSERT INTO users_info VALUES ($1, $2, $3, $4, $5, $6, $7) returning *",
      [username, fullname, address1, address2, city, state, zipcode]
    );

    res.status(200).json({
      status: "success",
      data: {
        user: results.rows[0],
      },
    });
  } catch (err) {
    console.log(err);
  }
});

// Edit profile
router.put("/:username", async (req, res) => {
  const username = req.params.username;
  const { fullname, address1, address2, city, state, zipcode } = req.body;
  try {
    const results = await db.query(
      "UPDATE users_info\
      SET fullname=$1, address1=$2, address2=$3, city=$4, state=$5, zipcode=$6\
      WHERE username=$7 returning *",
      [fullname, address1, address2, city, state, zipcode, username]
    );
    res.status(200).json({
      status: "success",
      data: {
        user: results.rows[0],
      },
    });
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
