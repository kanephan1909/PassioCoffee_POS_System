import React, { useState } from 'react'
import { menus } from '../../constants/menu'
import { GrRadialSelected } from "react-icons/gr";


const MenuContainer = () => {

    const [itemCount, setItemCount] = useState(0);
    const [itemId, setItemId] = useState();
    const [selected, setSelected] = useState(menus[0]);
    const [sizeSelections, setSizeSelections] = useState({});


    const increment = (id) => {
        setItemId(id);
        if (itemCount >= 100) return;
        setItemCount((prev) => prev + 1);
    }
    const decrement = (id) => {
        setItemId(id);
        if (itemCount <= 0) return;
        setItemCount((prev) => prev - 1);
    }

    const handleSizeChange = (id, size) => {
        setSizeSelections((prev) => {
            // nếu đã chọn size này rồi => bỏ chọn
            if (prev[id] === size) {
                const updated = { ...prev };
                delete updated[id];
                return updated;
            } else {
                return {
                    ...prev,
                    [id]: size,
                };
            }
        });
    };


    return (
        <>
            <div className='grid grid-cols-4 gap-4 px-10 py-4 w-[100%]'>
                {
                    menus.map((menu) => {
                        return (
                            <div key={menu.id} className='flex flex-col items-start justify-between p-4 rounded-lg h-[100px] cursor-pointer'
                                style={{ backgroundColor: menu.bgColor }}
                                onClick={() => {
                                    setSelected(menu);
                                    setItemId(0);
                                    setItemCount(0);
                                }}
                            >
                                <div className='flex items-center justify-between w-full'>
                                    <h1 className='text-[#f5f5f5] text-lg font-semibold'>{menu.icon} {menu.name}</h1>
                                    {selected.id === menu.id && <GrRadialSelected className='text-white' size={20} />}
                                </div>
                                <p className='text-white opacity-70 text-sm font-semibold'>{menu.items.length} Món</p>
                            </div>
                        )
                    })
                }
            </div>

            <hr className='border-[#f5f5f5] opacity-50 border-t-2 mt-4' />

            <div className='grid grid-cols-4 gap-4 px-10 py-4 w-[100%] overflow-y-scroll scrollbar-hide h-[calc(100vh-30rem)]'>
                {
                    selected?.items.map((menu) => {
                        return (
                            <div key={menu.id} className='flex flex-col items-start justify-between p-4 rounded-lg h-[150px] bg-[#A6CE39] bg-opacity-50 backdrop-blur-sm border border-white border-opacity-30 shadow-xl hover:shadow-2xl transition-all cursor-pointer'
                            >
                                <h1 className='text-white text-lg font-semibold'>{menu.name}</h1>
                                <p className='text-white text-lg font-bold'>
                                    S: {menu.price?.S} | M: {menu.price?.M} | L: {menu.price?.L}
                                </p>
                                <div className='flex items-center justify-between w-full'>

                                    <div className="flex gap-2 my-1">
                                        {["S", "M", "L"].map((size) => (
                                            <button
                                                key={size}
                                                onClick={() => handleSizeChange(menu.id, size)}
                                                className={`px-2 py-1 rounded text-sm ${sizeSelections[menu.id] === size
                                                    ? "bg-green-500 text-white"
                                                    : "bg-white bg-opacity-20 text-white"
                                                    }`}
                                            >
                                                {size}
                                            </button>
                                        ))}
                                    </div>
                                    <div className='flex items-center justify-between border bg-white bg-opacity-15 px-2 py-1 rounded-lg gap-6 z-20'>
                                        <button
                                            onClick={() => decrement(menu.id)}
                                            className='text-green-200 text-2xl'>
                                            &minus;
                                        </button>
                                        <span className='text-white'>{menu.id === itemId ? itemCount : "0"}</span>
                                        <button
                                            onClick={() => increment(menu.id)}
                                            className='text-green-200 text-2xl'>
                                            &#43;
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </>
    )
}

export default MenuContainer
