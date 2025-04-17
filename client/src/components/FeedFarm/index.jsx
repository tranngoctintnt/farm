import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/grid";
import "swiper/css/pagination";
import { Grid, Pagination, Navigation } from "swiper/modules";
import BannerBox from "../BannerBox";

const FeedFarm = (props) => {
  return (
    <div className="w-full">
      <div className="container mx-auto px-4 xl:px-16">
        <Swiper
          grid={{
            rows: 2,
            fill: "row",
          }}
          // pagination={{
          //   clickable: true,
          // }}
          spaceBetween={20}
          modules={[Grid, Pagination, Navigation]}
          className="feedSlider"
          breakpoints={{
            640: {
              slidesPerView: 1,
              grid: {
                rows: 2,
                fill: "row",
              },
            },
            768: {
              slidesPerView: 2,
              grid: {
                rows: 2,
                fill: "row",
              },
            },
            1024: {
              slidesPerView: props.items || 3,
              grid: {
                rows: 2,
                fill: "row",
              },
            },
          }}
        >
          <SwiperSlide>
            <BannerBox img="/feed1.png" />
          </SwiperSlide>
          <SwiperSlide>
            <BannerBox img="/feed2.png" />
          </SwiperSlide>
          <SwiperSlide>
            <BannerBox img="/feed3.png" />
          </SwiperSlide>
          <SwiperSlide>
            <BannerBox img="/feed4.png" />
          </SwiperSlide>
          <SwiperSlide>
            <BannerBox img="/feed5.png" />
          </SwiperSlide>
          <SwiperSlide>
            <BannerBox img="/feed2.png" />
          </SwiperSlide>
          <SwiperSlide>
            <BannerBox img="/feed5.png" />
          </SwiperSlide>
          <SwiperSlide>
            <BannerBox img="/feed1.png" />
          </SwiperSlide>
          <SwiperSlide>
            <BannerBox img="/feed3.png" />
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
  );
};

export default FeedFarm;