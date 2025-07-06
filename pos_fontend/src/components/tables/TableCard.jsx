import React from 'react'
import { FaCheckDouble } from 'react-icons/fa'
import { getRanDomBG } from '../../utils'
import { useNavigate } from 'react-router-dom'

const TableCard = ({key, name,status, initials}) => {

    const navigate = useNavigate();
    const handleClick = () => {
        if(status === "Booked") return;
        navigate(`/menu`)
    }

    return (
        <div onClick={handleClick} key={key} className='w-[390px] bg-white bg-opacity-15 backdrop-blur-sm border border-transparent hover:border-white p-5 rounded-lg border-white border-opacity-30 shadow-xl hover:shadow-lg transition-all cursor-pointer group'>
            <div className='flex items-center justify-between px-1'>
                <h1 className='text-[#f5f5f5] text-xl font-semibold'>{name}</h1>
                <p className={`${status === "Trống" ? "text-[#ffff] bg-[#4CAF50]" : "bg-[#FFC107] text-[#fffff]"} px-2 py-1 rounded-lg`}><FaCheckDouble className='inline mr-2' />{status}</p>
            </div>
            <div className='flex items-center justify-center mt-5 mb-5'>
                <h1 className={`${getRanDomBG()} text-white rounded-full p-5 text-xl`}>{initials}</h1>
            </div>
        </div>
    )
}

export default TableCard
