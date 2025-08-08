import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { Home, Auth, Orders, Tables, Menu } from "./pages";
import Header from "./components/shared/Header";
import HeaderNav from "./components/shared/HeaderNav";


function Layout() {

  const location = useLocation();
  const hideHeaerRoutes = ["/auth"];

  return (
    <>
      {!hideHeaerRoutes.includes(location.pathname) && <Header />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/tables" element={<Tables />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="*" element={<div>Không tim thấy</div>} />
      </Routes>
      {!hideHeaerRoutes.includes(location.pathname) && <HeaderNav />}
    </>
  );

}

function App() {
  return (
    <Router>
      <Layout />
    </Router>
  )
}

export default App;
