import React from 'react'

const MiniCard = ({ title, icon, number, footerNum }) => {
  const isRevenue = title === "Doanh Thu Bán Hàng";

  return (
    <div className='bg-white bg-opacity-15 backdrop-blur-sm py-5 px-5 rounded-lg w-full md:w-[50%] border border-white border-opacity-30 shadow-xl hover:shadow-2xl transition-all cursor-pointer group'>
      <div className='flex items-start justify-between'>
        <h1 className='text-[#f5f5f5] text-lg font-semibold tracking-wide'>{title}</h1>
        <button
          className='p-3 rounded-lg text-[#f5f5f5] text-2xl shadow-md'
          style={{
            background: isRevenue
              ? 'linear-gradient(135deg, #66BB6A, #43A047)'
              : 'linear-gradient(135deg, #FFA726, #FF7043)',
          }}
        >
          {icon}
        </button>
      </div>
      <div>
        <h1 className='text-[#f5f5f5] text-4xl font-bold mt-5'>
          {title === "Tổng tiền" ? `${number}đ` : number}
        </h1>
        <h1 className='text-[#f5f5f5] text-lg mt-2'>
          <span className='text-[#02ca3a]'>{footerNum}%</span> hơn ngày hôm qua
        </h1>
      </div>
    </div>
  )
}

export default MiniCard
