import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { getTotalPrice } from '../../redux/slices/cartSlice'
import { formatVND } from '../../utils'
import { enqueueSnackbar } from 'notistack'
import { createOrderZalopay, verifyPaymentZalopay } from '../../https'

const Bill = () => {
  const cartData = useSelector(state => state.cart)
  const total = useSelector(getTotalPrice); // trả về VND thật luôn
  const taxRate = 5.25
  const tax = (total * taxRate) / 100;
  const totalPriceWithTax = Math.round(total + tax);

  // convert sang VND thật
  const totalItems = cartData.reduce((sum, item) => sum + item.quantity, 0)

  const customerData = useSelector((state) => state.customer)
  const [paymentMethod, setPaymentMethod] = useState(null)

  const handleCheckout = async () => {
    if (!customerData.customerName || !customerData.customerPhone) {
      enqueueSnackbar("Vui lòng nhập thông tin khách hàng (tên & số điện thoại)", { variant: "warning" });
      return;
    }

    if (!customerData.table?.tableId) {
      enqueueSnackbar("Vui lòng chọn bàn trước khi tạo đơn hàng", { variant: "warning" });
      return;
    }

    if (!paymentMethod) {
      enqueueSnackbar("Vui lòng chọn phương thức thanh toán", { variant: "warning" });
      return;
    }

    if (paymentMethod === "cash") {
      // xử lý cash
      const orderData = {
        customerDetails: {
          name: customerData.customerName,
          phone: customerData.customerPhone,
          guests: customerData.guests,
        },
        orderStatus: "In Progress",
        bills: {
          total: total,
          tax,
          totalWithTax: totalPriceWithTax,
        },
        items: cartData,
        table: customerData.table?.tableId,
        paymentMethod: "cash",
      };

      console.log("Order Data (Cash):", orderData);

      await saveOrderToDB(orderData); // gọi API lưu đơn hàng
      enqueueSnackbar("Đơn hàng đã được tạo (Thanh toán tiền mặt)", { variant: "success" });
    } else {
      // online -> gọi hàm cũ
      await handleOnlinePayment();
    }
  };


  const handleOnlinePayment = async () => {
    try {
      if (!customerData.customerName || !customerData.customerPhone) {
        enqueueSnackbar("Vui lòng nhập thông tin khách hàng (tên & số điện thoại)", { variant: "warning" });
        return;
      }

      if (!customerData.table?.tableId) {
        enqueueSnackbar("Vui lòng chọn bàn trước khi tạo đơn hàng", { variant: "warning" });
        return;
      }

      if (!paymentMethod) {
        enqueueSnackbar("Vui lòng chọn phương thức thanh toán", { variant: "warning" });
        return;
      }

      // Lưu vào localStorage trước khi redirect
      localStorage.setItem("customerData", JSON.stringify(customerData));
      localStorage.setItem("cartData", JSON.stringify(cartData));


      // Gọi API tạo giao dịch Zalopay
      const { data } = await createOrderZalopay({
        amount: Math.round(totalPriceWithTax),
        customerDetails: {
          name: customerData.customerName,
          phone: customerData.customerPhone,
          guests: customerData.guests,
        },
        bills: {
          total: total,
          tax,
          totalWithTax: totalPriceWithTax,
        },
        items: cartData.map(item => ({
          name: item.name,
          size: item.size,
          quantity: item.quantity,
          price: item.price,
        })),
        table: customerData.table?.tableId,
      });


      if (!data || !data.order_url) {
        enqueueSnackbar("Không tạo được đơn hàng Zalopay", { variant: "error" });
        return;
      }

      window.location.href = data.order_url;
    } catch (error) {
      console.error(error);
      enqueueSnackbar("Lỗi khi tạo đơn hàng ZaloPay", { variant: "error" });
    }
  };


  const handleVerifyZalopay = async (app_trans_id) => {
    try {
      const verification = await verifyPaymentZalopay({ app_trans_id });

      enqueueSnackbar(verification.data.message, { variant: "success" });

      if (verification.data.success) {
        // Place the order vào DB
        const orderData = {
          customerDetails: {
            name: customerData.customerName,
            phone: customerData.customerPhone,
            guests: customerData.guests,
          },
          orderStatus: "In Progress",
          bills: {
            total: total,
            tax: tax,
            totalWithTax: totalPriceWithTax,
          },
          items: cartData,
          table: customerData.table?.tableId,
          paymentMethod: paymentMethod,
          paymentData: {
            app_trans_id,
            zp_trans_id: verification.data.data?.zp_trans_id,
          },
        };

        console.log("Order Data:", orderData);

        await saveOrderToDB(orderData); // API lưu DB

        enqueueSnackbar("Thanh toán thành công, đơn hàng đã tạo!", { variant: "success" });

        localStorage.setItem("paymentVerified", "true");
        localStorage.removeItem("cartData");
        localStorage.removeItem("customerData");
      }
    } catch (error) {
      console.error(error);
      enqueueSnackbar("Xác minh thanh toán thất bại", { variant: "error" });
    }
  };

  return (
    <>
      {/* Item tổng */}
      <div className='flex items-center justify-between px-5 mt-2'>
        <p className='text-sm text-gray-900 font-medium mt-2'>
          Tổng Món({totalItems})
        </p>
        <h1 className='text-gray-900 text-sm font-bold'>
          {formatVND(total)}
        </h1>
      </div>

      {/* Thuế */}
      <div className='flex items-center justify-between px-5 mt-2'>
        <p className='text-sm text-gray-900 font-medium mt-2'>Tax(5.25%)</p>
        <h1 className='text-gray-900 text-sm font-bold'>
          {formatVND(tax)}
        </h1>
      </div>

      {/* Tổng cộng */}
      <div className='flex items-center justify-between px-5 mt-2'>
        <p className='text-sm text-gray-900 font-medium mt-2'>Total with tax</p>
        <h1 className='text-gray-900 text-sm font-bold'>
          {formatVND(totalPriceWithTax)}
        </h1>
      </div>

      {/* Nút chọn phương thức thanh toán */}
      <div className='flex items-center gap-3 px-5 mt-4'>
        <button
          onClick={() => setPaymentMethod("cash")}
          className={`border px-4 py-3 w-full rounded-lg font-semibold text-lg ${paymentMethod === "cash"
            ? "bg-gray-800 text-white"
            : "border-gray-500 text-gray-900"
            }`}
        >
          Tiền Mặt
        </button>
        <button
          onClick={() => setPaymentMethod("online")}
          className={`border px-4 py-3 w-full rounded-lg font-semibold text-lg ${paymentMethod === "online"
            ? "bg-green-600 text-white"
            : "border-gray-500 text-gray-900"
            }`}
        >
          Chuyển Khoản
        </button>
      </div>

      {/* Nút in & đặt hàng */}
      <div className='flex items-center gap-3 px-5 mt-4'>
        <button className='bg-blue-700 border border-gray-100 px-4 py-3 w-full rounded-lg text-white font-semibold text-lg'>
          In Bill
        </button>
        <button
          onClick={handleCheckout}
          className='bg-yellow-500 border border-gray-100 px-4 py-3 w-full rounded-lg text-white font-semibold text-lg'
        >
          Thanh Toán
        </button>
      </div>
    </>
  )
}

export default Bill
