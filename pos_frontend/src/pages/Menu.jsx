import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import { PiCoffeeBold } from "react-icons/pi";

import BackButton from '../components/shared/BackButton';
import MenuContainer from '../components/menu/MenuContainer';
import CustomerInfo from '../components/menu/CustomerInfo';
import CartInfo from '../components/menu/CartInfo';
import Bill from '../components/menu/Bill';

import { addOrder, verifyPaymentZalopay, updateTable } from '../https';
import { useMutation } from '@tanstack/react-query';
import { removeCustomer } from '../redux/slices/customerSlice';
import { removeAllItems, getTotalPrice } from '../redux/slices/cartSlice';

const Menu = () => {
  const query = new URLSearchParams(window.location.search);
  const app_trans_id = query.get("apptransid");
  const [paymentProcessed, setPaymentProcessed] = React.useState(false);


  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const customerData = useSelector(state => state.customer);
  const total = useSelector(getTotalPrice);
  const tax = total * 0.1;
  const totalPriceWithTax = total + tax;

  // Mutation để tạo order
  const orderMutation = useMutation({
    mutationFn: (reqData) => addOrder(reqData),
    retry: 0,
    onSuccess: (resData) => {
      const { data } = resData.data;
      console.log(data);

      // Update Table
      const tableData = {
        status: "Booked",
        orderId: data._id,
        tableId: data.table,
      };

      setTimeout(() => {
        tableUpdateMutation.mutate(tableData);
      }, 1500);

      enqueueSnackbar("Order Placed!", {
        variant: "success",
      });
      // setShowInvoice(true);
    },
    onError: (error) => {
      console.log(error);
    },
  });

  // Mutation để cập nhật bàn
  const tableUpdateMutation = useMutation({
    mutationFn: (reqData) => updateTable(reqData),
    onSuccess: (resData) => {
      console.log(resData);
      dispatch(removeCustomer());
      dispatch(removeAllItems());
    },
    onError: (error) => {
      console.log(error);
    },
  });

  useEffect(() => {
    const checkPayment = async () => {
      if (!app_trans_id) return;

      try {
        const { data } = await verifyPaymentZalopay({ apptransid: app_trans_id });
        if (data.success) {
          enqueueSnackbar("Thanh toán thành công!", { variant: "success" });

          const savedCustomer = JSON.parse(localStorage.getItem("customerData"));
          const cartData = JSON.parse(localStorage.getItem("cartData"));

          const orderData = {
            customerDetails: {
              name: savedCustomer?.customerName,
              phone: savedCustomer?.customerPhone,
              guests: savedCustomer?.guests,
            },
            orderStatus: "In Progress",
            bills: { total, tax, totalWithTax: totalPriceWithTax },
            items: cartData,
            table: savedCustomer?.table?.tableId || null,
          };

          setPaymentProcessed(true); // đánh dấu đã xử lý

          setTimeout(() => orderMutation.mutate(orderData), 1000);
        } else {
          enqueueSnackbar("Thanh toán thất bại!", { variant: "error" });
          navigate("/menu", { replace: true });
        }
      } catch (err) {
        enqueueSnackbar("Lỗi khi xác thực thanh toán!", { variant: "error" });
        navigate("/menu", { replace: true });
      }
    };

  }, [app_trans_id, paymentProcessed]);


  return (
    <section className="bg-gray-50 h-[calc(100vh-12rem)] overflow-hidden flex gap-3">
      {/* Left Side */}
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
                Bàn {customerData.table?.tableNo || "Trống"}
              </p>
            </div>
          </div>
        </div>

        <MenuContainer />
      </div>

      {/* Right Side */}
      <div className='flex-[1] mt-4 mr-3 pt-2 h-[780px] rounded-lg bg-opacity-50 backdrop-blur-sm border border-gray-200 shadow-lg'>
        <CustomerInfo />
        <hr className='border-gray-300 border-t-2' />
        <CartInfo />
        <hr className='border-gray-300 border-t-2' />
        <Bill />
      </div>
    </section>
  );
};

export default Menu;
