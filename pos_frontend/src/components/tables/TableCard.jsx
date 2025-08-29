import React from "react";
import { useNavigate } from "react-router-dom";
import { getAvatarName, getBgColor } from "../../utils"
import { useDispatch } from "react-redux";
import { updateTable } from "../../redux/slices/customerSlice";

const TableCard = ({ id, name, status, initials, seats }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleClick = (name) => {
        if (status === "Booked") return;

        const table = { tableId: id, tableNo: name }
        dispatch(updateTable({ table }))
        navigate(`/menu`);
    };

    return (
        <div onClick={() => handleClick(name)} key={id} className={`w-[380px] bg-white border p-5 rounded-lg shadow-xl transition-all 
            duration-300 ease-in-out group flex flex-col justify-between min-h-[220px] 
            ${status === "Booked" ? "cursor-not-allowed opacity-70" : "cursor-pointer hover:bg-passio hover:shadow-lg"}`}>
            <div className="flex items-center justify-between px-1">
                <h1 className="text-gray-900 text-xl font-semibold">Bàn {name}</h1>
                <p className={`
                px-2 py-1 rounded-lg flex items-center gap-1 transition-colors duration-300
                ${status === "Trống" ? "bg-[#4CAF50]" : "bg-[#FFC107]"}
                text-gray-900 group-hover:text-white`}>
                    {status}
                </p>
            </div>
            <div className="flex items-center justify-center mt-6 mb-8">
                <h1 className={`text-gray-500 rounded-full p-6 text-xl`} style={{ backgroundColor: initials ? getBgColor() : "#1f1f1f" }} >{getAvatarName(initials) || "N/A"}</h1>
            </div>
            <p className="text-gray-900 text-xs">Seats: <span className="text-gray-500]">{seats}</span></p>
        </div>
    );
};

export default TableCard;