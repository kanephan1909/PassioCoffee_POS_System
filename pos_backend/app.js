require("dotenv").config();
const express = require("express");
const connectDB = require("./config/database");
const config = require("./config/config");
const cookieParser = require("cookie-parser");
const app = express();

const PORT = config.port;

connectDB();

//Middlewares
app.use(express.json()); //Đảm bảo dòng này đứng trước route
app.use(cookieParser())

//Routes
app.use("/api/user", require("./routes/userRoute"));

//Error Handling
app.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
});

app.listen(PORT, () => {
  console.log(`POS Server is listening on port ${PORT}`);
});
