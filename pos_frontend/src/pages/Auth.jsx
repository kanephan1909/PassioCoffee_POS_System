import passio from "../assets/images/passio-bg2.jpg";
import logo from "../assets/images/passio-logo.jpg"
import Login from "../components/auth/Login";
import Register from "../components/auth/Register";
import React, { useState } from "react";


const Auth = () => {

  const [isRegister, setIsRegister] = useState(false);

  return (
    <div className="flex h-screen w-full overflow-hidden">
      {/* Left Section */}
      <div className="w-1/2 relative flex items-center justify-center">
        {/* Background Image */}
        <img src={passio} alt="Passio Coffee" className="w-full h-full object-cover" />

        {/* Overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-40 z-10" />

        {/* Quote */}
        <blockquote className="absolute bottom-6 px-6 text-lg italic text-white z-20 max-w-lg">
          “Nơi bạn tìm thấy hương vị đậm đà, không gian yên bình và một chút cảm hứng giữa cuộc sống hối hả.”
          <footer className="block mt-2 text-[#A5C83B] font-semibold">— Passio Coffee</footer>
        </blockquote>
      </div>

      {/* Right Section */}
      <div className="w-1/2 bg-white p-12">
        <div className="flex flex-col items-center gap-2">
          <img src={logo} alt="Passio Logo" className="h-24 w-24 border-2 mx-auto" />
          <h1 className="text-lg font-semibold text-passio tracking-wide">Passio Coffee</h1>
        </div>

        <h2 className="text-4xl text-center mt-10 font-semibold text-passio mb-10">
          {isRegister ? "Đăng Ký Tài Khoản" : "Đăng Nhập Tài Khoản"}
        </h2>

        {/* Components */}
        {isRegister ? <Register setIsRegister={setIsRegister} /> : <Login />}


        <div className="flex justify-center mt-6">
          <p className="text-sm text-[#ababab]">
            {isRegister ? "Bạn đã có tài khoản?" : "Bạn Chưa Có Tài Khoản?"}
            <span
              onClick={() => setIsRegister(!isRegister)}
              className="text-[#A5C83B] font-semibold hover:underline ml-1 cursor-pointer"
            >
              {isRegister ? "Đăng Nhập" : "Đăng Ký"}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Auth;
