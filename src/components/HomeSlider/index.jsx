import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay, Pagination, Scrollbar, A11y } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const HomeSlider = () => {
  return (
    <div className="homeSlider">
      <div className="container">
        <Swiper
          // install Swiper modules
          modules={[Navigation, Autoplay]}
          spaceBetween={10}
          slidesPerView={1}
          navigation={true}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          pagination={{ clickable: true }}
          scrollbar={{ draggable: true }}
          // onSwiper={(swiper) => console.log(swiper)}
          // onSlideChange={() => console.log("slide change")}
          className="sliderHome"
        >
          <SwiperSlide>
            <div className="item rounded-[20px] overflow-hidden">
              <img
                src="./public/Slider1.jpg"
                alt="Banner Slider"
                className="w-full"
              />
            </div>
          </SwiperSlide>

          <SwiperSlide>
            <div className="item rounded-[20px] overflow-hidden">
              <img
                src="./public/Slider2.jpg"
                alt="Banner Slider"
                className="w-full"
              />
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="item rounded-[20px] overflow-hidden">
              <img
                src="./public/Slider3.jpg"
                alt="Banner Slider"
                className="w-full"
              />
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="item rounded-[20px] overflow-hidden">
              <img
                src="./public/Slider4.jpg"
                alt="Banner Slider"
                className="w-full"
              />
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="item rounded-[20px] overflow-hidden">
              <img
                src="./public/Slider5.jpg"
                alt="Banner Slider"
                className="w-full"
              />
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
  );
};

export default HomeSlider;
