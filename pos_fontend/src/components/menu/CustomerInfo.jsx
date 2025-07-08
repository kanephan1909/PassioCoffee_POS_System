import React from 'react'
import { RiDeleteBin2Fill } from "react-icons/ri";
import { PiCoffeeBold } from "react-icons/pi";
import { FaNotesMedical } from "react-icons/fa6";

const CustomerInfo = () => {
    return (
        <div className='flex items-center justify-between px-4 py-2'>
            <div className='flex flex-col items-start'>
                <h1 className='text-base text-gray-900 font-semibold tracking-wide'>Customer Name</h1>
                <p className='text-sm text-gray-900 font-medium mt-1'>#101/Đang Làm</p>
                <p className='text-sm text-gray-900 font-medium mt-1'>19/05/2025 - 05:34 AM</p>
            </div>
            <button className='p-3 text-xl font-bold rounded-lg' style={{
                borderColor: '#FFA726',
                background: 'linear-gradient(135deg, #FFA726, #FF7043)',
            }}>CN</button>
        </div>
    )
}

export default CustomerInfo
