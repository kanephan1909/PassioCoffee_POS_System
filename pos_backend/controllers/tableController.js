const Table = require("../models/tableModel");
const createHttpError = require("http-errors");

const addTable = async (req, res, next) => {
  try {
    const { tableNo, status, currentOrder, seats } = req.body;

    if (!tableNo) {
      return next(createHttpError(400, "Số bàn là bắt buộc"));
    }

    const existingTable = await Table.findOne({ tableNo });
    if (existingTable) {
      return next(createHttpError(400, "Bàn đã tồn tại"));
    }

    const newTable = new Table({ tableNo, status, currentOrder, seats });
    await newTable.save();

    res.status(201).json({
      success: true,
      message: "Thêm bàn thành công",
      data: newTable,
    });
  } catch (error) {
    next(error);
  }
};

const getTables = async (req, res, next) => {
  try {
    const tables = await Table.find().populate({
      path: "currentOrder",
      select: "customerDetails",
    });

    console.log(JSON.stringify(tables, null, 2));

    res.status(200).json({
      success: true,
      message: "Lấy danh sách bàn thành công",
      data: tables,
    });
  } catch (error) {
    next(error);
  }
};

const updateTable = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status, orderId } = req.body;

    const updatedTable = await Table.findByIdAndUpdate(
      id,
      { status, currentOrder: orderId },
      { new: true }
    );

    if (!updatedTable) {
      return next(createHttpError(404, "Không tìm thấy bàn"));
    }

    res.status(200).json({
      success: true,
      message: "Cập nhật bàn thành công",
      data: updatedTable,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { addTable, getTables, updateTable };
