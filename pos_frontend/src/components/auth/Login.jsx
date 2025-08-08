import React, { useState } from "react";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Login data:", formData);
    // Gọi API đăng nhập tại đây nếu cần
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-6 mt-8">
      {/* Email */}
      <div className="flex flex-col">
        <label htmlFor="email" className="text-sm font-medium text-gray-700 mb-1">
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#A5C83B]"
          placeholder="you@example.com"
          required
        />
      </div>

      {/* Mật khẩu */}
      <div className="flex flex-col">
        <label htmlFor="password" className="text-sm font-medium text-gray-700 mb-1">
          Mật khẩu
        </label>
        <input
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          className="px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#A5C83B]"
          placeholder="••••••••"
          required
        />
      </div>

      {/* Submit */}
      <button
        type="submit"
        className="w-full bg-[#A5C83B] text-white py-2 rounded hover:bg-[#94b83b] transition"
      >
        Đăng nhập
      </button>

      {/* Quên mật khẩu */}
      <div className="text-right">
        <a href="#" className="text-sm text-[#A5C83B] hover:underline">
          Quên mật khẩu?
        </a>
      </div>
    </form>
  );
};

export default Login;
