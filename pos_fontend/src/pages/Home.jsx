import React from "react";
import Greetings from "../components/home/Greetings";
import { AlertCircle , TrendingUp } from 'lucide-react'
import MiniCard from "../components/home/MiniCard";
import RecentOrders from "../components/home/RecentOrders";
import PopularProducts from "../components/home/PopularProducts";

const Home = () => {
  return (
    <section className="bg-[#71863A] h-[calc(100vh-12.5rem)] overflow-hidden flex gap-3" style={{background: 'linear-gradient(135deg, #A6CE39 0%, #8BC34A 25%, #7CB342 50%, #689F38 75%, #558B2F 100%)'}}>
      {/* Left Content */}
      <div className="flex-[4]">
        <Greetings />
        <div className="flex items-center w-full gap-3 px-8 mt-8">
          <MiniCard
            title="Doanh Thu Bán Hàng"
            icon={<TrendingUp  />}
            number={512}
            footerNum={1.6}
          />
          <MiniCard
            title="Đang Xử Lí"
            icon={<AlertCircle  />}
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
