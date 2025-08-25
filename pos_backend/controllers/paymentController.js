const axios = require("axios");
const crypto = require("crypto");
const config = require("../config/config");

const zalopay = {
  app_id: config.zalopayAppId,
  key1: config.zalopayKeyId1,
  key2: config.zalopayKeyId2,
  endpoint: config.zalopayEndpoint,
};

// Tạo đơn hàng
const createOrder = async (req, res) => {
  try {
    const { amount, customerName, tableNo } = req.body;
    if (!amount) return res.status(400).json({ message: "Thiếu amount" });

    const embed_data = {
      redirecturl: "http://localhost:5173/menu",
      customerName,
      tableNo,
    };
    const items = [];
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
      item: JSON.stringify(items),
      description: `Thanh toán đơn hàng #${transID}`,
      bank_code: "",
    };

    //tạo mac chuẩn
    const data = `${order.app_id}|${order.app_trans_id}|${order.app_user}|${order.amount}|${order.app_time}|${order.embed_data}|${order.item}`;
    order.mac = crypto
      .createHmac("sha256", zalopay.key1)
      .update(data)
      .digest("hex");

    console.log("Gửi order sang ZaloPay:", order);

    // gọi ZaloPay API
    const result = await axios.post(zalopay.endpoint, null, { params: order });

    console.log("ZaloPay response:", result.data);

    return res.json({
      ...result.data,
      app_trans_id: order.app_trans_id,
    });
  } catch (error) {
    console.error("Lỗi tạo đơn hàng:", error.response?.data || error.message);
    return res.status(500).json({ message: "Tạo đơn hàng thất bại" });
  }
};

const verifyPayment = async (req, res) => {
  try {
    // nhận cả 2 kiểu tên để khỏi lệch FE/BE
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

    // gọi đúng endpoint query + form-urlencoded
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

    // return_code === 1: query OK
    // sub_return_code: 1=success, 2=pending, 3=failed
    const { return_code, sub_return_code } = result.data;
    const success = return_code === 1 && sub_return_code === 1;

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

// const verifyPayment = async (req, res) => {
//   try {
//     // Nhận đúng key chuẩn: app_trans_id (fallback: apptransid)
//     const app_trans_id = req.body.app_trans_id || req.body.apptransid;
//     console.log("Body client gửi lên:", req.body);

//     if (!app_trans_id) {
//       return res
//         .status(400)
//         .json({ success: false, message: "Thiếu app_trans_id" });
//     }

//     // Tạo MAC: app_id|app_trans_id|key1
//     const data = `${zalopay.app_id}|${app_trans_id}|${zalopay.key1}`;
//     const mac = crypto
//       .createHmac("sha256", zalopay.key1)
//       .update(data)
//       .digest("hex");

//     // Gọi API query (x-www-form-urlencoded)
//     const result = await axios.post(
//       "https://sb-openapi.zalopay.vn/v2/query",
//       new URLSearchParams({
//         app_id: zalopay.app_id,
//         app_trans_id,
//         mac,
//       }).toString(),
//       {
//         headers: {
//           "Content-Type": "application/json",
//           Accept: "application/json",
//         },
//       }
//     );

//     console.log("Kết quả verify:", result.data);

//     // return_code === 1: query OK
//     // sub_return_code: 1=success, 2=pending, 3=failed
//     if (result.data.return_code === 1) {
//       const success = result.data.sub_return_code === 1;
//       return res.json({ success, data: result.data });
//     } else {
//       return res.json({ success: false, data: result.data });
//     }
//   } catch (err) {
//     console.error("Lỗi verify:", err.response?.data || err.message);
//     return res
//       .status(500)
//       .json({ success: false, message: "Lỗi xác minh thanh toán" });
//   }
// };

const callbackPayment = async (req, res) => {
  try {
    console.log("ZaloPay callback:", req.body);

    const dataStr = req.body.data;
    const reqMac = req.body.mac;

    // ✅ Verify MAC với key2
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

    // TODO: cập nhật DB với trạng thái thanh toán (dataJson)

    // Trả về cho ZaloPay biết server của bạn đã nhận
    return res.json({ return_code: 1, return_message: "success" });
  } catch (err) {
    console.error("Callback error:", err.message);
    return res.json({ return_code: 0, return_message: err.message });
  }
};

module.exports = { createOrder, verifyPayment, callbackPayment };
