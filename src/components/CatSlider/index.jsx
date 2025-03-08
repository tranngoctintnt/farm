import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

import "../CatSlider/style.css";
import { Link } from "react-router-dom";

const HomeCatSlier = () => {
  return (
    <div className="homCatSlider 2xl:!bg-cover md:!bg-contain 2xl:h-[26.438rem] lg:h-[14.438rem] md:h-[11rem] relative ">
      <div className="absolute w-full top-[-7%] flex lg:py-5 md:py-0 items-center justify-center 2xl:gap-[8rem] lg:gap-4">
        <Swiper
          modules={[Navigation]}
          spaceBetween={20}
          slidesPerView={5}
          // navigation
          // pagination={{ clickable: true }}
          className="w-full container"
          breakpoints={{
            768: { slidesPerView: 4 },
            1024: { slidesPerView: 5 },
          }}
        >
          <SwiperSlide className="!flex !justify-center">
            <Link className="cate" to="/">
              <div className="item bg-[url('/bg-nho.png')] bg-cover bg-center rounded-[100%] 2xl:w-[13.75rem] 2xl:!min-w-[13.75rem] 2xl:!h-[13.75rem] md:w-[8.75rem] md:!min-w-[8.75rem] md:!h-[8.75rem] text-center flex items-center justify-center flex-col cursor-pointer">
                <img
                  src="/nho.png"
                  alt="nho"
                  className="2xl:w-[13.75rem] lg:w-[8.75rem]"
                />
              </div>
              <h3 className="text-center md:text-[12px] 2xl:mt-[1rem] 2xl:text-[1rem] lg:text-[0.8rem] lg:mt-0 py-3">
                CÁC LOẠI NHO
              </h3>
            </Link>
          </SwiperSlide>

          <SwiperSlide className="!flex !justify-center">
            <Link className="cate" to="/">
              <div className="item bg-[url('/bg-sungmy.png')] bg-cover bg-center rounded-[100%] 2xl:w-[13.75rem] 2xl:!min-w-[13.75rem] 2xl:!h-[13.75rem] md:w-[8.75rem] md:!min-w-[8.75rem] md:!h-[8.75rem] text-center flex items-center justify-center flex-col cursor-pointer">
                <img
                  src="/sung.png"
                  alt="sung my"
                  className="2xl:w-[13.75rem] lg:w-[8.75rem]"
                />
              </div>
              <h3 className="text-center md:text-[12px] 2xl:mt-[1rem] 2xl:text-[1rem] lg:text-[0.8rem] lg:mt-0 py-3">
                SUNG MỸ
              </h3>
            </Link>
          </SwiperSlide>

          
          <SwiperSlide className="!flex !justify-center">
            <Link className="cate" to="/">
              <div className="item bg-[url('/bg-oi.png')] bg-cover bg-center rounded-[100%] 2xl:w-[13.75rem] 2xl:!min-w-[13.75rem] 2xl:!h-[13.75rem] md:w-[8.75rem] md:!min-w-[8.75rem] md:!h-[8.75rem] text-center flex items-center justify-center flex-col cursor-pointer">
                <img
                  src="/oi.png"
                  alt="oi ryby"
                  className="2xl:w-[13.75rem] lg:w-[8.75rem]"
                />
              </div>
              <h3 className="text-center md:text-[12px] 2xl:mt-[1rem] 2xl:text-[1rem] lg:text-[0.8rem] lg:mt-0 py-3">
                ỔI RUBY
              </h3>
            </Link>
          </SwiperSlide>
          <SwiperSlide className="!flex !justify-center">
            <Link className="cate" to="/">
              <div className="item bg-[url('/bg-vusua.png')] bg-cover bg-center rounded-[100%] 2xl:w-[13.75rem] 2xl:!min-w-[13.75rem] 2xl:!h-[13.75rem] md:w-[8.75rem] md:!min-w-[8.75rem] md:!h-[8.75rem] text-center flex items-center justify-center flex-col cursor-pointer">
                <img
                  src="/vusua.png"
                  alt="vu sua hoang kim"
                  className="2xl:w-[13.75rem] lg:w-[8.75rem]"
                />
              </div>
              <h3 className="text-center md:text-[12px] 2xl:mt-[1rem] 2xl:text-[1rem] lg:text-[0.8rem] lg:mt-0 py-3">
                VÚ SỮA HOÀNG KIM
              </h3>
            </Link>
          </SwiperSlide>
          <SwiperSlide className="!flex !justify-center">
            <Link className="cate" to="/">
              <div className="item bg-[url('/bg-hong.png')] bg-cover bg-center rounded-[100%] 2xl:w-[13.75rem] 2xl:!min-w-[13.75rem] 2xl:!h-[13.75rem] md:w-[8.75rem] md:!min-w-[8.75rem] md:!h-[8.75rem] text-center flex items-center justify-center flex-col cursor-pointer">
                <img
                  src="/hong-socola.png"
                  alt="hong socola"
                  className="2xl:w-[13.75rem] lg:w-[8.75rem]"
                />
              </div>
              <h3 className="text-center md:text-[12px] 2xl:mt-[1rem] 2xl:text-[1rem] lg:text-[0.8rem] lg:mt-0 py-3">
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
