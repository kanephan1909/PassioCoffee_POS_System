import React, { useState } from 'react'
import BackButton from '../components/shared/BackButton'
import TableCard from '../components/tables/TableCard'
import { tables } from '../constants/popularDishes';


const Tables = () => {

    const [status, setStatus] = useState("all");

    return (
         <section className="bg-[#71863A] h-[calc(100vh-12.5rem)] overflow-hidden" style={{background: 'linear-gradient(135deg, #A6CE39 0%, #8BC34A 25%, #7CB342 50%, #689F38 75%, #558B2F 100%)'}}>
      <div className="flex items-center justify-between px-10 py-4 mt-2">
        <div className="flex items-center gap-4">
          <BackButton />
          <h1 className="text-[#f5f5f5] text-2xl font-bold tracking-wider">Bàn Đặt</h1>
        </div>
        <div className="flex items-center justify-around gap-4">
          <button onClick={() => setStatus("all")} className={`text-white opacity-80 text-lg ${status === "all" && "bg-[#a6ce3986] rounded-lg px-3 py-2"} rounded-lg px-3 py-2 font-semibold`}>Tất Cả</button>
          <button onClick={() => setStatus("booked")} className={`text-white opacity-80 text-lg ${status === "booked" && "bg-[#a6ce3986] rounded-lg px-3 py-2"} rounded-lg px-3 py-2 font-semibold`}>Booked</button>
        </div>
      </div>

      <div className="flex flex-wrap gap-5 pl-10 pt-2 overflow-y-scroll scrollbar-hide h-[calc(100vh-5rem-15rem)]">
          {
            tables.map((table) => {
                return(
                    <TableCard key={table.id} name={table.name} status={table.status} initials={table.initial} />
                )
            })
          }
        </div>
    </section>
    )
}

export default Tables
