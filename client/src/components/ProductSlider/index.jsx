import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import ProductItems from "../ProductItems";

const ProductSlider = ({ items, data }) => {
  return (
    <div className="productSlider w-full flex items-center justify-around lg:py-10 2xl:gap-10 max-md:py-0 lg:gap-4">
      <Swiper
        modules={[Navigation]}
        spaceBetween={20}
        navigation 
        // pagination={{ clickable: true }}
        className="container"
        breakpoints={{
          768: {slidesPerView: 2 },
          1024: {slidesPerView: items}
        }}
      >
        {data.map((product, index) => (
        <SwiperSlide key={index}>
          <ProductItems product={product}/>
        </SwiperSlide>
        ))}
      </Swiper>
      {/* </div> */}
    </div>
    
  );
};

export default ProductSlider;
