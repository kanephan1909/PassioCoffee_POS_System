import React from 'react'
import { FaCheckDouble, FaCircle } from 'react-icons/fa'

const OrderList = () => {
  return (
    <div className='flex items-center gap-6 mb-4'>
        <button className='bg-[#f6b100] p-3 text-x1 font-bold text-[#f5f5f5] rounded-lg'>AM</button>
        <div className='flex items-center justify-between w-[100%]'>
            <div>
                <h1 className='text-[#f5f5f5] text-lg font-semibold tracking-wide'>Phan Lam Nhat Khang</h1>
                <p className='text-[#ababab] text-sm'>8 Đơn Hàng</p>
            </div>
            <div>
                <h1 className='text-[#f6b100] font-semibold border-2 border-[#f6b100] rounded-lg p-2'>Mã Món Hàng: 3</h1>
            </div>
            <div className='flex flex-col items-start gap-2'>
                <p className='text-green-600 px-4'><FaCheckDouble className='inline mr-2'/>Sẵn Sàng</p>
                <p className='text-[#ababab] text-sm'><FaCircle className='inline mr-2 text-green-600'/>Sẵn Sàng Phục Vụ Món</p>
            </div>
        </div>
    </div>
  )
}

export default OrderList