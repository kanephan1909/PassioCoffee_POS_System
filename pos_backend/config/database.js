const mongoose = require("mongoose");
const config = require("./config");

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(config.databaseURI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);

    // await mongoose.connection.collection("orders").deleteMany({});
    // console.log("🗑️  Đã xóa toàn bộ dữ liệu trong collection 'orders'");

    // // Xóa dữ liệu trong collection Payments
    // await mongoose.connection.collection("payments").deleteMany({});
    // console.log("🗑️  Đã xóa toàn bộ dữ liệu trong collection 'payments'");
  } catch (error) {
    console.log(`Error: ${error.message}`);
    process.exit();
  }
};

module.exports = connectDB;
