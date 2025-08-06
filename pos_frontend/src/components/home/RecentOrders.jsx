import React from 'react'
import { Search } from 'lucide-react'
import OrderList from './OrderList'

const RecentOrders = () => {
    return (
        <div className='px-8 mt-6'>
            <div className='bg-white backdrop-blur-sm w-full h-[480px] rounded-lg border border-gray-200 shadow-sm hover:shadow-xl transition-all cursor-pointer group'>
                <div className='flex justify-between items-center px-6 py-4'>
                    <h1 className='text-gray-900 text-lg font-semibold tracking-wide'>Đơn Hàng Gần Đây</h1>
                    <a href="" className='text-[#A6CE39] text-sm font-semibold'>Xem Tất Cả</a>
                </div>
                {/* <div className="flex items-center gap-3 bg-white bg-opacity-90 text-green-800 placeholder-green-600 rounded-[15px] px-6 py-2 mx-20 text-lg mr-20">
                    <FaSearch className="text-[#f5f5f5]" />
                    <input
                        type="text"
                        placeholder="Tìm kiếm đơn gần đây"
                        className="text-[#f5f5f5] bg-[#A6CE39] outline-none placeholder-[#f5f5f5]"
                    />
                </div> */}
                <div className="flex items-center gap-3 px-6 py-2">
                    <Search className="absolute left-10 bottom-[374px] transform -translate-y-1/2 text-gray-400  w-4 h-4" />
                    <input
                        type="text"
                        placeholder="Tìm kiếm đơn gần đây"
                        className="bg-gray-100 pl-10 pr-4 py-2 border-0 focus:outline-none focus:ring-2 focus:ring-lime-500 rounded-lg w-full"
                    />
                </div>

                {/* Danh Sách Đơn Hàng */}
                <div className='mt-4 px-6 overflow-y-scroll h-[320px] scrollbar-hide'>
                    <OrderList />
                    <OrderList />
                    <OrderList />
                    <OrderList />
                    <OrderList />
                    <OrderList />
                    <OrderList />
                    <OrderList />
                    <OrderList />
                    <OrderList />
                    <OrderList />
                    <OrderList />
                </div>
            </div>
        </div>
    )
}

export default RecentOrders