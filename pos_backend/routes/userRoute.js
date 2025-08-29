const express = require("express");
const {
  register,
  login,
  getUserData,
  logout,
  forgotPassword,
  resetPassword,
} = require("../controllers/userController");
const { isVerifiedUser } = require("../middlewares/tokenVerification");

const router = express.Router();

// Authentication Routes
router.post("/register", register);
router.post("/login", login);

// Forgot/Reset Password
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);

router.post("/logout", isVerifiedUser, logout);

router.get("/", isVerifiedUser, getUserData);

module.exports = router;
