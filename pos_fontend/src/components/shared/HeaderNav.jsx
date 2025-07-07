import { CiCoffeeCup } from "react-icons/ci";
import { IoIosMore } from "react-icons/io";
import { useNavigate } from "react-router-dom"
import { Table, ShoppingCart, Home } from 'lucide-react'
import React, { useState } from "react";


const HeaderNav = () => {

    const [activeTab, setActiveTab] = useState("home");

    const navigate = useNavigate();

    return (
        <div className="fixed bottom-0 left-0 right-0 p-5 h-[85px] flex justify-around border-t-2 shadow-xl">
            <button
                onClick={() => {
                    navigate("/");
                    setActiveTab("home");
                }}
                className={`flex items-center mr-10 justify-center w-[250px] rounded-[20px] font-bold ${activeTab === "home"
                    ? "text-white"
                    : "text-gray-700 hover:bg-gray-100"
                    }`}
                style={{ backgroundColor: activeTab === 'home' ? '#A6CE39' : 'transparent' }}
            >
                <Home className="inline mr-2" size={20} />
                <p>Trang Chủ</p>
            </button>
            <button
                onClick={() => {
                    navigate("/Orders");
                    setActiveTab("orders");
                }}
                className={`flex items-center mr-10 justify-center w-[250px] rounded-[20px] font-bold ${activeTab === "orders"
                    ? "text-white"
                    : "text-gray-700 hover:bg-gray-100"
                    }`}
                style={{ backgroundColor: activeTab === 'orders' ? '#A6CE39' : 'transparent' }}
            >
                <ShoppingCart className="inline mr-2" size={20} />
                <p>Đơn Hàng</p>
            </button>
            <button onClick={() => {
                navigate("/Tables");
                setActiveTab("tables");
            }}
                className={`flex items-center mr-10 justify-center w-[250px] rounded-[20px] font-bold ${activeTab === "tables"
                    ? "text-white"
                    : "text-gray-700 hover:bg-gray-100"
                    }`}
                style={{ backgroundColor: activeTab === 'tables' ? '#A6CE39' : 'transparent' }}
            ><Table className="inline mr-2" size={20} /><p>Bàn Đặt</p></button>
            <button className="flex items-center mr-10 justify-center text-gray-700 w-[250px] rounded-[20px] font-bold" ><IoIosMore className="inline mr-2" size={20} /><p>Thêm</p></button>
            <button onClick={() => navigate("/tables")} className="absolute bottom-8 rounded-full text-[#f5f5f5] p-3 items-center hover:bg-lime-500 border border-white border-opacity-30 shadow-lg bg-[#A6CE39]"><CiCoffeeCup size={40} /> </button>
        </div>
    )
}

export default HeaderNav
