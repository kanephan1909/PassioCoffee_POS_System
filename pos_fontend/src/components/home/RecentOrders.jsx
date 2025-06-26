import React from 'react'
import { FaSearch } from 'react-icons/fa'
import OrderList from './OrderList'

const RecentOrders = () => {
  return (
    <div className='px-8 mt-6'>
        <div className='bg-[#8CAA39] w-full h-[640px] rounded-lg'>
            <div className='flex justify-between items-center px-6 py-4'>
                <h1 className='text-[#f5f5f5] text-lg font-semibold tracking-wide'>Đơn Hàng Gần Đây</h1>
                <a href="" className='text-[#114e13] text-sm font-semibold'>Xem Tất Cả</a>
            </div>
            <div className="flex items-center gap-2 bg-[#A6CE39] rounded-[15px] px-6 py-4 mx-20 text-lg mr-20">
                <FaSearch className="text-[#f5f5f5]" />
                <input 
                    type="text" 
                    placeholder="Tìm kiếm đơn gần đây"
                    className="text-[#f5f5f5] bg-[#A6CE39] outline-none placeholder-[#f5f5f5]"
                />
            </div>

            {/* Danh Sách Đơn Hàng */}
            <div className='mt-4 px-6 overflow-y-scroll h-[500px] scrollbar-hide'>
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