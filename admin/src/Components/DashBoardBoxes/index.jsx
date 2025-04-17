import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import { Navigation } from "swiper/modules";
import { AiOutlineGift } from "react-icons/ai";
import { LuChartNoAxesCombined } from "react-icons/lu";
import { FiUsers } from "react-icons/fi";
import { RiProductHuntLine } from "react-icons/ri";
import { MdOutlineCategory } from "react-icons/md";

const DashBoardBoxes = () => {
  return (
    <>
      <Swiper
        slidesPerView={4}
        spaceBetween={20}
        navigation={true}
        modules={[Navigation]}
        className="mySwiper"
      >
        <SwiperSlide>
            <div className="box p-6 cursor-pointer hover:bg-[#289974] text-white bg-[#10b981] rounded-md border border-[rgba(0,0,0,0.1)] flex items-center gap-4">
              <FiUsers className="text-[40px]"/>
                <div className="info w-[70%] ">
                    <h3>Total User</h3>
                    <b>1,300</b>
                </div>

                <LuChartNoAxesCombined className="text-[40px]"/>
            </div>
        </SwiperSlide>

        <SwiperSlide>
            <div className="box p-6 cursor-pointer text-white hover:bg-[#346ae8] bg-[#3872fa] rounded-md border border-[rgba(0,0,0,0.1)] flex items-center gap-4">
              <AiOutlineGift className="text-[40px]"/>
                <div className="info w-[70%] ">
                    <h3>Total Order</h3>
                    <b>1,300</b>
                </div>

                <LuChartNoAxesCombined className="text-[40px]"/>
            </div>
        </SwiperSlide>

        <SwiperSlide>
            <div className="box p-6 cursor-pointer text-white hover:bg-[#423eadd8] bg-[#312be1d8] rounded-md border border-[rgba(0,0,0,0.1)] flex items-center gap-4">
              <RiProductHuntLine className="text-[40px]"/>
                <div className="info w-[70%] ">
                    <h3>Total Product</h3>
                    <b>1,300</b>
                </div>

                <LuChartNoAxesCombined className="text-[40px] text-white"/>
            </div>
        </SwiperSlide>

        <SwiperSlide>
            <div className="box p-6 cursor-pointer text-white hover:bg-[#d52c59] bg-[#f22c61] rounded-md border border-[rgba(0,0,0,0.1)] flex items-center gap-4">
              <MdOutlineCategory className="text-[40px]"/>
                <div className="info w-[70%] ">
                    <h3>Total Category</h3>
                    <b>1,300</b>
                </div>

                <LuChartNoAxesCombined className="text-[40px] text-white"/>
            </div>
        </SwiperSlide>

        
       
      </Swiper>
    </>
  );
};
DashBoardBoxes;
export default DashBoardBoxes;
