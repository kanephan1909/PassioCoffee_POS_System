import logo from "../../assets/images/logo-2.png"
import { useNavigate } from "react-router-dom"
import { FaUserCircle } from "react-icons/fa"
import { Search, Bell, Table , ShoppingCart, Home } from 'lucide-react'


const Header = () => {

  const navigate = useNavigate();

  return (
    <header className="flex justify-between items-center px-8" style={{ background: 'linear-gradient(135deg, #A6CE39 0%, #8BC34A 25%, #7CB342 50%, #689F38 75%, #558B2F 100%)' }}>
      {/* LOGO */}
      <div>
        <img onClick={() => navigate("/")} src={logo} className="flex justify-start h-[7rem] cursor-pointer" alt="coffee logo" />
      </div>

      {/* SEARCH */}
      <div className="gap-4 px-5 py-2 mr-[200px] relative flex items-center">
        <Search className="absolute left-8 top-1/2 transform -translate-y-1/2 text-green-600 w-4 h-4" />
        <input
          type="text"
          placeholder="Tìm kiếm món"
          className="bg-white bg-opacity-90 text-green-800 placeholder-green-600 px-10 py-2 rounded-full w-[500px]"
        />
      </div>

      {/* LOGGER USER DETAILS */}
      <div className="flex items-center gap-4">
        <div className="rounded-[15px] p-3 cursor-pointer" >
          <Bell className="text-[#f5f5f5] text-2xl" />
        </div>
        <div className="flex items-center gap-3 cursor-pointer">
          <FaUserCircle className="text-[#f5f5f5] text-4xl" />
        </div>
        <div className="flex flex-col items-start">
          <h1 className="text-md text-[#f5f5f5] font-semibold">Kane Phan</h1>
          <p className="text-xs text-white opacity-70 font-medium">Admin</p>
        </div>
      </div>
    </header>
  )
}
export default Header
