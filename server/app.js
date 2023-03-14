const express = require('express');
const app = express();
const cors = require('cors');
var bodyParser = require('body-parser');

// CORS config
app.use(cors());

// Body-parser
app.use(bodyParser.json())

// Routes
app.use("/login", require("./routes/Login"));
app.use("/register", require("./routes/Register"));
app.use("/history", require("./routes/FuelHistory"));
app.use("/account", require("./routes/Account")); 
app.use("/quote", require("./routes/FuelQuote"));

module.exports = app;