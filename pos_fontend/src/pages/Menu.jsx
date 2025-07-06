import React from 'react'
import BackButton from '../components/shared/BackButton'
import { PiCoffeeBold } from "react-icons/pi";
import MenuContainer from '../components/menu/MenuContainer';
import CustomerInfo from '../components/menu/CustomerInfo';
import CartInfo from '../components/menu/CartInfo';
import Bill from '../components/menu/Bill';


const Menu = () => {
  return (
    <section className="h-[calc(100vh-12rem)] overflow-hidden flex gap-3" style={{ background: 'linear-gradient(135deg, #A6CE39 0%, #8BC34A 25%, #7CB342 50%, #689F38 75%, #558B2F 100%)' }}>
      {/* Left div */}
      <div className='flex-[3]'>
        <div className="flex items-center justify-between px-10 py-4 mt-2">
          <div className="flex items-center gap-4">
            <BackButton />
            <h1 className="text-white text-2xl font-bold tracking-wider">Menu</h1>
          </div>
          <div className="flex items-center justify-around gap-4 text-white opacity-80" >
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-3 cursor-pointer">
                <PiCoffeeBold className="text-white text-4xl" />
              </div>
              <div className="flex flex-col items-start">
                <h1 className="text-base text-white font-semibold">Khách Hàng 1</h1>
                <p className="text-xs text-white font-medium">Bàn 1</p>
              </div>
            </div>
          </div>
        </div>
        <MenuContainer />

      </div>
      {/* Right div */}
      <div className='flex-[1] mt-4 mr-3 pt-2 h-[780px] rounded-lg bg-opacity-50 backdrop-blur-sm border border-white border-opacity-30 shadow-xl hover:shadow-2xl transition-all'>
        {/* Customer Info */}
        <CustomerInfo />

        <hr className='border-[#f5f5f5] opacity-50 border-t-2' />

        {/* Cart Items */}
        <CartInfo />

        <hr className='border-[#f5f5f5] opacity-50 border-t-2' />

        {/* Bills */}
        <Bill />

      </div>
    </section>
  )
}

export default Menu
