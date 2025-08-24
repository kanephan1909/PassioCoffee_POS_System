import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from "react-router-dom";
import { Home, Auth, Orders, Tables, Menu } from "./pages";
import Header from "./components/shared/Header";
import HeaderNav from "./components/shared/HeaderNav";
import { useSelector } from "react-redux";
import useLoadData from "./hooks/useLoadData";
import FullScreenLoader from "./components/shared/FullScreenLoader";
import Dashboard from "./pages/Dashboard";
import PaymentSuccess from "./components/menu/PaymentSuccess";

function Layout() {
  const location = useLocation();
  const isLoading = useLoadData();
  const { isAuth } = useSelector(state => state.user);

  const hideHeaderRoutes = ["/auth"];
  // Ẩn HeaderNav ở /auth và /dashboard
  const hideHeaderNavRoutes = ["/auth", "/dashboard"];

  const shouldShowHeader = !hideHeaderRoutes.includes(location.pathname);
  const shouldShowHeaderNav = !hideHeaderNavRoutes.includes(location.pathname);

  if (isLoading) return <FullScreenLoader />

  return (
    <>
      {shouldShowHeader && <Header />}

      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoutes>
              <Home />
            </ProtectedRoutes>
          }
        />
        <Route path="/auth" element={isAuth ? <Navigate to="/" replace /> : <Auth />} />
        <Route
          path="/orders"
          element={
            <ProtectedRoutes>
              <Orders />
            </ProtectedRoutes>
          }
        />
        <Route
          path="/tables"
          element={
            <ProtectedRoutes>
              <Tables />
            </ProtectedRoutes>
          }
        />
        <Route
          path="/menu"
          element={
            <ProtectedRoutes>
              <Menu />
            </ProtectedRoutes>
          }
        />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoutes>
              <Dashboard />
            </ProtectedRoutes>
          }
        />
        <Route path="*" element={<div>Không tìm thấy</div>} />
      </Routes>

      {shouldShowHeaderNav && <HeaderNav />}
    </>
  );
}

function ProtectedRoutes({ children }) {
  const { isAuth } = useSelector(state => state.user);
  return isAuth ? children : <Navigate to="/auth" replace />;
}

function App() {
  return (
    <Router>
      <Layout />
    </Router>
  );
}

export default App;
