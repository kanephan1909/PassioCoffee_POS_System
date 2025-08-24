import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { getTotalPrice } from '../../redux/slices/cartSlice'
import { formatVND } from '../../utils'
import { enqueueSnackbar } from 'notistack'
import { createOrderZalopay, verifyPaymentZalopay } from '../../https'

const Bill = () => {
  const cartData = useSelector(state => state.cart)
  const total = useSelector(getTotalPrice) // hiện tại: nghìn đồng

  // convert sang VND thật
  const totalVND = total * 1000

  const customerData = useSelector((state) => state.customer)

  const taxRate = 5.25
  const tax = (totalVND * taxRate) / 100
  const totalPriceWithTax = Math.round(totalVND + tax)

  const totalItems = cartData.reduce((sum, item) => sum + item.quantity, 0)

  const [paymentMethod, setPaymentMethod] = useState(null)


  const handleOnlinePayment = async () => {
    try {
      if (!paymentMethod) {
        enqueueSnackbar("Vui lòng chọn phương thức thanh toán", { variant: "warning" });
        return;
      }

      // 1. Tạo order Zalopay
      const { data } = await createOrderZalopay({
        amount: Math.round(totalPriceWithTax),
        customer: {
          name: customerData.customerName,
          phone: customerData.customerPhone,
          guests: customerData.guests,
          table: customerData.table?.tableId,
        },
      });

      if (!data || !data.order_url) {
        enqueueSnackbar("Không tạo được đơn hàng Zalopay", { variant: "error" });
        return;
      }

      // 2. Redirect người dùng sang Zalopay
      window.location.href = data.order_url;

      // Sau khi thanh toán, Zalopay redirect về redirecturl mà bạn đã config.
      // Ở redirect page, bạn cần lấy app_trans_id rồi gọi verifyPaymentZalopay

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
          Item({totalItems})
        </p>
        <h1 className='text-gray-900 text-sm font-bold'>
          {formatVND(totalVND / 1000)}
        </h1>
      </div>

      {/* Thuế */}
      <div className='flex items-center justify-between px-5 mt-2'>
        <p className='text-sm text-gray-900 font-medium mt-2'>Tax(5.25%)</p>
        <h1 className='text-gray-900 text-sm font-bold'>
          {formatVND(tax / 1000)}
        </h1>
      </div>

      {/* Tổng cộng */}
      <div className='flex items-center justify-between px-5 mt-2'>
        <p className='text-sm text-gray-900 font-medium mt-2'>Total with tax</p>
        <h1 className='text-gray-900 text-sm font-bold'>
          {formatVND(totalPriceWithTax / 1000)}
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
          Cash
        </button>
        <button
          onClick={() => setPaymentMethod("online")}
          className={`border px-4 py-3 w-full rounded-lg font-semibold text-lg ${paymentMethod === "online"
            ? "bg-green-600 text-white"
            : "border-gray-500 text-gray-900"
            }`}
        >
          Online
        </button>
      </div>

      {/* Nút in & đặt hàng */}
      <div className='flex items-center gap-3 px-5 mt-4'>
        <button className='bg-blue-700 border border-gray-100 px-4 py-3 w-full rounded-lg text-white font-semibold text-lg'>
          In Bill
        </button>
        <button
          onClick={paymentMethod === "online" ? handleOnlinePayment : () => enqueueSnackbar("Đơn hàng đã được đặt (Cash)", { variant: "success" })}
          className='bg-yellow-500 border border-gray-100 px-4 py-3 w-full rounded-lg text-white font-semibold text-lg'
        >
          Place Order
        </button>
      </div>
    </>
  )
}

export default Bill
