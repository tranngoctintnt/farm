import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { EffectFade, Navigation, Pagination, Autoplay } from "swiper/modules";
import Button from "@mui/material/Button";

const HomeBannerV2 = () => {
  return (
    <>
      <Swiper
        loop={true}
        spaceBetween={10}
        effect={"fade"}
        navigation={true}
        pagination={{
          clickable: true,
        }}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        modules={[EffectFade,Autoplay, Navigation, Pagination]}
        className="homeSwiperV2"
      >
        <SwiperSlide>
          <div className="item w-full overflow-hidden rounded-md relative">
            <img src="/banner1.jpg" className="w-full"/>
            <div className="info absolute top-0 -right-[100%] opacity-0 w-[50%] h-[100%] z-50 p-8 flex items-center flex-col justify-center">
              <h4 className="text-[18px] font-[500] w-full mb-5 relative -right-[100%] opacity-0">Big Saving Days Sale</h4>
              <h2 className="text-[30px] font-[700] w-full relative -right-[100%] opacity-0">Sung My</h2>
              <h3 className="flex items-center text-[18px] gap-3 font-[800] w-full text-left mb-5 relative -right-[100%] opacity-0">Starting At Only <span className="text-primary text-[30px] font-[600]">300000</span></h3>

                <div className="w-full relative -right-[100%] opacity-0 btn_">
                <Button className="!bg-[#ff5252] !p-2 !font-[700] !text-white">SHOP NOW</Button>

                </div>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="item w-full overflow-hidden rounded-md">
            <img src="/banner2.jpg" className="w-full"/>
            <div className="info absolute top-0 -right-[100%] opacity-0 w-[50%] h-[100%] z-50 p-8 flex items-center flex-col justify-center transition-all duration-700">
              <h4 className="text-[18px] font-[500] w-full mb-5 relative -right-[100%] opacity-0">Big Saving Days Sale</h4>
              <h2 className="text-[30px] font-[700] w-full relative -right-[100%] opacity-0">Sung My</h2>
              <h3 className="flex items-center text-[18px] gap-3 font-[800] w-full text-left mb-5 relative -right-[100%] opacity-0">Starting At Only <span className="text-primary text-[30px] font-[600]">300000</span></h3>

                <div className="w-full relative -right-[100%] opacity-0 btn_">
                <Button className="!bg-[#ff5252] !p-2 !font-[700] !text-white ">SHOP NOW</Button>

                </div>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </>
  );
};

export default HomeBannerV2;
