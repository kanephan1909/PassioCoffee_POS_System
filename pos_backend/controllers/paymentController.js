const axios = require("axios");
const crypto = require("crypto");
const config = require("../config/config");
const Order = require("../models/orderModel");
const Payment = require("../models/paymentModel");

const zalopay = {
  app_id: config.zalopayAppId,
  key1: config.zalopayKeyId1,
  key2: config.zalopayKeyId2,
  endpoint: config.zalopayEndpoint,
};

// Tạo đơn hàng
const createOrder = async (req, res) => {
  try {
    const { amount, customerDetails, items, bills, table } = req.body;
    if (!amount) return res.status(400).json({ message: "Thiếu amount" });

    // 1. Tạo Order trong DB (pending)
    // const newOrder = new Order({
    //   customerDetails,
    //   orderStatus: "pending",
    //   bills,
    //   items,
    //   table,
    // });
    // await newOrder.save();

    // 2. Nhúng orderId vào embed_data
    const embed_data = {
      redirecturl: "http://localhost:5173/menu",
      orderId: newOrder._id.toString(),
    };

    const itemsZP = [];
    const transID = Math.floor(Math.random() * 1000000);

    const order = {
      app_id: zalopay.app_id,
      app_trans_id: `${new Date()
        .toISOString()
        .slice(2, 10)
        .replace(/-/g, "")}_${transID}`,
      app_time: Date.now(),
      amount: Math.round(amount),
      app_user: req.user?.id || `guest_${Date.now()}`,
      embed_data: JSON.stringify(embed_data),
      item: JSON.stringify(itemsZP),
      description: `Thanh toán đơn hàng #${transID}`,
      bank_code: "",
    };

    // 3. Tạo mac chuẩn
    const data = `${order.app_id}|${order.app_trans_id}|${order.app_user}|${order.amount}|${order.app_time}|${order.embed_data}|${order.item}`;
    order.mac = crypto
      .createHmac("sha256", zalopay.key1)
      .update(data)
      .digest("hex");

    // 4. Gọi ZaloPay
    const result = await axios.post(zalopay.endpoint, null, { params: order });

    return res.json({
      ...result.data,
      app_trans_id: order.app_trans_id,
      orderId: newOrder._id,
    });
  } catch (error) {
    console.error("Lỗi tạo đơn hàng:", error.response?.data || error.message);
    return res.status(500).json({ message: "Tạo đơn hàng thất bại" });
  }
};

// Verify Payment (FE chủ động query)
const verifyPayment = async (req, res) => {
  try {
    const app_trans_id =
      req.body.app_trans_id ||
      req.body.apptransid ||
      req.query.app_trans_id ||
      req.query.apptransid;

    if (!app_trans_id) {
      return res
        .status(400)
        .json({ success: false, message: "Thiếu app_trans_id/apptransid" });
    }

    // MAC: app_id|app_trans_id|key1
    const data = `${zalopay.app_id}|${app_trans_id}|${zalopay.key1}`;
    const mac = crypto
      .createHmac("sha256", zalopay.key1)
      .update(data)
      .digest("hex");

    const formBody = new URLSearchParams({
      app_id: String(zalopay.app_id),
      app_trans_id,
      mac,
    }).toString();

    const result = await axios.post(
      "https://sb-openapi.zalopay.vn/v2/query",
      formBody,
      { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
    );

    const { return_code, sub_return_code } = result.data;
    const success = return_code === 1 && sub_return_code === 1;

    if (success) {
      console.log("Thanh toán thành công:", app_trans_id);

      // update order trong DB nếu cần
      const embedData = result.data?.data?.embed_data
        ? JSON.parse(result.data.data.embed_data)
        : null;

      if (embedData?.orderId) {
        await Order.findByIdAndUpdate(embedData.orderId, {
          orderStatus: "paid",
        });
      }

      // lưu payment log
      await Payment.create({
        paymentId: result.data.zp_trans_id,
        orderId: app_trans_id,
        amount: result.data.amount,
        currency: "VND",
        status: "success",
        method: "ZaloPay",
        createdAt: new Date(),
      });
    }

    return res.json({
      success,
      message: success ? "Thanh toán thành công" : "Thanh toán chưa thành công",
      data: result.data,
    });
  } catch (error) {
    console.error(
      "Verify payment error:",
      error.response?.data || error.message
    );
    return res
      .status(500)
      .json({ success: false, message: "Lỗi xác minh thanh toán" });
  }
};

// Callback từ ZaloPay (server-to-server notify)
const callbackPayment = async (req, res) => {
  try {
    const dataStr = req.body.data;
    const reqMac = req.body.mac;

    const mac = crypto
      .createHmac("sha256", zalopay.key2)
      .update(dataStr)
      .digest("hex");

    if (reqMac !== mac) {
      return res
        .status(400)
        .json({ return_code: -1, return_message: "Invalid MAC" });
    }

    const dataJson = JSON.parse(dataStr);

    // lưu payment log
    const existing = await Payment.findOne({
      paymentId: result.data.zp_trans_id,
    });
    if (!existing) {
      await Payment.create({
        paymentId: result.data.zp_trans_id,
        orderId: app_trans_id,
        amount: result.data.amount,
        currency: "VND",
        status: "success",
        method: "ZaloPay",
        createdAt: new Date(),
      });
    }

    if (dataJson.embed_data) {
      const embedData = JSON.parse(dataJson.embed_data);
      if (embedData?.orderId) {
        await Order.findOneAndUpdate(
          { _id: embedData.orderId, orderStatus: { $ne: "paid" } },
          { orderStatus: "paid" }
        );
      }
    }

    return res.json({ return_code: 1, return_message: "success" });
  } catch (err) {
    console.error("Callback error:", err.message);
    return res.json({ return_code: 0, return_message: err.message });
  }
};

module.exports = { createOrder, verifyPayment, callbackPayment };
