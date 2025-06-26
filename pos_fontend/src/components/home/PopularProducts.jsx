import React from 'react'
import { popularDrinks } from '../../constants'

const PopularProducts = () => {
  return (
    <div className='mt-6 pr-6'>
        <div className='bg-[#9CC039] w-full rounded-lg'>
            <div className='flex justify-between items-center px-6 py-4'>
                <h1 className='text-[#f5f5f5] text-lg font-semibold tracking-wide'>
                    Danh mục sản phẩm phổ biến
                </h1>
                <a href="" className='text-[#114e13] text-sm font-semibold'>
                    Xem Tất Cả
                </a>
            </div>

            <div className='overflow-y-scroll h-[600px] scrollbar-hide'>
                {
                    popularDrinks.map((items) =>{
                        return (
                            <div key = {items.id} className='flex items-center gap-4 bg-[#8CAA39] rounded-[15px] px-6 py-4 mt-3 mx-6'>
                                <h1 className='text-[#f5f5f5] font-bold text-xl mr-5'>{items.id < 10 ? `0${items.id}` : items.id}</h1>
                                <img src={items.image} alt={items.name} className='w-[50px] h-[50px] rounded-lg'/>
                                <div>
                                    <h1 className='text-[#f5f5f5] font-semibold tracking-wide'>{items.name}</h1>
                                    <p className='text-[#f5f5f5] font-sm'>Orders: <span>{items.numberOfOrders}</span></p>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    </div>
  )
}

export default PopularProducts
