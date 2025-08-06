import { CiCoffeeCup } from "react-icons/ci";
import { IoIosMore } from "react-icons/io";
import { useNavigate, useLocation } from "react-router-dom"
import { Table, ShoppingCart, Home } from 'lucide-react'
import React, { useState } from "react";
import Modal from "./Modal";
import { useDispatch } from "react-redux";
import { setCustomer } from "../../redux/slices/customerSlice";

const HeaderNav = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const dispatch = useDispatch();

    const [guestCount, setGuestCount] = useState(1);
    const increment = () => {
        setGuestCount((prev) => prev + 1);
    };

    const decrement = () => {
        if (guestCount > 1) {
            setGuestCount((prev) => prev - 1);
        }
    };

    const [ismodalOpen, setIsModalOpen] = useState(false);
    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    // tạo customer
    const [name, setName] = useState();
    const [phone, setPhone] = useState();

    // Hàm kiểm tra tab hiện tại
    const isActive = (path) => location.pathname === path;

    const handleCreateOrder = () => {
        // send the date to store
        dispatch(setCustomer({ name, phone, guests: guestCount }))
        navigate("/tables")
        closeModal();
    }

    return (
        <footer className="fixed left-0 right-0 p-5 h-[85px] flex justify-around border-t-2 shadow-xl bg-white z-50">
            <button
                onClick={() => navigate("/")}
                className={`flex items-center justify-center w-[250px] rounded-[20px] font-bold ${isActive("/") ? "text-white bg-[#A6CE39]" : "text-gray-700 hover:bg-gray-100"
                    }`}
            >
                <Home className="inline mr-2" size={20} />
                <p>Trang Chủ</p>
            </button>

            <button
                onClick={() => navigate("/Orders")}
                className={`flex items-center justify-center w-[250px] rounded-[20px] font-bold ${isActive("/Orders") ? "text-white bg-[#A6CE39]" : "text-gray-700 hover:bg-gray-100"
                    }`}
            >
                <ShoppingCart className="inline mr-2" size={20} />
                <p>Đơn Hàng</p>
            </button>

            <button
                disabled={isActive("/Tables") || isActive("/menu")}
                onClick={() => navigate("/Tables")}
                className={`flex items-center justify-center w-[250px] rounded-[20px] font-bold ${isActive("/Tables") ? "text-white bg-[#A6CE39]" : "text-gray-700 hover:bg-gray-100"
                    }`}
            >
                <Table className="inline mr-2" size={20} />
                <p>Bàn Đặt</p>
            </button>

            <button
                onClick={() => navigate("/")}
                className="flex items-center justify-center text-gray-700 w-[250px] rounded-[20px] font-bold hover:bg-gray-100"
            >
                <IoIosMore className="inline mr-2" size={20} />
                <p>Thêm</p>
            </button>

            <button
                onClick={openModal}
                disabled={isActive("/tables") || isActive("/menu")}
                className="absolute bottom-8 left-1/2 transform -translate-x-1/2 rounded-full text-[#f5f5f5] p-3 hover:bg-lime-500 border border-white border-opacity-30 shadow-lg bg-[#A6CE39]"
            >
                <CiCoffeeCup size={40} />
            </button>

            <Modal isOpen={ismodalOpen} onClose={closeModal} title="Tạo Bàn Đặt">
                <form onSubmit={(e) => { e.preventDefault(); /* xử lý form tại đây */ }} className="space-y-4 text-sm">

                    {/* Tên khách hàng */}
                    <div className="flex flex-col">
                        <label className="text-gray-900 font-medium mb-1">Tên khách hàng</label>
                        <input
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            type="text"
                            placeholder="Nhập tên..."
                            className="px-4 py-2 rounded bg-white text-gray-800 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#A6CE39]"
                            required
                        />
                    </div>

                    {/* Số điện thoại */}
                    <div className="flex flex-col">
                        <label className="text-gray-900 font-medium mb-1">Số điện thoại</label>
                        <input
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            type="tel"
                            placeholder="0123 456 789"
                            className="px-4 py-2 rounded bg-white text-gray-800 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#A6CE39]"
                            required
                        />
                    </div>

                    {/* Số khách */}
                    <div className="flex flex-col">
                        <label className="text-gray-900 font-medium mb-1">Số khách</label>
                        <div className="flex items-center gap-2">
                            <button
                                type="button"
                                onClick={decrement}
                                className="px-3 py-1 text-gray-700  rounded focus:outline-none focus:ring-2 focus:ring-[#A6CE39]"
                            >
                                &minus;
                            </button>

                            <input
                                type="number"
                                value={guestCount}
                                onChange={(e) => {
                                    const val = parseInt(e.target.value);
                                    if (!isNaN(val) && val >= 1) {
                                        setGuestCount(val);
                                    }
                                }}
                                min={1}
                                className="w-20 text-center py-1 rounded bg-white text-gray-800 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#A6CE39]"
                            />

                            <button
                                type="button"
                                onClick={increment}
                                className="px-3 py-1 text-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-[#A6CE39]"
                            >
                                &#43;
                            </button>
                        </div>
                    </div>

                    {/* Buttons */}
                    <div className="flex justify-end gap-4 pt-2">
                        <button
                            type="button"
                            onClick={closeModal}
                            className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
                        >
                            Huỷ
                        </button>
                        <button
                            onClick={handleCreateOrder}
                            type="submit"
                            className="px-5 py-2 bg-[#A6CE39] text-white rounded hover:brightness-110"
                        >
                            Xác nhận
                        </button>
                    </div>
                </form>
            </Modal>

        </footer>
    );
};

export default HeaderNav;
