require("dotenv").config();
const express = require("express");
const connectDB = require("./config/database");
const config = require("./config/config")
const app = express();

const PORT = config.PORT;
connectDB();

// Root Endpoint
app.get("/", (req, res) => {
    res.json({message : "Hello from POS Server"});
})

// Server
app.listen(PORT, () => {
    console.log(`POS Server is listening on port ${PORT}`)
})