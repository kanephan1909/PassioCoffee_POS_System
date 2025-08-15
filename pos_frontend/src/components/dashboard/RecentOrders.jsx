import React, { useState } from "react";
import { IoReload } from "react-icons/io5";

const RecentOrders = () => {
    const statusOptions = ["Chờ xác nhận", "Đang giao", "Hoàn thành", "Đã hủy"];

    const [orders, setOrders] = useState([
        { id: 'ORD001', customer: 'Nguyễn Văn A', status: 'Hoàn thành', date: '2025-08-12', items: "8 món", tableNo: "Bàn - 8", total: '₫120,000' },
        { id: 'ORD002', customer: 'Trần Thị B', status: 'Đang giao', date: '2025-08-12', items: "5 món", tableNo: "Bàn - 3", total: '₫85,000' },
        { id: 'ORD003', customer: 'Lê Văn C', status: 'Chờ xác nhận', date: '2025-08-11', items: "3 món", tableNo: "Bàn - 5", total: '₫65,000' },
    ]);

    const [search, setSearch] = useState("");
    const [filterDate, setFilterDate] = useState("");

    const getStatusColor = (status) => {
        switch (status) {
            case 'Hoàn thành': return 'bg-green-100 text-green-700';
            case 'Đang giao': return 'bg-yellow-100 text-yellow-700';
            case 'Chờ xác nhận': return 'bg-red-100 text-red-700';
            case 'Đã hủy': return 'bg-gray-200 text-gray-700';
            default: return 'bg-gray-100 text-gray-700';
        }
    };

    const handleStatusChange = (id, newStatus) => {
        setOrders((prev) =>
            prev.map((order) =>
                order.id === id ? { ...order, status: newStatus } : order
            )
        );
    };

    const reloadStatus = (orderId) => {
        setOrders(prev =>
            prev.map(order => {
                if (order.id === orderId) {
                    const currentIndex = statusOptions.indexOf(order.status);
                    const nextIndex = (currentIndex + 1) % statusOptions.length;
                    return { ...order, status: statusOptions[nextIndex] };
                }
                return order;
            })
        );
    };

    const filteredOrders = orders.filter(order => {
        const matchSearch =
            order.customer.toLowerCase().includes(search.toLowerCase()) ||
            order.id.toLowerCase().includes(search.toLowerCase());
        const matchDate = filterDate ? order.date === filterDate : true;
        return matchSearch && matchDate;
    });

    return (
        <div className="container mx-auto py-4 px-6 md:px-4">
            <div className="flex flex-col md:flex-row gap-4 justify-between mb-4">
                <h2 className="text-lg font-semibold">Đơn hàng gần đây</h2>
                <div className="flex gap-2">
                    <input
                        type="date"
                        value={filterDate}
                        onChange={(e) => setFilterDate(e.target.value)}
                        className="border rounded px-3 py-1 text-sm"
                    />
                    <input
                        type="text"
                        placeholder="Tìm kiếm..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="border rounded px-3 py-1 text-sm"
                    />
                </div>
            </div>

            <table className="w-full border-collapse">
                <thead>
                    <tr className="border-b bg-gray-50">
                        <th className="py-3 px-4 text-left text-sm font-medium text-gray-600">Mã đơn</th>
                        <th className="py-3 px-4 text-left text-sm font-medium text-gray-600">Khách hàng</th>
                        <th className="py-3 px-4 text-left text-sm font-medium text-gray-600">Trạng thái</th>
                        <th className="py-3 px-4 text-left text-sm font-medium text-gray-600">Ngày</th>
                        <th className="py-3 px-4 text-left text-sm font-medium text-gray-600">Số món</th>
                        <th className="py-3 px-4 text-left text-sm font-medium text-gray-600">Số bàn</th>
                        <th className="py-3 px-4 text-left text-sm font-medium text-gray-600">Tổng tiền</th>
                        <th className="py-3 px-4 text-center text-sm font-medium text-gray-600">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredOrders.length > 0 ? (
                        filteredOrders.map((order) => (
                            <tr key={order.id} className="border-b hover:bg-gray-50">
                                <td className="py-3 px-4">{order.id}</td>
                                <td className="py-3 px-4">{order.customer}</td>
                                <td className="py-3 px-4">
                                    <select
                                        value={order.status}
                                        onChange={(e) => handleStatusChange(order.id, e.target.value)}
                                        className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)} border`}
                                    >
                                        {statusOptions.map((status) => (
                                            <option key={status} value={status}>
                                                {status}
                                            </option>
                                        ))}
                                    </select>
                                </td>
                                <td className="py-3 px-4">{order.date}</td>
                                <td className="py-3 px-4">{order.items}</td>
                                <td className="py-3 px-4">{order.tableNo}</td>
                                <td className="py-3 px-4">{order.total}</td>
                                <td className="py-3 px-4 text-center">
                                    <button
                                        onClick={() => reloadStatus(order.id)}
                                        className="px-3 py-1 text-blue-600 text-2xl hover:rotate-180 transition-transform duration-300"
                                    >
                                        <IoReload />
                                    </button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="8" className="py-4 text-center text-gray-500">
                                Không có đơn hàng phù hợp
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default RecentOrders;
