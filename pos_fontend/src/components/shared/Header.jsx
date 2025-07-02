import logo from "../../assets/images/logo.png"
import { useNavigate } from "react-router-dom"


const Header = () => {

  const navigate = useNavigate();

  return (
    <header className="flex justify-between items-center bg-[#A6CE39]">
      {/* LOGO */}
      <div>
        <img onClick={() => navigate("/")} src={logo} className="flex justify-start h-[8rem] cursor-pointer" alt="coffee logo" />
      </div>
    </header>
  )
}
export default Header
