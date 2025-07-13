import React from 'react'
import { FaCheckDouble } from 'react-icons/fa'
import { getRanDomBG } from '../../utils'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { updateTable } from '../../redux/slices/customerSlice'

const TableCard = ({ cardKey, name, status, initials }) => {

    const dispatch = useDispatch();
    const navigate = useNavigate()

    const handleClick = (name) => {
        if (status === "Booked") return
        dispatch(updateTable({tableNo: name}))
        navigate(`/menu`)
    }

    return (
        <div
            onClick={() => handleClick(name)}
            key={cardKey}
            className={`
            w-[380px] bg-white border p-5 rounded-lg shadow-xl transition-all duration-300 ease-in-out group
            ${status === "Booked" ? "cursor-not-allowed opacity-70" : "cursor-pointer hover:bg-passio hover:shadow-lg"}
        `}
        >
            <div className="flex items-center justify-between px-1">
                <h1 className="text-gray-900 text-xl font-semibold transition-colors duration-300 group-hover:text-white">
                    {name}
                </h1>
                <p className={`
          px-2 py-1 rounded-lg flex items-center gap-1 transition-colors duration-300
          ${status === "Trống" ? "bg-[#4CAF50]" : "bg-[#FFC107]"}
          text-white group-hover:text-white
        `}>
                    <FaCheckDouble className="inline" />
                    {status}
                </p>
            </div>

            <div className="flex items-center justify-center mt-5 mb-5">
                <h1 className={`${getRanDomBG()} text-white rounded-full p-5 text-xl transition-colors duration-300 group-hover:text-white`}>
                    {initials}
                </h1>
            </div>
        </div>
    )
}

export default TableCard
