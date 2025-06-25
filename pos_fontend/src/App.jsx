import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Home, Auth, Orders } from "./pages";
import Header from "./components/shared/Header";
import HeaderNav from "./components/shared/HeaderNav";

function App() {
  return (
    <Router>
      <Header />
      <HeaderNav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/orders" element={<Orders />} />
      </Routes>
    </Router>
  );
}

export default App;
