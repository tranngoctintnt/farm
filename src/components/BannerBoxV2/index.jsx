import React from "react";
import "../BannerBoxV2/style.css";
import { Link } from "react-router-dom";

const BannerBoxV2 = (props) => {
  return (
    <div className="bannerBoxV2 w-full overflow-hidden flex rounded-md group relative">
      <div className="img-list">
      <img
        src={props.image}
        alt=""
        className="w-full group group-hover:scale-105 transition-all duration-150"
      />
      </div>
      

      <div
        className='info-frui flex flex-col pl-8 justify-center gap-4'
      >
        <h2 className="text-[35px] text-[#6B693B] uppercase">Nho Mẫu Đơn</h2>
        <span className="text-[20px] text-[#6B693B] w-full">
        Ngọt thanh, căng mọng, thơm như chạm vào mùa hè! Bạn đã thử chưa?
        </span>
        <div className="w-full">
          <Link className="text-[16px] transition text-[#736357] uppercase pr-8 font-[600] link" to="/">
            Khám phá ngay!
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BannerBoxV2;
