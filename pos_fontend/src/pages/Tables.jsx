import React, { useState } from 'react'
import BackButton from '../components/shared/BackButton'
import TableCard from '../components/tables/TableCard'
import { tables } from '../constants/popularDishes';


const Tables = () => {

    const [status, setStatus] = useState("all");

    return (
         <section className="bg-gray-50 h-[calc(100vh-12rem)] overflow-hidden" >
      <div className="flex items-center justify-between px-10 py-4 mt-2">
        <div className="flex items-center gap-4">
          <BackButton />
          <h1 className="text-gray-900 text-2xl font-bold tracking-wider">Bàn Đặt</h1>
        </div>
        <div className="flex items-center justify-around gap-4">
          <button onClick={() => setStatus("all")} className={`text-gray-900 text-lg ${status === "all" && "bg-[#A6CE39] rounded-lg px-3 py-2"} rounded-lg px-3 py-2 font-semibold`}>Tất Cả</button>
          <button onClick={() => setStatus("booked")} className={`text-gray-900 text-lg ${status === "booked" && "bg-[#A6CE39] rounded-lg px-3 py-2"} rounded-lg px-3 py-2 font-semibold`}>Đã Đặt</button>
        </div>
      </div>

      <div className="flex flex-wrap gap-5 pl-10 pt-2 overflow-y-scroll scrollbar-hide h-[calc(100vh-5rem-14rem)]">
          {
            tables.map((table) => {
                return(
                    <TableCard key={table.id} id={table.id} name={table.name} status={table.status} initials={table.initial} />
                )
            })
          }
        </div>
    </section>
    )
}

export default Tables
