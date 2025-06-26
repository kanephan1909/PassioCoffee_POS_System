import React from "react";
import Greetings from "../components/home/Greetings";
import { BsCashCoin } from "react-icons/bs";
import { GrInProgress } from "react-icons/gr";
import MiniCard from "../components/home/MiniCard";
import RecentOrders from "../components/home/RecentOrders";
import PopularProducts from "../components/home/PopularProducts";

const Home = () => {
  return (
    <section className="bg-[#71863A] h-[calc(100vh-210px)] overflow-hidden flex gap-3">
      {/* Left Content */}
      <div className="flex-[4]">
        <Greetings />
        <div className="flex items-center w-full gap-3 px-8 mt-8">
          <MiniCard
            title="Doanh Thu Bán Hàng"
            icon={<BsCashCoin />}
            number={512}
            footerNum={1.6}
          />
          <MiniCard
            title="Đang Xử Lí"
            icon={<GrInProgress />}
            number={12}
            footerNum={3.6}
          />
        </div>
        <RecentOrders />
      </div>

      {/* Right Content */}
      <div className="flex-[2]">
        <PopularProducts />
      </div>
    </section>
  );
};

export default Home;
