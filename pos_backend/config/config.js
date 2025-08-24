require("dotenv").config(); // Load biến môi trường từ file .env

const config = Object.freeze({
  port: process.env.PORT || 3000, // Cổng chạy server
  databaseURI: process.env.MONGODB_URI || "mongodb://localhost:27017/pos_system", // URI MongoDB
  nodeEnv: process.env.NODE_ENV || "development", // Môi trường chạy (dev/prod)
  accessTokenSecret: process.env.JWT_SECRET,
  zalopayAppId: process.env.ZALOPAY_APP_ID,
  zalopayKeyId1: process.env.ZALOPAY_KEY_ID_1,
  zalopayKeyId2: process.env.ZALOPAY_KEY_ID_2,
  zalopayEndpoint: process.env.ZALOPAY_ENDPOINT
});

module.exports = config;
