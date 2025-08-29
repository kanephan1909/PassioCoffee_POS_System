import React, { useState } from "react";
import { enqueueSnackbar } from "notistack";
import { useMutation } from "@tanstack/react-query";
import { forgotPasswordApi } from "../../https";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");

  const forgotPasswordMutation = useMutation({
    mutationFn: (data) => forgotPasswordApi(data),
    onSuccess: () => {
      enqueueSnackbar("Link đặt lại mật khẩu đã được gửi đến email!", { variant: "success" });
    },
    onError: (error) => {
      const message = error?.response?.data?.message || "Có lỗi xảy ra!";
      enqueueSnackbar(message, { variant: "error" });
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    forgotPasswordMutation.mutate({ email });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white shadow-md rounded-xl p-8"
      >
        <h2 className="text-2xl font-semibold text-center mb-4">Quên mật khẩu</h2>
        <p className="text-sm text-gray-500 text-center mb-6">
          Nhập email đã đăng ký, chúng tôi sẽ gửi liên kết đặt lại mật khẩu.
        </p>

        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          className="w-full px-4 py-2 border rounded mb-4 focus:outline-none focus:ring-2 focus:ring-[#A5C83B]"
          required
        />
        <button
          type="submit"
          className="w-full bg-[#A5C83B] text-white py-2 rounded hover:bg-[#94b83b] transition"
        >
          Gửi liên kết đặt lại
        </button>

        <div className="text-center mt-4">
          <a href="/auth" className="text-sm text-[#A5C83B] hover:underline">
            Quay lại đăng nhập
          </a>
        </div>
      </form>
    </div>
  );
};

export default ForgotPassword;
