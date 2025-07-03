import React from 'react'
import { FaCheckDouble } from 'react-icons/fa'
import { getRanDomBG } from '../../utils'

const TableCard = ({key, name,status, initials}) => {
    return (
        <div key={key} className='w-[350px] hover:bg-[#596d1d] border border-transparent hover:border-white bg-[#8CAA39] p-4 rounded-lg cursor-pointer'>
            <div className='flex items-center justify-between px-1'>
                <h1 className='text-[#f5f5f5] text-xl font-semibold'>{name}</h1>
                <p className={`${status === "Trống" ? "text-green-600 bg-[#51d35591]" : "bg-[#f0ff1e] text-[#000000]"} px-2 py-1 rounded-lg`}><FaCheckDouble className='inline mr-2' />{status}</p>
            </div>
            <div className='flex items-center justify-center mt-5 mb-5'>
                <h1 className={`${getRanDomBG()} text-white rounded-full p-5 text-xl`}>{initials}</h1>
            </div>
        </div>
    )
}

export default TableCard
