import HeaderNav from "../components/shared/HeaderNav"
import OrderCard from "../components/orders/OrderCard"
import BackButton from "../components/shared/BackButton"
import { useState } from "react"

const Orders = () => {

  const [status, setStatus] = useState("all");

  return (
    <section className="bg-[#71863A] h-[calc(100vh-13.4rem)] overflow-hidden">
      <div className="flex items-center justify-between px-10 py-4 mt-2">
        <div className="flex items-center gap-4">
          <BackButton />
          <h1 className="text-[#f5f5f5] text-2xl font-bold tracking-wider">Orders</h1>
        </div>
        <div className="flex items-center justify-around gap-4">
          <button onClick={() => setStatus("all")} className={`text-[#cfcece] text-lg ${status === "all" && "bg-[#a6ce3986] rounded-lg px-3 py-2"} rounded-lg px-3 py-2 font-semibold`}>Tất Cả</button>
          <button onClick={() => setStatus("progress")} className={`text-[#cfcece] text-lg ${status === "progress" && "bg-[#a6ce3986] rounded-lg px-3 py-2"} rounded-lg px-3 py-2 font-semibold`}>Trong Quá Trình</button>
          <button onClick={() => setStatus("ready")} className={`text-[#cfcece] text-lg ${status === "ready" && "bg-[#a6ce3986] rounded-lg px-3 py-2"} rounded-lg px-3 py-2 font-semibold`}>Sẵn Sàng</button>
          <button onClick={() => setStatus("completed")} className={`text-[#cfcece] text-lg ${status === "completed" && "bg-[#a6ce3986] rounded-lg px-3 py-2"} rounded-lg px-3 py-2 font-semibold`}>Hoàn Thành</button>
        </div>
      </div>

      <div className="flex flex-wrap gap-6 px-10 py-4 overflow-y-scroll scrollbar-hide h-[calc(100vh-5rem-5rem)]">
          <OrderCard />
          <OrderCard />
          <OrderCard />
          <OrderCard />
          <OrderCard />
          <OrderCard />
          <OrderCard />
          <OrderCard />
          <OrderCard />
          <OrderCard />
          <OrderCard />
          <OrderCard />
          <OrderCard />
          <OrderCard />
          <OrderCard />
          <OrderCard />
        </div>
    </section>
  )
}

export default Orders
