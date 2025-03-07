import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import ProductItems from "../ProductItems";

const ProductSlider = () => {
  return (
    <section className="productSlider flex items-center justify-around py-10 gap-10">
      
            <ProductItems/>

            <ProductItems/>

            <ProductItems/>

            <ProductItems/>

      {/* </div> */}
    </section>
  );
};

export default ProductSlider;
