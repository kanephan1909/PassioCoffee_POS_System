import React, { useState, useEffect } from "react";
import {
  TrendingUp,
  Clock,
  CalendarDays,
  Layers,
  Coffee,
  ShoppingCart,
  UtensilsCrossed,
} from "lucide-react";

const Metrics = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [revenueData, setRevenueData] = useState({
    day: 0,
    month: 0,
    year: 0,
  });

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    // Giả lập dữ liệu doanh thu
    const randomRevenue = {
      day: Math.floor(Math.random() * 5000000) + 1000000,
      month: Math.floor(Math.random() * 50000000) + 10000000,
      year: Math.floor(Math.random() * 500000000) + 100000000,
    };
    setRevenueData(randomRevenue);
  }, [selectedDate]);

  const overallStats = [
    {
      label: "Doanh thu hôm nay",
      value: `₫${revenueData.day.toLocaleString()}`,
      icon: <TrendingUp className="w-6 h-6 text-green-500" />,
    },
    {
      label: "Doanh thu tháng",
      value: `₫${revenueData.month.toLocaleString()}`,
      icon: <TrendingUp className="w-6 h-6 text-blue-500" />,
    },
    {
      label: "Doanh thu năm",
      value: `₫${revenueData.year.toLocaleString()}`,
      icon: <TrendingUp className="w-6 h-6 text-purple-500" />,
    },
    {
      label: "Thời gian hiện tại",
      value: currentTime.toLocaleTimeString(),
      icon: <Clock className="w-6 h-6 text-orange-500" />,
    },
    {
      label: "Ngày hôm nay",
      value: currentTime.toLocaleDateString(),
      icon: <CalendarDays className="w-6 h-6 text-teal-500" />,
    },
  ];

  const itemDetails = [
    {
      label: "Tổng danh mục",
      value: 8,
      icon: <Layers className="w-6 h-6 text-purple-500" />,
    },
    {
      label: "Tổng món",
      value: 50,
      icon: <Coffee className="w-6 h-6 text-brown-500" />,
    },
    {
      label: "Tổng đơn hàng",
      value: 50,
      icon: <ShoppingCart className="w-6 h-6 text-green-500" />,
    },
    {
      label: "Bàn đang hoạt động",
      value: 12,
      icon: <UtensilsCrossed className="w-6 h-6 text-yellow-500" />,
    },
    {
      label: "Tổng số bàn",
      value: 10,
      icon: <UtensilsCrossed className="w-6 h-6 text-pink-500" />,
    },
  ];

  return (
    <div className="container mx-auto py-4 px-6 md:px-4">
      {/* Bộ chọn ngày */}
      <div className="flex items-center gap-4 mb-6">
        <label className="font-medium text-gray-700">
          Chọn ngày thống kê:
        </label>
        <input
          type="date"
          className="border border-gray-300 rounded-lg px-3 py-2 shadow-sm focus:ring focus:ring-blue-200"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
        />
      </div>

      {/* Overall Performance */}
      <h2 className="text-lg font-semibold mb-3">Overall Performance</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {overallStats.map((stat, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl shadow-md p-6 flex items-center justify-between hover:shadow-lg transition transform hover:-translate-y-1"
          >
            <div>
              <p className="text-sm text-gray-500">{stat.label}</p>
              <h2 className="text-2xl font-bold">{stat.value}</h2>
            </div>
            <div className="p-3 bg-gray-100 rounded-full">{stat.icon}</div>
          </div>
        ))}
      </div>

      {/* Item Details */}
      <h2 className="text-lg font-semibold mb-3">Item Details</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {itemDetails.map((item, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl shadow-md p-6 flex items-center justify-between hover:shadow-lg transition transform hover:-translate-y-1"
          >
            <div>
              <p className="text-sm text-gray-500">{item.label}</p>
              <h2 className="text-2xl font-bold">{item.value}</h2>
            </div>
            <div className="p-3 bg-gray-100 rounded-full">{item.icon}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Metrics;
