import logo from "../../assets/images/logo.png"

const Header = () => {
  return (
    <header className="flex justify-between items-center bg-[#A6CE39]">
        {/* LOGO */}
        <div>
            <img src={logo} className="flex justify-start h-[8rem]" alt="coffee logo" />
        </div>
    </header>
  )
}
export default Header
