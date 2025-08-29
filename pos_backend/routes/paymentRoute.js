const express = require("express");
const { isVerifiedUser } = require("../middlewares/tokenVerification");
const {
  createOrder,
  verifyPayment,
  callbackPayment
} = require("../controllers/paymentController");

const router = express.Router();

// 1. Tạo đơn hàng (cần user đăng nhập)
router.post("/create-order", isVerifiedUser, createOrder);

// 2. Frontend tự gọi để kiểm tra trạng thái (có thể cần login)
router.post("/verify-payment", verifyPayment);

// 3. Callback từ ZaloPay (server-to-server notify) => KHÔNG middleware
router.post("/zalopay-callback", callbackPayment);

module.exports = router;
