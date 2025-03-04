import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

import "../CatSlider/style.css";
import { Link } from "react-router-dom";

const HomeCatSlier = () => {
  return (
    <div className="homCatSlider">
      <div className="container">
        <div className="title">
          <h2 className="font-[600]">Featured Categories</h2>
        </div>

        <div className="list-items py-5">
          <Swiper
            // install Swiper modules
            loop={true}
            modules={[Navigation]}
            spaceBetween={10}
            slidesPerView={8}
            navigation={true}
            className="futureCate"
          >
            <SwiperSlide>
              <Link to="/">
                <div className="item bg-[#ecffec] rounded-[100%] w-[150px] !min-w-[150px] !h-[150px] text-center flex items-center justify-center flex-col cursor-pointer">
                  <img
                    src="/sung.png"
                    alt="Sung"
                    className="w-[120px]"
                  />
                </div>
                <h3 className="text-center py-3 font-[600]">Sung</h3>
              </Link>
            </SwiperSlide>
            <SwiperSlide>
              <Link to="/">
                <div className="item bg-[#feefae] rounded-[100%] w-[150px] !min-w-[150px] !h-[150px] text-center flex items-center justify-center flex-col cursor-pointer">
                  <img src="/nho.png" alt="Nho" className="w-[120px]" />
                </div>
                <h3 className="text-center py-3 font-[600]">Nho</h3>
              </Link>
            </SwiperSlide>
            <SwiperSlide>
              <Link to="/">
                <div className="item bg-[#fdf0ff] rounded-[100%] w-[150px] !min-w-[150px] !h-[150px] text-center flex items-center justify-center flex-col cursor-pointer">
                  <img
                    src="/sung.png"
                    alt="Sung"
                    className="w-[120px]"
                  />
                </div>
                <h3 className="text-center py-3 font-[600]">Sung</h3>
              </Link>
            </SwiperSlide>
            <SwiperSlide>
              <Link to="/">
                <div className="item bg-[#fdf0ff] rounded-[100%] w-[150px] !min-w-[150px] !h-[150px] text-center flex items-center justify-center flex-col cursor-pointer">
                  <img
                    src="/sung.png"
                    alt="Sung"
                    className="w-[120px]"
                  />
                </div>
                <h3 className="text-center py-3 font-[600]">Sung</h3>
              </Link>
            </SwiperSlide>
            <SwiperSlide>
              <Link to="/">
                <div className="item bg-[#fdf0ff] rounded-[100%] w-[150px] !min-w-[150px] !h-[150px] text-center flex items-center justify-center flex-col cursor-pointer">
                  <img
                    src="/sung.png"
                    alt="Sung"
                    className="w-[120px]"
                  />
                </div>
                <h3 className="text-center py-3 font-[600]">Sung</h3>
              </Link>
            </SwiperSlide>
            <SwiperSlide>
              <Link to="/">
                <div className="item bg-[#fdf0ff] rounded-[100%] w-[150px] !min-w-[150px] !h-[150px] text-center flex items-center justify-center flex-col cursor-pointer">
                  <img
                    src="/sung.png"
                    alt="Sung"
                    className="w-[120px]"
                  />
                </div>
                <h3 className="text-center py-3 font-[600]">Sung</h3>
              </Link>
            </SwiperSlide>
            <SwiperSlide>
              <Link to="/">
                <div className="item bg-[#fdf0ff] rounded-[100%] w-[150px] !min-w-[150px] !h-[150px] text-center flex items-center justify-center flex-col cursor-pointer">
                  <img
                    src="/sung.png"
                    alt="Sung"
                    className="w-[120px]"
                  />
                </div>
                <h3 className="text-center py-3 font-[600]">Sung</h3>
              </Link>
            </SwiperSlide>
            <SwiperSlide>
              <Link to="/">
                <div className="item bg-[#fdf0ff] rounded-[100%] w-[150px] !min-w-[150px] !h-[150px] text-center flex items-center justify-center flex-col cursor-pointer">
                  <img
                    src="/sung.png"
                    alt="Sung"
                    className="w-[120px]"
                  />
                </div>
                <h3 className="text-center py-3 font-[600]">Sung</h3>
              </Link>
            </SwiperSlide>
          </Swiper>
        </div>
      </div>
    </div>
  );
};

export default HomeCatSlier;
