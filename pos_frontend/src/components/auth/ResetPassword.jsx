import React, { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { enqueueSnackbar } from "notistack";
import { resetPasswordApi } from "../../https";
import { useSearchParams, useNavigate } from "react-router-dom";

const ResetPassword = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const token = searchParams.get("token"); // lấy token từ URL
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const resetPasswordMutation = useMutation({
    mutationFn: (reqData) => resetPasswordApi(reqData),
    onSuccess: () => {
      enqueueSnackbar("Đặt lại mật khẩu thành công! Vui lòng đăng nhập.", { variant: "success" });
      navigate("/login");
    },
    onError: (error) => {
      const message = error?.response?.data?.message || "Có lỗi xảy ra, vui lòng thử lại.";
      enqueueSnackbar(message, { variant: "error" });
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    if (password.length < 6) {
      enqueueSnackbar("Mật khẩu phải ít nhất 6 ký tự", { variant: "warning" });
      return;
    }

    if (password !== confirmPassword) {
      enqueueSnackbar("Mật khẩu nhập lại không khớp", { variant: "warning" });
      return;
    }

    resetPasswordMutation.mutate({ token, password });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto space-y-6 mt-8 bg-white shadow-md rounded-xl p-6"
    >
      <h2 className="text-2xl font-semibold text-gray-800 text-center">
        Đặt lại mật khẩu
      </h2>
      <p className="text-sm text-gray-500 text-center">
        Nhập mật khẩu mới cho tài khoản của bạn.
      </p>

      {/* Password */}
      <div className="flex flex-col">
        <label htmlFor="password" className="text-sm font-medium text-gray-700 mb-1">
          Mật khẩu mới
        </label>
        <input
          type="password"
          id="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#A5C83B]"
          placeholder="••••••••"
          required
        />
      </div>

      {/* Confirm Password */}
      <div className="flex flex-col">
        <label htmlFor="confirmPassword" className="text-sm font-medium text-gray-700 mb-1">
          Xác nhận mật khẩu
        </label>
        <input
          type="password"
          id="confirmPassword"
          name="confirmPassword"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#A5C83B]"
          placeholder="••••••••"
          required
        />
      </div>

      {/* Submit button */}
      <button
        type="submit"
        disabled={resetPasswordMutation.isLoading}
        className={`w-full text-white py-2 rounded transition 
          ${resetPasswordMutation.isLoading ? "bg-gray-400 cursor-not-allowed" : "bg-[#A5C83B] hover:bg-[#94b83b]"}`}
      >
        {resetPasswordMutation.isLoading ? "Đang xử lý..." : "Cập nhật mật khẩu"}
      </button>
    </form>
  );
};

export default ResetPassword;
