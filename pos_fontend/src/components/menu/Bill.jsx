import React from 'react'

const Bill = () => {
  return (
    <>
      <div className='flex items-center justify-between px-5 mt-2'>
        <p className='text-xs text-gray-900 font-medium mt-2'>Item(4)</p>
        <h1 className='text-gray-900 text-sm font-bold'>240.000đ</h1>
      </div>
      <div className='flex items-center justify-between px-5 mt-2'>
        <p className='text-xs text-white font-medium mt-2'>Tax(5.25%)</p>
        <h1 className='text-gray-900text-sm font-bold'>240đ</h1>
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
  