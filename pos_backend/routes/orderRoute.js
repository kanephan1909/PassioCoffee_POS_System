const express = require("express");
const { isVerifiedUser } = require("../middlewares/tokenVerification");
const { addOrder, getOrder, getOrders, updateOrder, deleteOrder } = require("../controllers/orderController");
const router = express.Router();

router.route("/").post(isVerifiedUser, addOrder)
router.route("/").get(isVerifiedUser, getOrders)
router.route("/:id").get(isVerifiedUser, getOrder)
router.route("/:id").put(isVerifiedUser, updateOrder)
router.route("/:id").delete(isVerifiedUser, deleteOrder);


module.exports = router;