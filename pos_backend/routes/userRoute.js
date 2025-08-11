const express = require("express");
const { register, login, getUserDate, logout } = require("../controllers/userController");
const { isVerifiedUser } = require("../middlewares/tokenVerification");
const router = express.Router();

// Authentication Routes
router.post("/register", register);
router.post("/login", login);
router.post("/logout",isVerifiedUser ,logout);


router.route("/").get(isVerifiedUser, getUserDate);

module.exports = router;
