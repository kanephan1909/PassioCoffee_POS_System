import React from 'react'
import { FaNotesMedical } from "react-icons/fa6";
import { RiDeleteBin2Fill } from "react-icons/ri";


const CartInfo = () => {
    return (
        <div className='px-4 py-2'>
            <h1 className='text-lg text-white font-semibold tracking-wide'>
                Chi Tiết Món Hàng
            </h1>
            <div className='mt-4 overflow-y-scroll scrollbar-hide h-[380px] backdrop-blur-sm'>
                <div className='bg-white bg-opacity-15 backdrop-blur-sm border border-white border-opacity-30 shadow-xl hover:shadow-2xl transition-all cursor-pointer group rounded-lg px-4 py-4 mb-2'>
                    <div className='flex items-center justify-between'>
                        <h1 className='text-white font-semibold tracking-wide text-sm'>
                            Espresso Sữa Đá
                        </h1>
                        <p className='text-white font-semibold'>x2</p>
                    </div>
                    <div className='flex items-center justify-between mt-3'>
                        <div className='flex items-center gap-3'>
                            <RiDeleteBin2Fill className='text-[#f5f5f5] cursor-pointer' size={20} />
                            <FaNotesMedical className='text-[#f5f5f5] cursor-pointer' size={20} />
                        </div>
                        <p className='text-[#f5f5f5] text-base font-bold'>48.000đ</p>
                    </div>
                </div>

                <div className='bg-white bg-opacity-15 backdrop-blur-sm border border-white border-opacity-30 shadow-xl hover:shadow-2xl transition-all cursor-pointer group rounded-lg px-4 py-4 mb-2'>
                    <div className='flex items-center justify-between'>
                        <h1 className='text-white font-semibold tracking-wide text-sm'>
                            Espresso Đá
                        </h1>
                        <p className='text-white font-semibold'>x2</p>
                    </div>
                    <div className='flex items-center justify-between mt-3'>
                        <div className='flex items-center gap-3'>
                            <RiDeleteBin2Fill className='text-[#f5f5f5] cursor-pointer' size={20} />
                            <FaNotesMedical className='text-[#f5f5f5] cursor-pointer' size={20} />
                        </div>
                        <p className='text-[#f5f5f5] text-base font-bold'>50.000đ</p>
                    </div>
                </div>

                <div className='bg-white bg-opacity-15 backdrop-blur-sm border border-white border-opacity-30 shadow-xl hover:shadow-2xl transition-all cursor-pointer group rounded-lg px-4 py-4 mb-2'>
                    <div className='flex items-center justify-between'>
                        <h1 className='text-white font-semibold tracking-wide text-sm'>
                            Espresso Bạc Xỉu
                        </h1>
                        <p className='text-white font-semibold'>x1</p>
                    </div>
                    <div className='flex items-center justify-between mt-3'>
                        <div className='flex items-center gap-3'>
                            <RiDeleteBin2Fill className='text-[#f5f5f5] cursor-pointer' size={20} />
                            <FaNotesMedical className='text-[#f5f5f5] cursor-pointer' size={20} />
                        </div>
                        <p className='text-[#f5f5f5] text-base font-bold'>29.000đ</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CartInfo
