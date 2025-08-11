import React, { useState } from "react";
import { register } from "../../https";
import { useMutation } from "@tanstack/react-query";
import { enqueueSnackbar } from "notistack";
import { useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux"


const Register = ({setIsRegister}) => {

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    role: ""
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRoleSelection = (selectedRole) => {
    setFormData({ ...formData, role: selectedRole });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    registerMutation.mutate(formData);
  };

  const registerMutation = useMutation({
    mutationFn: (reqData) => register(reqData),
    onSuccess: (res) => {
      const { data } = res;
      enqueueSnackbar(data.message, { variant: "success" });
      setFormData({
        name: "",
        email: "",
        phone: "",
        password: "",
        role: "",
      });

      setTimeout(() => {
        setIsRegister(false)
      }, 1500) 
    },
    onError: (error) => {
      const { response } = error;
      enqueueSnackbar(response.data.message, { variant: "error" });
    }
  })

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-6 mt-8">
      {/* Họ và tên */}
      <div className="flex flex-col">
        <label htmlFor="name" className="text-sm font-medium text-gray-700 mb-1">
          Họ và tên
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#A5C83B]"
          placeholder="Nguyễn Văn A"
          required
        />
      </div>

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

      {/* Số điện thoại */}
      <div className="flex flex-col">
        <label htmlFor="phone" className="text-sm font-medium text-gray-700 mb-1">
          Số điện thoại
        </label>
        <input
          type="tel"
          id="phone"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          inputMode="numeric"
          pattern="[0-9]{9,11}"
          maxLength={11}
          className="px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#A5C83B]"
          placeholder="0987654321"
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

      {/* Vai trò */}
      <div>
        <label className="text-sm font-medium text-gray-700 mb-1 block">
          Chọn Vai Trò Của Bạn
        </label>
        <div className="flex items-center gap-3 mt-4">
          {["Phục Vụ", "Thu Ngân", "Admin"].map((role) => (
            <button
              key={role}
              type="button"
              onClick={() => handleRoleSelection(role)}
              className={`border px-4 py-3 w-full rounded-lg ${formData.role === role
                ? "bg-[#A5C83B] text-white border-[#A5C83B]"
                : "border-gray-300 text-gray-700"
                }`}
            >
              {role}
            </button>
          ))}
        </div>
      </div>

      {/* Submit */}
      <button
        type="submit"
        className="w-full bg-[#A5C83B] text-white py-2 rounded hover:bg-[#94b83b] transition"
      >
        Đăng ký
      </button>
    </form>
  );
};

export default Register;
