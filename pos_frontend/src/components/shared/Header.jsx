import logo from "../../assets/images/logo-3.png";
import { useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import { Search, Bell, Table , ShoppingCart, Home } from 'lucide-react';
import { useDispatch, useSelector } from "react-redux";
import { LuLogOut } from "react-icons/lu";
import { useMutation } from "@tanstack/react-query";
import { removeUser } from "../../redux/slices/userSlice";
import { logout } from "../../https";


const Header = () => {

  const userData = useSelector(state => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const logoutMutation = useMutation({
    mutationFn: () => logout(),
    onSuccess: (data) => {
      console.log(data);
      dispatch(removeUser());
      navigate("/auth"); 
    },
    onError: (erorr) => {
      console.log(erorr);
    }
  })
  const handleLogout = () => {
    logoutMutation.mutate();
  }

  return (
    <header className="flex justify-between items-center px-8 border-b-2">
      {/* LOGO */}
      <div>
        <img onClick={() => navigate("/")} src={logo} className="flex justify-start h-[7rem] cursor-pointer" alt="coffee logo" />
      </div>

      {/* SEARCH */}
      <div className="gap-4 px-5 py-2 mr-[200px] relative flex items-center">
        <Search className="absolute left-8 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
        <input
          type="text"
          placeholder="Tìm kiếm món"
          className="bg-gray-100 px-10 py-2 rounded-full w-[500px] border-0 focus:outline-none focus:ring-2 focus:ring-lime-500"
        />
      </div>

      {/* LOGGER USER DETAILS */}
      <div className="flex items-center gap-4">
        <div className="rounded-[15px] p-3 cursor-pointer" >
          <Bell className="text-[#A6CE39] text-4xl" />
        </div>
        <div className="flex items-center gap-3 cursor-pointer">
          <FaUserCircle className="text-[#A6CE39] text-4xl" />
        </div>
        <div className="flex flex-col items-start">
          <h1 className="text-md text-gray-900 font-semibold">{userData.name || "User"}</h1>
          <p className="text-xs text-gray-500 opacity-70 font-medium">{userData.role || "N/A"}</p>
        </div>
        <LuLogOut onClick={handleLogout} className="text-[#A6CE39] text-4xl ml-2 cursor-pointer" />
      </div>
    </header>
  )
}
export default Header
