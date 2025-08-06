require("dotenv").config(); // Load biến môi trường từ file .env

const config = Object.freeze({
  port: process.env.PORT || 3000, // Cổng chạy server
  databaseURI: process.env.MONGODB_URI || "mongodb://localhost:27017/pos_system", // URI MongoDB
  nodeEnv: process.env.NODE_ENV || "development" // Môi trường chạy (dev/prod)
});

module.exports = config;
