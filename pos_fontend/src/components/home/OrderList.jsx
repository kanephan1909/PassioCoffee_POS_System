import React from 'react'
import {FaCircle } from 'react-icons/fa'
import { CheckCircle } from 'lucide-react'

const OrderList = () => {
  return (
    <div className='flex items-center gap-6 mb-4'>
      {/* Nút AM */}
      <button
        className='p-3 text-x1 font-bold text-white rounded-lg shadow-md'
        style={{ background: 'linear-gradient(135deg, #FFA726, #FF7043)' }}
      >
        AM
      </button>

      <div className='flex items-center justify-between w-full'>
        {/* Thông tin khách */}
        <div>
          <h1 className='text-white text-lg font-semibold tracking-wide'>
            Phan Lam Nhat Khang
          </h1>
          <p className='text-orange-100 text-sm'>8 Đơn Hàng</p>
        </div>

        {/* Mã món */}
        <div>
          <h1
            className='font-semibold rounded-full p-1.5 text-orange-100 shadow-md border-2'
            style={{
              borderColor: 'linear-gradient(135deg, #FFA726, #FF7043)',
            }}
          >
            Mã Đơn Hàng: 3
          </h1>
        </div>

        {/* Trạng thái */}
        <div className='flex flex-col items-end gap-1'>
          <p className='text-green-300'>
            <CheckCircle  className='inline mr-2' />
            Sẵn Sàng
          </p>
          <p className='text-green-100 text-sm'>
            <FaCircle className='inline mr-1 text-green-500' />
            Sẵn Sàng Phục Vụ Món
          </p>
        </div>
      </div>
    </div>
  )
}

export default OrderList
