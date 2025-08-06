import { CheckCircle } from 'lucide-react'
import React from 'react'
import { FaCircle } from 'react-icons/fa'


const OrderCard = () => {
    return (
        <div className='w-[480px] p-4 rounded-lg bg-white backdrop-blur-sm border order border-gray-200 shadow-xl hover:shadow-2xl transition-all cursor-pointer group'>
            <div className='flex items-center gap-5'>
                <button className='p-3 text-x1 font-bold text-[#f5f5f5] rounded-lg' style={{
                    borderColor: '#FFA726',
                    background: 'linear-gradient(135deg, #FFA726, #FF7043)',
                }}>Staff</button>
                <div className='flex items-center justify-between w-[100%]'>
                    <div>
                        <h1 className='text-gray-900 text-lg font-semibold tracking-wide'>Nhat Khang</h1>
                    </div>

                    <div className='flex flex-col items-end gap-2'>
                        <p className='text-green-600 bg-[#51d35591] px-2 py-1 rounded-lg'><CheckCircle className='inline mr-2' />Sẵn Sàng</p>
                        <p className='text-gray-500 text-sm'><FaCircle className='inline mr-1 text-green-600' />Sẵn Sàng Phục Vụ Món</p>
                    </div>
                </div>
            </div>
            <div className='flex justify-between items-center mt-4 text-gray-900'>
                <p>18 Tháng 5, 2025 - 08:30 AM</p>
                <p>8 đơn hàng</p>
            </div>
            <hr className='text-[#cfcece] w-full mt-4' />
            <div className='flex items-center justify-between mt-4'>
                <h1 className='text-gray-900 text-lg font-bold'>Total</h1>
                <p className='text-gray-500 text-lg fontsem'>350.000đ</p>
            </div>
        </div>
    )
}

export default OrderCard
