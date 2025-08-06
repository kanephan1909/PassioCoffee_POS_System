const Order = require("../models/orderModel");

// Thêm đơn hàng
const addOrder = async (req, res, next) => {
  try {
    const order = new Order(req.body);
    await order.save();
    res.status(201).json({ success: true, message: "Đơn Hàng Đã Được Tạo", data: order });
  } catch (error) {
    next(error);
  }
};

// Lấy 1 đơn hàng theo ID
const getOrder = async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ success: false, message: "Không tìm thấy đơn hàng" });
    }
    res.status(200).json({ success: true, data: order });
  } catch (error) {
    next(error);
  }
};

// Lấy tất cả đơn hàng
const getOrders = async (req, res, next) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 }); // Sắp xếp mới nhất lên đầu
    res.status(200).json({ success: true, data: orders });
  } catch (error) {
    next(error);
  }
};

// Cập nhật đơn hàng
const updateOrder = async (req, res, next) => {
  try {
    const updatedOrder = await Order.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );

    if (!updatedOrder) {
      return res.status(404).json({ success: false, message: "Không tìm thấy đơn hàng" });
    }

    res.status(200).json({ success: true, message: "Cập nhật đơn hàng thành công", data: updatedOrder });
  } catch (error) {
    next(error);
  }
};

module.exports = { addOrder, getOrder, getOrders, updateOrder };
