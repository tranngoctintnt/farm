import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

import "../CatSlider/style.css";
import { Link } from "react-router-dom";

const HomeCatSlier = () => {
  ////2xl:h-[26.438rem] lg:h-[14.438rem] md:h-[11rem] 
  return (
    <div className="homCatSlider bg-cover h-full w-full relative "> 
      <div className=" w-full top-[0%] 2xl:h-[420px] xl:h-[300px] flex lg:py-5 md:py-0 items-center justify-center 2xl:gap-[8rem] lg:gap-4">
        <Swiper
          modules={[Navigation]}
          spaceBetween={20}
          slidesPerView={5}
          // navigation
          // pagination={{ clickable: true }}
          className="w-full container"
          breakpoints={{

            320: { slidesPerView: 3 },

            380: { slidesPerView: 3 },
            640:{ slidesPerView: 3 },
            768: { slidesPerView: 4 },
            1024: { slidesPerView: 5 },
            1280: { slidesPerView: 5 },
            1536: { slidesPerView: 5 },
          }}
        >
          <SwiperSlide className="!flex !justify-center">
            <Link className="cate" to="/">
              <div className="item bg-[url('/bg-nho.png')] bg-cover bg-center rounded-[100%] 2xl:w-[15.75rem] 2xl:!min-w-[15.75rem] 2xl:!h-[15.75rem] xl:w-[10.75rem] xl:!h-[10.75rem] xl:min-w-[10.75rem] md:w-[8.75rem] md:!min-w-[8.75rem] md:!h-[8.75rem] text-center flex items-center justify-center flex-col cursor-pointer">
                <img
                  src="/sung.png"
                  alt="nho"
                  className="2xl:w-[15.75rem] lg:w-[10.75rem] max-sm:w-[7.8rem]"
                />
              </div>
              <h3 className="text-center text-[14px] 2xl:text-[18px] max-sm:text-[12px] lg:mt-0 py-3">
                CÁC LOẠI NHO
              </h3>
            </Link>
          </SwiperSlide>
          <SwiperSlide className="!flex !justify-center">
            <Link className="cate" to="/">
              <div className="item bg-[url('/bg-sungmy.png')] bg-cover bg-center rounded-[100%] 2xl:w-[15.75rem] 2xl:!min-w-[15.75rem] 2xl:!h-[15.75rem] xl:w-[10.75rem] xl:!h-[10.75rem] xl:min-w-[10.75rem] md:w-[8.75rem] md:!min-w-[8.75rem] md:!h-[8.75rem] text-center flex items-center justify-center flex-col cursor-pointer">
                <img
                  src="/sung.png"
                  alt="sung my"
                  className="2xl:w-[15.75rem] lg:w-[10.75rem] max-sm:w-[7.8rem]  "
                />
              </div>
              <h3 className="text-center text-[14px] 2xl:text-[18px] max-sm:text-[12px] lg:mt-0 py-3">
                SUNG MỸ
              </h3>
            </Link>
          </SwiperSlide>
          
          
          <SwiperSlide className="!flex !justify-center">
            <Link className="cate" to="/">
              <div className="item bg-[url('/bg-oi.png')] bg-cover bg-center rounded-[100%] 2xl:w-[15.75rem] 2xl:!min-w-[15.75rem] 2xl:!h-[15.75rem] xl:w-[10.75rem] xl:!h-[10.75rem] xl:min-w-[10.75rem] md:w-[8.75rem] md:!min-w-[8.75rem] md:!h-[8.75rem] text-center flex items-center justify-center flex-col cursor-pointer">
                <img
                  src="/sung.png"
                  alt="oi ryby"
                  className="2xl:w-[15.75rem] lg:w-[10.75rem] max-sm:w-[7.8rem]  "
                />
              </div>
              <h3 className="text-center text-[14px] 2xl:text-[18px] max-sm:text-[12px] lg:mt-0 py-3">
                ỔI RUBY
              </h3>
            </Link>
          </SwiperSlide>
          {/* <SwiperSlide className="!flex !justify-center">
            <Link className="cate" to="/">
              <div className="item bg-[url('/bg-vusua.png')] bg-cover bg-center rounded-[100%] 2xl:w-[15.75rem] 2xl:!min-w-[15.75rem] 2xl:!h-[15.75rem] xl:w-[10.75rem] xl:!h-[10.75rem] xl:min-w-[10.75rem] md:w-[8.75rem] md:!min-w-[8.75rem] md:!h-[8.75rem] text-center flex items-center justify-center flex-col cursor-pointer">
                <img
                  src="/sung.png"
                  alt="vu sua hoang kim"
                  className="2xl:w-[15.75rem] lg:w-[10.75rem] max-sm:w-[7.8rem]  "
                />
              </div>
              <h3 className="text-center text-[14px] 2xl:text-[18px] lg:mt-0 py-3 max-sm:w-[7.8rem]">
                VÚ SỮA HOÀNG KIM
              </h3>
            </Link>
          </SwiperSlide> */}
           <SwiperSlide className="!flex !justify-center">
            <Link className="cate" to="/">
              <div className="item bg-[url('/bg-vusua.png')] bg-cover bg-center rounded-[100%] 2xl:w-[15.75rem] 2xl:!min-w-[15.75rem] 2xl:!h-[15.75rem] xl:w-[10.75rem] xl:!h-[10.75rem] xl:min-w-[10.75rem] md:w-[8.75rem] md:!min-w-[8.75rem] md:!h-[8.75rem] text-center flex items-center justify-center flex-col cursor-pointer">
                <img
                  src="/sung.png"
                  alt="hong socola"
                  className="2xl:w-[15.75rem] lg:w-[10.75rem] max-sm:w-[7.8rem]"
                />
              </div>
              <h3 className="text-center text-[14px] 2xl:text-[18px] max-sm:text-[12px] lg:mt-0 py-3">
              VÚ SỮA HOÀNG KIM
              </h3>
            </Link>
          </SwiperSlide>
          <SwiperSlide className="!flex !justify-center">
            <Link className="cate" to="/">
              <div className="item bg-[url('/bg-hong.png')] bg-cover bg-center rounded-[100%] 2xl:w-[15.75rem] 2xl:!min-w-[15.75rem] 2xl:!h-[15.75rem] xl:w-[10.75rem] xl:!h-[10.75rem] xl:min-w-[10.75rem] md:w-[8.75rem] md:!min-w-[8.75rem] md:!h-[8.75rem] text-center flex items-center justify-center flex-col cursor-pointer">
                <img
                  src="/sung.png"
                  alt="hong socola"
                  className="2xl:w-[15.75rem] lg:w-[10.75rem] max-sm:w-[7.8rem]"
                />
              </div>
              <h3 className="text-center text-[14px] 2xl:text-[18px] max-sm:text-[12px] lg:mt-0 py-3">
                HỒNG SOCOLA
              </h3>
            </Link>
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
  );
};

export default HomeCatSlier;
