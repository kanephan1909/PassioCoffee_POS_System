import React from 'react'
import { useSelector } from 'react-redux'
import { getTotalPrice } from '../../redux/slices/cartSlice';

const Bill = () => {

  const cartData = useSelector(state => state.cart);
  const total = useSelector(getTotalPrice);
  const taxRate = 5.25;
  const tax = (total * taxRate) / 100
  const totalPriceWithTax = total + tax;

  const totalItems = cartData.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <>
      <div className='flex items-center justify-between px-5 mt-2'>
        <p className='text-sm text-gray-900 font-medium mt-2'>Item({totalItems})</p>
        <h1 className='text-gray-900 text-sm font-bold'>{total}đ</h1>
      </div>
      <div className='flex items-center justify-between px-5 mt-2'>
        <p className='text-sm text-gray-900 font-medium mt-2'>Tax(5.25%)</p>
        <h1 className='text-gray-900 text-sm font-bold'>{tax}đ</h1>
      </div>
      <div className='flex items-center justify-between px-5 mt-2'>
        <p className='text-sm text-gray-900 font-medium mt-2'>Total with tax</p>
        <h1 className='text-gray-900 text-sm font-bold'>{totalPriceWithTax}đ</h1>
      </div>
      <div className='flex items-center gap-3 px-5 mt-4'>
        <button className='border border-gray-500 px-4 py-3 w-full rounded-lg text-gray-900 font-semibold text-lg'>Cash</button>
        <button className='border border-gray-500 px-4 py-3 w-full rounded-lg text-gray-900 font-semibold text-lg'>Online</button>
      </div>

      <div className='flex items-center gap-3 px-5 mt-4'>
        <button className='bg-blue-700 border border-gray-100 px-4 py-3 w-full rounded-lg text-white font-semibold text-lg'>In Bill</button>
        <button className='bg-yellow-500 border border-gray-100 px-4 py-3 w-full rounded-lg text-white font-semibold text-lg'>Place Order</button>
      </div>
    </>
  )
}

export default Bill
