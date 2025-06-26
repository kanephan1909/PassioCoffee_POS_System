import { FaCoffee, FaSearch, FaUserCircle} from "react-icons/fa"
import { FaBell } from "react-icons/fa"
import { FaHome } from "react-icons/fa"
import { IoFastFood } from "react-icons/io5";
import { IoIosMore } from "react-icons/io";

const HeaderNav = () => {
  return (
    <header className="flex justify-between items-center py-2 px-5 bg-[#8CAA39]">
        {/* BUTTON */}
        <div className="top-0 left-0 right-0 p-3.5 h-[70px] flex ">
            <button className="flex items-center mr-10 justify-center text-[#f5f5f5] bg-[#A6CE39] w-[250px] rounded-[20px] font-bold" ><FaHome className="inline mr-2" size={20} /> <p>Trang Chủ</p></button>
            <button className="flex items-center mr-10 justify-center text-[#f5f5f5] w-[250px] rounded-[20px] font-bold" ><IoFastFood className="inline mr-2" size={20} /> <p>Đồ Ăn</p></button>
            <button className="flex items-center mr-10 justify-center text-[#f5f5f5] w-[250px] rounded-[20px] font-bold" ><FaCoffee className="inline mr-2" size={20} /><p>Đồ Uống</p></button>
            <button className="flex items-center mr-10 justify-center text-[#f5f5f5] w-[250px] rounded-[20px] font-bold" ><IoIosMore className="inline mr-2" size={20} /><p>Thêm</p></button>
        </div>
        {/* SEARCH */}
        <div className="flex items-center gap-2 bg-[#A6CE39] rounded-[15px] px-5 py-2 w-[435px] text-lg mr-20">
            <FaSearch className="text-[#f5f5f5]" />
            <input 
                type="text" 
                placeholder="Tìm kiếm món"
                className="text-[#f5f5f5] bg-[#A6CE39] outline-none placeholder-[#f5f5f5]"
            />
        </div>
        {/* LOGGER USER DETAILS */}
        <div className="flex items-center gap-4">
            <div className="bg-[#A6CE39] rounded-[15px] p-3 cursor-pointer">
                <FaBell className="text-[#f5f5f5] text-2xl" />
            </div>
            <div className="flex items-center gap-3 cursor-pointer">
                <FaUserCircle className="text-[#f5f5f5] text-4xl"/>
            </div>
            <div className="flex flex-col items-start">
                <h1 className="text-md text-[#f5f5f5] font-semibold">Kane Phan</h1>
                <p className="text-xs text-[#c4c4c4] font-medium">Admin</p>
            </div>
        </div>
    </header>
  )
}

export default HeaderNav
