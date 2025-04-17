import React, { useRef, useState } from "react";
import InnerImageZoom from "react-inner-image-zoom";
import "react-inner-image-zoom/lib/InnerImageZoom/styles.css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import BASE_URL from "../../config";

export const ProductZoom = React.memo(({data}) => {
  // console.log(data);
  const [slideIndex, setSlideIndex] = useState(0);
  const zoomSlideSml = useRef();
  const zoomSlideBig = useRef();
const img = JSON.parse(data.imgProduct);
// console.log(img);
  const goto = (index) => {
    setSlideIndex(index);
    zoomSlideSml.current.swiper.slideTo(index);
    zoomSlideBig.current.swiper.slideTo(index);
  };

  return (
   
    <div className="flex flex-col-reverse lg:flex-row gap-3 w-full">
  {/* Thumbnail slider */}
  <div className="sliderProductZoom w-full lg:w-[20%] lg:h-auto">
    <Swiper
      ref={zoomSlideSml}
      slidesPerView={4}
      spaceBetween={10}
      direction="horizontal" // mobile default
      breakpoints={{
        1024: {
          direction: "vertical", // desktop
        },
      }}
      navigation={true}
      modules={[Navigation, Pagination]}
      className="zoomProductSliderThumbs h-auto overflow-hidden space swiper-backface-hidden"
    >
      {img.map((imgProduct, index) => (
        <SwiperSlide key={index}>
          <div
            className={`item rounded-xl overflow-hidden w-full flex items-center justify-center cursor-pointer group h-[4.5rem] lg:h-[5.625rem] ${
              slideIndex === index ? "opacity-100" : "opacity-30"
            }`}
            onClick={() => goto(index)}
          >
            <img
              className="h-full object-cover"
              src={`${BASE_URL}${imgProduct}`}
              alt=""
            />
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  </div>

  {/* Big image preview */}
  <div className="zoomContainer w-full lg:w-[80%] 2xl:h-[500px] h-[390px] overflow-hidden">
    <Swiper
      ref={zoomSlideBig}
      slidesPerView={1}
      spaceBetween={0}
      navigation={false}
      modules={[Navigation, Pagination]}
    >
      {img.map((imgProduct, index) => (
        <SwiperSlide
          key={index}
          className="w-full !flex !items-center !justify-center"
        >
          <div className="flex items-center justify-center w-full h-full">
            <InnerImageZoom
              zoomType="hover"
              zoomScale={1}
              src={`${BASE_URL}${imgProduct}`}
              className="max-h-full object-contain"
            />
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  </div>
</div>

  );
});
