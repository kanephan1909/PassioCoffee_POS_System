import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import { RiDeleteBin2Fill } from "react-icons/ri";
import { PiCoffeeBold } from "react-icons/pi";
import { FaNotesMedical } from "react-icons/fa6";
import { getAvatarName } from '../../utils';
import { formatDate } from '../../utils';

const CustomerInfo = () => {
    const [dateTime, setDeateTime] = useState(new Date());

    const customerDate = useSelector(state => state.customer)

    return (
        <div className='flex items-center justify-between px-4 py-2'>
            <div className='flex flex-col items-start'>
                <h1 className='text-xl text-gray-900 font-bold tracking-wide'>{customerDate.customerName || "Customer Name"}</h1>
                <p className='text-base text-gray-900 font-medium mt-1'>#{customerDate.orderId || "N/A"} / Đang Làm</p>
                <p className='text-base text-gray-900 font-medium mt-1'>{formatDate(dateTime)}</p>
            </div>
            <button className='p-3 text-xl font-bold rounded-lg' style={{
                color: 'white',
                borderColor: '#FFA726',
                background: 'linear-gradient(135deg, #FFA726, #FF7043)',
            }}>{getAvatarName(customerDate.customerName) || "CN"}</button>
        </div>
    )
}

export default CustomerInfo
