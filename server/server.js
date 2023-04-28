const app = require("./app");
const pool = require("./database/dbCreds");
require("dotenv").config();

// Connect to database
pool.connect((err) => {
  if (err) throw err;
  else console.log("Connected to database");
});

// Load dotenv
const PORT = process.env.PORT || 6000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});