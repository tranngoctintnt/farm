import React from "react";
import "../BannerBoxV2/style.css";
import { Link } from "react-router-dom";

const BannerBoxV2 = (props) => {
  return (
    <div className="bannerBoxV2 w-full 2xl:h-[13.125rem] lg:h-[9.375rem] overflow-hidden flex items-center rounded-md group relative">
      <div className="img-list ">
      <img
        src={props.image}
        alt=""
        className="w-full group group-hover:scale-105 transition-all duration-150"
      />
      </div>
      

      <div
        className='info-frui flex flex-col pl-8 justify-center gap-4'
      >
        <h2 className="2xl:text-[2.188rem] text-[#6B693B] uppercase">Nho Mẫu Đơn</h2>
        <span className="2xl:text-[1.25rem] text-[#6B693B] w-full">
        Ngọt thanh, căng mọng, thơm như chạm vào mùa hè! Bạn đã thử chưa?
        </span>
        <div className="w-full">
          <Link className="2xl:text-[1rem] transition text-[#736357] uppercase pr-8 font-[600] link" to="/">
            Khám phá ngay!
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BannerBoxV2;
