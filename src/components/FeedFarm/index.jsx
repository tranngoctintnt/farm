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
      <div className="container flex">
        <Swiper
          slidesPerView={props.items}
          grid={{
            rows: 2,
            fill:"row",
          }}
          pagination={{
            clickable: true,
          }}
        //   loop={true}
        //   navigation={true}
          spaceBetween={30}
          
          modules={[Grid, Pagination, Navigation]}
          className="feedSlider"
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
