const createHttpError = require("http-errors");
const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("../config/config");
const nodemailer = require("nodemailer");


const register = async (req, res, next) => {
  try {
    const { name, phone, email, password, role } = req.body;

    if (!name || !phone || !email || !password || !role) {
      const error = createHttpError(400, "Tất cả các trường đều bắt buộc!");
      return next(error);
    }

    const isUserPresent = await User.findOne({ email });
    if (isUserPresent) {
      const error = createHttpError(400, "Người dùng đã tồn tại!");
      return next(error);
    }

    const user = { name, phone, email, password, role };
    const newUser = new User(user); 
    await newUser.save(); 

    const userToReturn = newUser.toObject();
    delete userToReturn.password;

    res.status(201).json({
      success: true,
      message: "Đăng ký người dùng thành công!!!",
      data: userToReturn,
    });
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      const error = createHttpError(400, "Tất cả các trường đều bắt buộc!");
      return next(error);
    }

    const isUserPresent = await User.findOne({ email });
    if (!isUserPresent) {
      const error = createHttpError(400, "Người dùng không tồn tại!");
      return next(error);
    }

    const isMatch = await bcrypt.compare(password, isUserPresent.password);
    if (!isMatch) {
      const error = createHttpError(401, "Mật khẩu không đúng!");
      return next(error);
    }

    const accessToken = jwt.sign(
      { _id: isUserPresent._id },
      config.accessTokenSecret,
      { expiresIn: "1d" }
    );

    res.cookie("accessToken", accessToken, {
      maxAge: 1000 * 60 * 60 * 24 * 30,
      httpOnly: true,
      sameSite: "none",
      secure: true,
    });

    res.status(200).json({
      success: true,
      message: "Đăng nhập thành công!",
      data: isUserPresent,
    });
  } catch (error) {
    next(error);
  }
}

const getUserData = async (req, res, next) => {
  try {
    
    const user = await User.findById(req.user._id);
    res.status(200).json({success: true, data: user});

  } catch (error) {
    next(error)
  }
}

const logout = async (req, res ,next ) => {
  try {
    res.clearCookie('accessToken');
    res.status(200).json({success: true, message: "Đăng Xuất Thành Công!!!"})
  } catch (error) {
    next(error)
  }
}

const forgotPassword = async (req, res, next) => {
  try {
    const { email } = req.body;
    if (!email) {
      return next(createHttpError(400, "Email là bắt buộc!"));
    }

    const user = await User.findOne({ email });
    if (!user) {
      return next(createHttpError(404, "Người dùng không tồn tại!"));
    }

    // Tạo reset token (random string)
    const resetToken = crypto.randomBytes(32).toString("hex");

    // Mã hóa token trước khi lưu vào DB để an toàn
    const hashedToken = crypto.createHash("sha256").update(resetToken).digest("hex");
    user.resetPasswordToken = hashedToken;
    user.resetPasswordExpire = Date.now() + 15 * 60 * 1000; // 15 phút
    await user.save();

    // Link reset gửi cho người dùng
    const resetLink = `${process.env.FRONTEND_URL}/reset-password?token=${resetToken}`;

    // Gửi email (dùng nodemailer)
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    await transporter.sendMail({
      from: `"Support" <${process.env.SMTP_USER}>`,
      to: user.email,
      subject: "Đặt lại mật khẩu",
      html: `<p>Nhấn vào link dưới đây để đặt lại mật khẩu:</p>
             <a href="${resetLink}" target="_blank">${resetLink}</a>`,
    });

    res.status(200).json({
      success: true,
      message: "Email đặt lại mật khẩu đã được gửi!",
    });
  } catch (error) {
    next(error);
  }
};

const resetPassword = async (req, res, next) => {
  try {
    const { token, password } = req.body;
    if (!token || !password) {
      return next(createHttpError(400, "Token và mật khẩu mới là bắt buộc!"));
    }

    // Hash token nhận từ client để so với DB
    const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

    const user = await User.findOne({
      resetPasswordToken: hashedToken,
      resetPasswordExpire: { $gt: Date.now() }, // kiểm tra hạn
    });

    if (!user) {
      return next(createHttpError(400, "Token không hợp lệ hoặc đã hết hạn!"));
    }

    // Update mật khẩu
    user.password = password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save();

    res.status(200).json({
      success: true,
      message: "Đặt lại mật khẩu thành công!",
    });
  } catch (error) {
    next(error);
  }
};



module.exports = { register, login, getUserData , logout , forgotPassword , resetPassword};
