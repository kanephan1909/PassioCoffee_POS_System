import { CiCoffeeCup } from "react-icons/ci";
import { IoIosMore } from "react-icons/io";
import { useNavigate } from "react-router-dom"
import { Table, ShoppingCart, Home } from 'lucide-react'
import React, { useState } from "react";


const HeaderNav = () => {

    const [activeTab, setActiveTab] = useState("home");

    const navigate = useNavigate();

    return (
        <div className="fixed bottom-0 left-0 right-0 p-5 h-[88px] flex justify-around border border-white border-opacity-30 shadow-xl" style={{ background: 'linear-gradient(135deg, #A6CE39 0%, #8BC34A 25%, #7CB342 50%, #689F38 75%, #558B2F 100%)' }}>
            <button
                onClick={() => {
                    navigate("/");
                    setActiveTab("home");
                }}
                className={`flex items-center mr-10 justify-center text-[#f5f5f5] w-[250px] rounded-[20px] font-bold ${activeTab === "home"
                    ? "bg-white bg-opacity-20 shadow-lg"
                    : "hover:bg-white hover:bg-opacity-10"
                    }`}
            >
                <Home className="inline mr-2" size={20} />
                <p>Trang Chủ</p>
            </button>
            <button
                onClick={() => {
                    navigate("/Orders");
                    setActiveTab("orders");
                }}
                className={`flex items-center mr-10 justify-center text-[#f5f5f5] w-[250px] rounded-[20px] font-bold ${activeTab === "orders"
                    ? "bg-white bg-opacity-20 shadow-lg"
                    : "hover:bg-white hover:bg-opacity-10"
                    }`}
            >
                <ShoppingCart className="inline mr-2" size={20} />
                <p>Đơn Hàng</p>
            </button>
            <button onClick={() => {
                navigate("/Tables");
                setActiveTab("tables");
            }}
                className={`flex items-center mr-10 justify-center text-[#f5f5f5] w-[250px] rounded-[20px] font-bold ${activeTab === "tables"
                    ? "bg-white bg-opacity-20 shadow-lg"
                    : "hover:bg-white hover:bg-opacity-10"
                    }`}
            ><Table className="inline mr-2" size={20} /><p>Bàn Đặt</p></button>
            <button className="flex items-center mr-10 justify-center text-[#f5f5f5] w-[250px] rounded-[20px] font-bold" ><IoIosMore className="inline mr-2" size={20} /><p>Thêm</p></button>
            <button onClick={() => navigate("/tables")} className="absolute bottom-10 rounded-full text-[#f5f5f5] p-3 items-center hover:bg-white hover:bg-opacity-10 border border-white border-opacity-30 shadow-lg bg-[#a6ce3986]"><CiCoffeeCup size={40}/> </button>
        </div>
    )
}

export default HeaderNav
