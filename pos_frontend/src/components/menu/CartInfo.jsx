import React, { useRef, useEffect } from 'react';
import { FaNotesMedical } from "react-icons/fa6";
import { RiDeleteBin2Fill } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { removeItem } from '../../redux/slices/cartSlice';
import { formatVND } from '../../utils';

const CartInfo = () => {
    const cartDate = useSelector(state => state.cart);
    const scrolLRef = useRef();
    const dispatch = useDispatch();

    const handleRemove = (itemId) => {
        dispatch(removeItem(itemId))
    }

    // Hiệu ứng xuống dòng khi thêm món vào cart
    useEffect(() => {
        if (scrolLRef.current) {
            scrolLRef.current.scrollTo({
                top: scrolLRef.current.scrollHeight,
                behavior: "smooth"
            })
        }
    }, [cartDate]);

    return (
        <div className='px-4 py-2'>
            <h1 className='text-xl text-gray-900 font-semibold tracking-wide'>
                Chi Tiết Món Hàng
            </h1>
            <div className='mt-5 overflow-y-scroll scrollbar-hide h-[340px]' ref={scrolLRef}>
                {cartDate.length === 0 ? (
                    <p></p>
                ) : cartDate.map((item) => {
                    return (
                        <div key={item.id} className='bg-white bg-opacity-15 backdrop-blur-sm border border-text-gray-500 shadow-xl hover:shadow-2xl transition-all cursor-pointer group rounded-lg px-4 py-4 mb-2'>
                            <div className='flex items-center justify-between'>
                                <h1 className='text-gray-900 font-semibold tracking-wide text-base'>
                                    {item.name}
                                </h1>
                                <p className='text-gray-900 font-semibold'>x{item.quantity}</p>
                            </div>
                            <div className='flex items-center justify-between mt-3'>
                                <div className='flex items-center gap-3'>
                                    <RiDeleteBin2Fill onClick={() => handleRemove(item.id)} className='text-gray-500 cursor-pointer hover:text-passio transition' size={20} />
                                    <FaNotesMedical className='text-gray-500 cursor-pointer' size={20} />
                                </div>
                                <p className='text-gray-500 text-base font-bold'>
                                    {formatVND(item.price)}
                                </p>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default CartInfo;
