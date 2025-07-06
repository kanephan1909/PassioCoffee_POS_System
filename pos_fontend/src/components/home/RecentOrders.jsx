import React from 'react'
import { Search } from 'lucide-react'
import OrderList from './OrderList'

const RecentOrders = () => {
    return (
        <div className='px-8 mt-6'>
            <div className='bg-white bg-opacity-15 backdrop-blur-sm w-full h-[480px] rounded-lg border border-white border-opacity-30 shadow-sm hover:shadow-xl transition-all cursor-pointer group'>
                <div className='flex justify-between items-center px-6 py-4'>
                    <h1 className='text-[#f5f5f5] text-lg font-semibold tracking-wide'>Đơn Hàng Gần Đây</h1>
                    <a href="" className='text-green-300 text-sm font-semibold'>Xem Tất Cả</a>
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
                    <Search className="absolute left-10 bottom-[255px] transform -translate-y-1/2 text-green-600 w-4 h-4" />
                    <input
                        type="text"
                        placeholder="Tìm kiếm đơn gần đây"
                        className="bg-white bg-opacity-90 text-green-800 placeholder-green-600 px-10 py-2 rounded-full w-full"
                    />
                </div>

                {/* Danh Sách Đơn Hàng */}
                <div className='mt-4 px-6 overflow-y-scroll h-[225px] scrollbar-hide'>
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