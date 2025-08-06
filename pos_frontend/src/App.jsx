import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Home, Auth, Orders, Tables, Menu } from "./pages";
import Header from "./components/shared/Header";
import HeaderNav from "./components/shared/HeaderNav";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/tables" element={<Tables />} />
        <Route path="/menu" element={<Menu/>} />
        <Route path="*" element={<div>Không tim thấy</div>} />
      </Routes>
      <HeaderNav />
    </Router>
  );
}

export default App;
