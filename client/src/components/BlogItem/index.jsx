import React from "react";
import { GoClock } from "react-icons/go";
import { Link } from "react-router-dom";
import { IoIosArrowForward } from "react-icons/io";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const BlogItem = () => {
  const truncateText = (text, maxLength = 50) => {
    return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
  };
  return (
    <div className="flex">
      <Swiper
      modules={[Navigation, Pagination]}
      spaceBetween={20}
      slidesPerView={3}
      navigation
      // pagination={{ clickable: true }}
      className="w-full"
      breakpoints={{
        380: { slidesPerView: 1 },
        640:{ slidesPerView: 1 },
        768: { slidesPerView: 2 },
        1024: { slidesPerView: 2 },
        1280: { slidesPerView: 3 },
        1536: { slidesPerView: 3 },
      }}
    >
      <SwiperSlide> 
            <div className="blogItems group">
              <div className="imgWrapper w-full overflow-hidden rounded-md cursor-pointer relative">
                <img
                  src="/blog3.png"
                  alt="blog"
                  className="w-full transiton-all group:hover:scale-105"
                />

                {/* <span className="flex items-center justify-center text-white absolute bottom-[15px] right-[15px] bg-[#ff5252] z-50 rounded-md p-1 text-[12px] font-[500] gap-2">
                  <GoClock className="text-[16px] font-bold" />3 March 2025
                </span> */}
              </div>
              {/* </div> */}

              <div className="infoBlog py-4">
                <h2 className="text-[1rem] font-[600] text-black mb-2">
                  <Link to="/" className="link transition-all">
                    {truncateText('Nho Mẫu Đơn Suối Tiên – Ngọt Như Crush, Chất Như Người Yêu Cũ!')}
                  
                  </Link>
                </h2>

                <p className="text-[0.8rem] font-[400] text-[rgba(0,0,0,0.8)] mb-4">
                {truncateText('Thử làm nông dân, tự tay hái quả, tận hưởng không gian trong lành – một ngày chill đúng nghĩa!')}
                </p>

                <Link
                  to="/"
                  className="link transition-all font-[600] text-[0.8rem] flex items-center"
                >
                  Read more <IoIosArrowForward />
                </Link>
              </div>
            </div>
      </SwiperSlide>

      <SwiperSlide> 
            <div className="blogItems group">
              <div className="imgWrapper w-full overflow-hidden rounded-md cursor-pointer relative">
                <img
                  src="/blog4.png"
                  alt="blog"
                  className="w-full transiton-all group:hover:scale-105"
                />

                {/* <span className="flex items-center justify-center text-white absolute bottom-[15px] right-[15px] bg-[#ff5252] z-50 rounded-md p-1 text-[12px] font-[500] gap-2">
                  <GoClock className="text-[16px] font-bold" />3 March 2025
                </span> */}
              </div>
              {/* </div> */}

              <div className="infoBlog py-4">
                <h2 className="text-[1rem] font-[600] text-black mb-2">
                  <Link to="/" className="link transition-all">
                    
                  {truncateText('Sung Mỹ –  Vì Sao Được Giới Sành Ăn Yêu Thích?')}
                  </Link>
                </h2>

                <p className="text-[0.8rem] font-[400] text-[rgba(0,0,0,0.8)] mb-4">
                {truncateText('Giống sung siêu phẩm, ngọt thanh, giàu dinh dưỡng – khám phá hành trình từ farm đến bàn ăn!')}

                </p>

                <Link
                  to="/"
                  className="link transition-all font-[600] text-[0.8rem] flex items-center"
                >
                  Read more <IoIosArrowForward />
                </Link>
              </div>
            </div>
      </SwiperSlide>

      <SwiperSlide> 
            <div className="blogItems group">
              <div className="imgWrapper w-full overflow-hidden rounded-md cursor-pointer relative">
                <img
                  src="/blog5.png"
                  alt="blog"
                  className="w-full transiton-all group:hover:scale-105"
                />

                {/* <span className="flex items-center justify-center text-white absolute bottom-[15px] right-[15px] bg-[#ff5252] z-50 rounded-md p-1 text-[12px] font-[500] gap-2">
                  <GoClock className="text-[16px] font-bold" />3 March 2025
                </span> */}
              </div>
              {/* </div> */}

              <div className="infoBlog py-4">
                <h2 className="text-[1rem] font-[600] text-black mb-2">
                  <Link to="/" className="link transition-all">
                    
                    {truncateText('A Nông Trại 4.0 – Hành Trình Từ Hạt Giống Đến Bàn Ăn!')}
                  </Link>
                </h2>

                <p className="text-[0.8rem] font-[400] text-[rgba(0,0,0,0.8)] mb-4">
                {truncateText('Từ công nghệ xanh đến những bữa ăn lành mạnh – Suối Tiên Farm biến thực phẩm sạch thành phong cách sống!')}

                </p>

                <Link
                  to="/"
                  className="link transition-all font-[600] text-[0.8rem] flex items-center"
                >
                  Read more <IoIosArrowForward />
                </Link>
              </div>
            </div>
      </SwiperSlide>

      <SwiperSlide> 
            <div className="blogItems group">
              <div className="imgWrapper w-full overflow-hidden rounded-md cursor-pointer relative">
                <img
                  src="/blog4.png"
                  alt="blog"
                  className="w-full transiton-all group:hover:scale-105"
                />

                {/* <span className="flex items-center justify-center text-white absolute bottom-[15px] right-[15px] bg-[#ff5252] z-50 rounded-md p-1 text-[12px] font-[500] gap-2">
                  <GoClock className="text-[16px] font-bold" />3 March 2025
                </span> */}
              </div>
              {/* </div> */}

              <div className="infoBlog py-4">
                <h2 className="text-[16px] font-[600] text-black mb-2">
                  <Link to="/" className="link transition-all">
                    
                  {truncateText('Nông Trại 4.0 – Hành Trình Từ Hạt Giống Đến Bàn Ăn!')}
                  </Link>
                </h2>

                <p className="text-[13px] font-[400] text-[rgba(0,0,0,0.8)] mb-4">
                {truncateText('Từ công nghệ xanh đến những bữa ăn lành mạnh – Suối Tiên Farm biến thực phẩm sạch thành phong cách sống!')}

                </p>

                <Link
                  to="/"
                  className="link transition-all font-[600] text-[15px] flex items-center"
                >
                  Read more <IoIosArrowForward />
                </Link>
              </div>
            </div>
      </SwiperSlide>
    </Swiper>
      </div>
    
  );
};

export default BlogItem;
