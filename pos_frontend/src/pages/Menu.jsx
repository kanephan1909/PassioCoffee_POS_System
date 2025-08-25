import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack'
import BackButton from '../components/shared/BackButton'
import { PiCoffeeBold } from "react-icons/pi";
import MenuContainer from '../components/menu/MenuContainer';
import CustomerInfo from '../components/menu/CustomerInfo';
import CartInfo from '../components/menu/CartInfo';
import Bill from '../components/menu/Bill';
import { verifyPaymentZalopay } from '../https/index';

const Menu = () => {
  const query = new URLSearchParams(window.location.search);
  const app_trans_id = query.get("apptransid");
  const status = query.get("status");

  const customerData = useSelector(state => state.customer);
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();

  useEffect(() => {
    const checkPayment = async () => {
      if (app_trans_id) {
        try {
          const { data } = await verifyPaymentZalopay({ apptransid: app_trans_id });
          if (data.success) {
            enqueueSnackbar("Thanh toán thành công!", { variant: "success" });
            // TODO: gọi API tạo Bill ở đây
          } else {
            enqueueSnackbar("Thanh toán thất bại!", { variant: "error" });
          }
        } catch (err) {
          enqueueSnackbar("Lỗi khi xác thực thanh toán!", { variant: "error" });
        } finally {
          // Xóa query string để tránh verify lại khi reload
          navigate("/menu", { replace: true });
        }
      }
    };
    checkPayment();
  }, [app_trans_id, enqueueSnackbar, navigate]);

  return (
    <section className="bg-gray-50 h-[calc(100vh-12rem)] overflow-hidden flex gap-3">
      {/* Left */}
      <div className='flex-[3]'>
        <div className="flex items-center justify-between px-10 py-4 mt-2">
          <div className="flex items-center gap-4">
            <BackButton />
            <h1 className="text-gray-900 text-2xl font-bold tracking-wider">Menu</h1>
          </div>
          <div className="flex items-center gap-4">
            <PiCoffeeBold className="text-gray-900 text-5xl" />
            <div>
              <h1 className="text-lg font-semibold text-gray-900">
                {customerData.customerName || "Customer Name"}
              </h1>
              <p className="text-sm font-medium text-gray-900">
                Bàn {customerData.tableNo || "Trống"}
              </p>
            </div>
          </div>
        </div>
        <MenuContainer />
      </div>

      {/* Right */}
      <div className='flex-[1] mt-4 mr-3 pt-2 h-[780px] rounded-lg bg-opacity-50 backdrop-blur-sm border border-gray-200 shadow-lg'>
        <CustomerInfo />
        <hr className='border-gray-300 border-t-2' />
        <CartInfo />
        <hr className='border-gray-300 border-t-2' />
        <Bill />
      </div>
    </section>
  )
}

export default Menu;
