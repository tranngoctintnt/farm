import React from 'react'
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const SliderProductList = () => {
  return (
    <div className="productList-Slider py-8">
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
          className="sliderProductList"
        >
          <SwiperSlide>
            <div className="item rounded-[20px] overflow-hidden">
              <img
                src="/suoitienfarm-6.png"
                alt="Banner Slider"
                className="w-full xl:h-[80vh] md:h-[50vh] max-sm:h-[28vh]"
              />
            </div>
          </SwiperSlide>

          <SwiperSlide>
            <div className="item rounded-[20px] overflow-hidden">
              <img
                src="/suoitienfarm-7.jpg"
                alt="Banner Slider"
                className="w-full xl:h-[80vh] md:h-[50vh] max-sm:h-[28vh]"
              />
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="item rounded-[20px] overflow-hidden">
              <img
                src="/suoi-tien-farm-5.jpg"
                alt="Banner Slider"
                className="w-full xl:h-[80vh] md:h-[50vh] max-sm:h-[28vh]"
              />
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="item rounded-[20px] overflow-hidden">
              <img
                src="/suoi-tien-farm-3.jpg"
                alt="Banner Slider"
                className="w-full xl:h-[80vh] md:h-[50vh] max-sm:h-[28vh]"
              />
            </div>
          </SwiperSlide>
          {/* <SwiperSlide>
            <div className="item rounded-[20px] overflow-hidden">
              <img
                src="./slider2.jpg"
                alt="Banner Slider"
                className="w-full"
              />
            </div>
          </SwiperSlide> */}
        </Swiper>
      </div>
    </div>
  )
}
export default SliderProductList;