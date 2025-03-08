import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";

import "../CatSlider/style.css";
import { Link } from "react-router-dom";

const HomeCatSlier = () => {
  return (
    <div className="homCatSlider 2xl:!bg-cover lg:!bg-contain 2xl:h-[26.438rem] lg:h-[21.438rem] relative ">
      
      <div className="absolute w-full top-[-7%] flex py-5 items-center justify-center 2xl:gap-[8rem] lg:gap-4">
        <Link className="cate" to="/">
          <div className="item bg-[url('/bg-nho.png')] bg-cover bg-center rounded-[100%] 2xl:w-[13.75rem] 2xl:!min-w-[13.75rem] 2xl:!h-[13.75rem] lg:w-[1.75rem] lg:!min-w-[8.75rem] lg:!h-[8.75rem] text-center flex items-center justify-center flex-col cursor-pointer">
            <img src="/nho.png" alt="nho" className="2xl:w-[13.75rem] lg:w-[8.75rem]" />
          </div>
          <h3 className="text-center 2xl:mt-[1rem] 2xl:text-[1rem] lg:text-[0.8rem] lg:mt-0 py-3 font-[600]">CÁC LOẠI NHO</h3>
        </Link>
        <Link className="cate" to="/">
          <div className="item bg-[url('/bg-sungmy.png')] bg-cover bg-center rounded-[100%] 2xl:w-[13.75rem] 2xl:!min-w-[13.75rem] 2xl:!h-[13.75rem] lg:w-[1.75rem] lg:!min-w-[8.75rem] lg:!h-[8.75rem] text-center flex items-center justify-center flex-col cursor-pointer">
            <img src="/sung.png" alt="sung my" className="2xl:w-[13.75rem] lg:w-[8.75rem]" />
          </div>
          <h3 className="text-center 2xl:mt-[1rem] 2xl:text-[1rem] lg:text-[0.8rem] lg:mt-0 py-3 font-[600]">SUNG MỸ</h3>
        </Link>
        <Link className="cate" to="/">
          <div className="item bg-[url('/bg-oi.png')] bg-cover bg-center rounded-[100%] 2xl:w-[13.75rem] 2xl:!min-w-[13.75rem] 2xl:!h-[13.75rem] lg:w-[1.75rem] lg:!min-w-[8.75rem] lg:!h-[8.75rem] text-center flex items-center justify-center flex-col cursor-pointer">
            <img src="/oi.png" alt="oi ryby" className="2xl:w-[13.75rem] lg:w-[8.75rem]" />
          </div>
          <h3 className="text-center 2xl:mt-[1rem] 2xl:text-[1rem] lg:text-[0.8rem] lg:mt-0 py-3 font-[600]">ỔI RUBY</h3>
        </Link>
        <Link className="cate" to="/">
          <div className="item bg-[url('/bg-vusua.png')] bg-cover bg-center rounded-[100%] 2xl:w-[13.75rem] 2xl:!min-w-[13.75rem] 2xl:!h-[13.75rem] lg:w-[1.75rem] lg:!min-w-[8.75rem] lg:!h-[8.75rem] text-center flex items-center justify-center flex-col cursor-pointer">
            <img src="/vusua.png" alt="vu sua hoang kim" className="2xl:w-[13.75rem] lg:w-[8.75rem]" />
          </div>
          <h3 className="text-center 2xl:mt-[1rem] 2xl:text-[1rem] lg:text-[0.8rem] lg:mt-0 py-3 font-[600]">VÚ SỮA HOÀNG KIM</h3>
        </Link>
        <Link className="cate" to="/">
          <div className="item bg-[url('/bg-hong.png')] bg-cover bg-center rounded-[100%] 2xl:w-[13.75rem] 2xl:!min-w-[13.75rem] 2xl:!h-[13.75rem] lg:w-[1.75rem] lg:!min-w-[8.75rem] lg:!h-[8.75rem] text-center flex items-center justify-center flex-col cursor-pointer">
            <img src="/hong-socola.png" alt="hong socola" className="2xl:w-[13.75rem] lg:w-[8.75rem]" />
          </div>
          <h3 className="text-center 2xl:mt-[1rem] 2xl:text-[1rem] lg:text-[0.8rem] lg:mt-0 py-3 font-[600]">HỒNG SOCOLA</h3>
        </Link>
        </div>
    </div>
  );
};

export default HomeCatSlier;
