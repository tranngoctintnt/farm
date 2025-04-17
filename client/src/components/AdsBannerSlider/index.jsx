import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import BannerBox from "../BannerBox";

const AdsBannerSlider = (props) => {
  return (
    <div className="py-5 w-full">
      <div className="container">
        <Swiper
          // install Swiper modules
          modules={[Navigation]}
          spaceBetween={10}
          slidesPerView={props.items}
          navigation={true}
          className="futureCate"
        >
          <SwiperSlide>
            {/* <div className="box bannerBox">
      <img src='/banner-ads1.jpg' alt="Ads" className="w-full" />
    </div> */}
            <BannerBox img={"/banner-ads1.jpg"} link={"/"} />
          </SwiperSlide>
          <SwiperSlide>
            <BannerBox img={"/banner-ads1.jpg"} link={"/"} />
          </SwiperSlide>
          <SwiperSlide>
            <BannerBox img={"/banner-ads1.jpg"} link={"/"} />
          </SwiperSlide>
          <SwiperSlide>
            <BannerBox img={"/banner-ads1.jpg"} link={"/"} />
          </SwiperSlide>
          <SwiperSlide>
            <BannerBox img={"/banner-ads1.jpg"} link={"/"} />
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
  );
};

export default AdsBannerSlider;
