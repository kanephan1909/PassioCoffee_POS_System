import React from 'react'
import BackButton from '../components/shared/BackButton'
import { PiCoffeeBold } from "react-icons/pi";
import MenuContainer from '../components/menu/MenuContainer';
import CustomerInfo from '../components/menu/CustomerInfo';
import CartInfo from '../components/menu/CartInfo';
import Bill from '../components/menu/Bill';
import { useSelector } from 'react-redux';


const Menu = () => {

  const  customerDate = useSelector(state => state.customer)

  return (
    <section className="bg-gray-50 h-[calc(100vh-12rem)] overflow-hidden flex gap-3">
      {/* Left div */}
      <div className='flex-[3]'>
        <div className="flex items-center justify-between px-10 py-4 mt-2">
          <div className="flex items-center gap-4">
            <BackButton />
            <h1 className="text-gray-900 text-2xl font-bold tracking-wider">Menu</h1>
          </div>
          <div className="flex items-center justify-around gap-4 text-white opacity-80" >
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-3 cursor-pointer">
                <PiCoffeeBold className="text-gray-900 text-5xl" />
              </div>
              <div className="flex flex-col items-start">
                <h1 className="text-lg text-gray-900 font-semibold">{customerDate.customerName || "Customer Name"}</h1>
                <p className="text-sm text-gray-900 font-medium">{customerDate.tableNo || "Bàn Trống"}</p>
              </div>
            </div>
          </div>
        </div>
        <MenuContainer />

      </div>
      {/* Right div */}
      <div className='flex-[1] mt-4 mr-3 pt-2 h-[780px] rounded-lg bg-opacity-50 backdrop-blur-sm border border-gray-200 shadow-lg hover:shadow-2xl transition-all'>
        {/* Customer Info */}
        <CustomerInfo />

        <hr className='border-gray-300 border-t-2' />

        {/* Cart Items */}
        <CartInfo />

        <hr className='border-gray-300 border-t-2' />

        {/* Bills */}
        <Bill />

      </div>
    </section>
  )
}

export default Menu
