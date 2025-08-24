require("dotenv").config();
const express = require("express");
const connectDB = require("./config/database");
const config = require("./config/config");
const cookieParser = require("cookie-parser");
const cors = require("cors")
const app = express();

const PORT = config.port;

connectDB();

//Middlewares
app.use(cors({
  credentials: true,
  origin: ['http://localhost:5173']
}))
app.use(express.json()); //Đảm bảo dòng này đứng trước route
app.use(cookieParser())

//Root EndPoint
app.get("/", (req, res) => {
  res.json({message: "Hello from POS Server!"})
})

// Orther EndPoint
app.use("/api/user", require("./routes/userRoute"));
app.use("/api/order", require("./routes/orderRoute"));
app.use("/api/table", require("./routes/tableRoute"));
app.use("/api/payment", require("./routes/paymentRoute"));


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
