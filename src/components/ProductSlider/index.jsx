import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import ProductItems from "../ProductItems";

const ProductSlider = (props) => {
  return (
    <section className="productSlider flex items-center justify-around py-10 2xl:gap-10 lg:gap-4">
      <Swiper
        modules={[Navigation]}
        spaceBetween={20}
        navigation 
        // pagination={{ clickable: true }}
        className="container"
        breakpoints={{
          768: { slidesPerView: 3 },
          1024: {slidesPerView: props.items}
        }}
      >
        <SwiperSlide>
          <ProductItems />
        </SwiperSlide>

        <SwiperSlide>
          <ProductItems />
        </SwiperSlide>
        
        <SwiperSlide>
          <ProductItems />
        </SwiperSlide>
        <SwiperSlide>
          <ProductItems />
        </SwiperSlide>
        <SwiperSlide>
          <ProductItems />
        </SwiperSlide>
      </Swiper>
      {/* </div> */}
    </section>
  );
};

export default ProductSlider;
