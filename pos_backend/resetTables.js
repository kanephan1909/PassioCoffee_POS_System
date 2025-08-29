require("dotenv").config();
const mongoose = require("mongoose");
const Table = require("./models/tableModel"); // ✅ đổi từ ../ thành ./
const connectDB = require("./config/database");


const MONGO_URI = process.env.MONGO_URI;

connectDB()
  .then(async () => {
    await Table.updateMany({}, { status: "available", currentOrder: null });
    console.log("✅ Đã reset tất cả bàn về available");
    process.exit();
  })
  .catch(err => {
    console.error("❌ Lỗi:", err);
    process.exit(1);
  });
