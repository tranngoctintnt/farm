import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import ProductItems from "../ProductItems";

const ProductSlider = (props) => {
  return (
    <section className="productSlider py-3">
        <Swiper
          // install Swiper modules
          modules={[Navigation]}
          spaceBetween={10}
          slidesPerView={props.items}
          navigation={true}
          className="futureCate"
        >
          <SwiperSlide>
            <ProductItems/>
          </SwiperSlide>

          <SwiperSlide>
            <ProductItems/>
          </SwiperSlide>

          <SwiperSlide>
            <ProductItems/>
          </SwiperSlide>

          <SwiperSlide>
            <ProductItems/>
          </SwiperSlide>

          <SwiperSlide>
            <ProductItems/>
          </SwiperSlide>

          <SwiperSlide>
            <ProductItems/>
          </SwiperSlide>
        </Swiper>
      {/* </div> */}
    </section>
  );
};

export default ProductSlider;
