import React, { useState, useEffect } from 'react';
import BackButton from '../components/shared/BackButton';
import TableCard from '../components/tables/TableCard';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { getTables } from '../https';
import { enqueueSnackbar } from 'notistack';

const Tables = () => {
  const [status, setStatus] = useState("all");

  useEffect(() => {
    document.title = "POS"
  }, [])

  const { data: resData, isError } = useQuery({
    queryKey: ["tables"],
    queryFn: async () => {
      return await getTables();
    },
    placeholderData: keepPreviousData,
  });

  if (isError) {
    enqueueSnackbar("Something went wrong!", { variant: "error" })
  }

  console.log(resData);

  const tables = resData?.data?.data || [];

  return (
    <section className="bg-gray-50 h-[calc(100vh-12rem)] overflow-hidden">
      <div className="flex items-center justify-between px-10 py-4 mt-2">
        <div className="flex items-center gap-4">
          <BackButton />
          <h1 className="text-gray-900 text-2xl font-bold tracking-wider">Bàn Đặt</h1>
        </div>
        <div className="flex items-center justify-around gap-4">
          <button
            onClick={() => setStatus("all")}
            className={`text-gray-900 text-lg ${status === "all" && "bg-[#A6CE39]"} rounded-lg px-3 py-2 font-semibold`}
          >
            Tất Cả
          </button>
          <button
            onClick={() => setStatus("Booked")}
            className={`text-gray-900 text-lg ${status === "Booked" && "bg-[#A6CE39]"} rounded-lg px-3 py-2 font-semibold`}
          >
            Đã Đặt
          </button>
        </div>
      </div>

      <div className="grid grid-cols-5 gap-3 px-16 py-4 h-[700px] overflow-y-scroll scrollbar-hide">
        {tables
          .filter(table => status === "all" || table.status === status)
          .map(table => (
            <TableCard
              key={table._id}
              id={table._id}
              name={table.tableNo}
              status={table.status}
              initials={table?.currentOrder?.customerDetails.name}
              seats={table.seats}
            />
          ))}
      </div>
    </section>
  );
};

export default Tables;
