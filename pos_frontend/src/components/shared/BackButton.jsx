import React from 'react'
import { IoArrowBackOutline } from 'react-icons/io5'
import { useNavigate } from "react-router-dom"


const BackButton = () => {

    const navigate = useNavigate();

    return (
        <button onClick={() => navigate(-1)} className='border-2 border-white bg-passio border-opacity-30 shadow-xl hover:shadow-2xl transition-all cursor-pointer group p-3 text-2xl font-bold rounded-full text-white'>
            <IoArrowBackOutline className/>
        </button>
    )
}

export default BackButton
