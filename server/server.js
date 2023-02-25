const express = require('express');
const app = express();
const cors = require('cors');
require("dotenv").config();

//Load dotenv
const PORT = process.env.PORT || 5050;

//CORS config
app.use(cors());

//Routes
app.use("/", require("./routes/Index"));
app.use("/login", require("./routes/Login"));
app.use("/register", require("./routes/Register"));
app.use("/history", require("./routes/FuelHistory"));
app.use("/account", require("./routes/Account")); 
app.use("/quote", require("./routes/FuelQuote"));


app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})