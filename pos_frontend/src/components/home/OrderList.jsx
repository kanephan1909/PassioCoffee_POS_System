import React from 'react'
import { FaCircle } from 'react-icons/fa'
import { CheckCircle, MoreHorizontal } from 'lucide-react'

const OrderList = () => {
  return (
    <div className='flex items-center gap-6 mb-4'>
      {/* Nút AM */}
      <div className="w-14 h-14 bg-orange-100 rounded-full flex items-center justify-center">
        <button className='p-3 text-x1 font-bold text-orange-600 rounded-lg'>
          AM
        </button>
      </div>

      <div className='flex items-center justify-between w-full'>
        {/* Thông tin khách */}
        <div>
          <h1 className='text-gray-900 text-lg font-semibold tracking-wide'>
            Phan Lam Nhat Khang
          </h1>
          <p className='text-gray-500 text-sm'>8 Đơn Hàng</p>
        </div>

        {/* Mã món */}
        <div>
          <h1
            className='font-semibold rounded-full p-1.5 shadow-md border-2'
            style={{ backgroundColor: '#A6CE39', color: 'white' }}
          >
            Mã Đơn Hàng: 3
          </h1>
        </div>

        {/* Trạng thái */}
        <div className='flex items-center space-x-4'>
          <p className='text-gray-500'>
            <CheckCircle className='inline mr-2 text-green-500' />
            Sẵn Sàng
          </p>
          <div className='text-xs items-center text-gray-500'>2 phút trước</div>
          <MoreHorizontal className='inline mr-2 w-4 h-4 text-gray-400 cursor-pointer' />
        </div>
      </div>
    </div>
  )
}

export default OrderList
