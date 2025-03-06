import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";

import "../CatSlider/style.css";
import { Link } from "react-router-dom";

const HomeCatSlier = () => {
  return (
    <div className="homCatSlider relative ">
      <div className="list-items h-[423px] z-50 ">
      </div>
      <div className="absolute w-full top-[-7%] flex py-5 items-center justify-center gap-[8rem]">
        <Link className="cate" to="/">
          <div className="item bg-[url('/bg-nho.png')] bg-cover bg-center h-screen rounded-[100%] w-[220px] !min-w-[220px] !h-[220px] text-center flex items-center justify-center flex-col cursor-pointer">
            <img src="/nho.png" alt="nho" className="w-[200px]" />
          </div>
          <h3 className="text-center mt-[25px] py-3 font-[600]">CÁC LOẠI NHO</h3>
        </Link>
        <Link className="cate" to="/">
          <div className="item bg-[url('/bg-sungmy.png')] bg-cover bg-center h-screen rounded-[100%] w-[220px] !min-w-[220px] !h-[220px] text-center flex items-center justify-center flex-col cursor-pointer">
            <img src="/sung.png" alt="sung my" className="w-[200px]" />
          </div>
          <h3 className="text-center mt-[25px] py-3 font-[600]">SUNG MỸ</h3>
        </Link>
        <Link className="cate" to="/">
          <div className="item bg-[url('/bg-oi.png')] bg-cover bg-center h-screen rounded-[100%] w-[220px] !min-w-[220px] !h-[220px] text-center flex items-center justify-center flex-col cursor-pointer">
            <img src="/oi.png" alt="oi ryby" className="w-[200px]" />
          </div>
          <h3 className="text-center mt-[25px] py-3 font-[600]">ỔI RUBY</h3>
        </Link>
        <Link className="cate" to="/">
          <div className="item bg-[url('/bg-vusua.png')] bg-cover bg-center h-screen rounded-[100%] w-[220px] !min-w-[220px] !h-[220px] text-center flex items-center justify-center flex-col cursor-pointer">
            <img src="/vusua.png" alt="vu sua hoang kim" className="w-[200px]" />
          </div>
          <h3 className="text-center mt-[25px] py-3 font-[600]">VÚ SỮA HOÀNG KIM</h3>
        </Link>
        <Link className="cate" to="/">
          <div className="item bg-[url('/bg-hong.png')] bg-cover bg-center h-screen rounded-[100%] w-[220px] !min-w-[220px] !h-[220px] text-center flex items-center justify-center flex-col cursor-pointer">
            <img src="/hong-socola.png" alt="hong socola" className="w-[200px]" />
          </div>
          <h3 className="text-center mt-[25px] py-3 font-[600]">HỒNG SOCOLA</h3>
        </Link>
        </div>
    </div>
  );
};

export default HomeCatSlier;
