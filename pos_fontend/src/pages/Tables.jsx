import React, { useState } from 'react'
import BackButton from '../components/shared/BackButton'
import TableCard from '../components/tables/TableCard'
import { tables } from '../constants/popularDishes';


const Tables = () => {

    const [status, setStatus] = useState("all");

    return (
         <section className="bg-[#71863A] h-[calc(100vh-13.4rem)] overflow-hidden">
      <div className="flex items-center justify-between px-10 py-4 mt-2">
        <div className="flex items-center gap-4">
          <BackButton />
          <h1 className="text-[#f5f5f5] text-2xl font-bold tracking-wider">Tables</h1>
        </div>
        <div className="flex items-center justify-around gap-4">
          <button onClick={() => setStatus("all")} className={`text-[#cfcece] text-lg ${status === "all" && "bg-[#a6ce3986] rounded-lg px-3 py-2"} rounded-lg px-3 py-2 font-semibold`}>Tất Cả</button>
          <button onClick={() => setStatus("booked")} className={`text-[#cfcece] text-lg ${status === "booked" && "bg-[#a6ce3986] rounded-lg px-3 py-2"} rounded-lg px-3 py-2 font-semibold`}>Booked</button>
        </div>
      </div>

      <div className="flex flex-wrap gap-5 p-10 overflow-y-scroll scrollbar-hide">
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
