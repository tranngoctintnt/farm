import React from "react";
import "../BannerBoxV2/style.css";
import { Link } from "react-router-dom";
import BASE_URL from "../../config";

const BannerBoxV2 = (data) => {
  const imgProduct = JSON.parse(data?.data.imgProduct);
  const truncateText = (text, maxLength = 40) => {
    return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
  };
  // console.log(imgProduct);
  return (
    <div className="bannerBoxV2 w-full xl:h-[13.125rem] lg:h-[11.375rem] lg:mt-3 overflow-hidden flex items-center rounded-md group relative">
      <div className="img-list lg:p-4 max-[768px]:p-1 md:p-2">
        <img
          src={`${BASE_URL}${imgProduct[0]}`}
          alt=""
          className="xl:w-[300px] xl:min-w-[300px] h-auto group group-hover:scale-105 lg:w-[230px]
           lg:min-w-[230px] xl:h-[260px] max-md:w-[180px] md:w-[230px] md:h-[160px] max-[768px]:w-[230px] max-[768px]:h-[160px]  transition-all duration-150
           max-sm:w-[270px] max-sm:h-[130px]
           "
        />
      </div>

      <div className="info-frui flex flex-col pl-8 max-sm:pl-2 text-start justify-center gap-4 max-sm:gap-2">
        <h2 className="2xl:text-[1.488rem] lg:text-[20px] max-md:text-[14px] text-[#6B693B] uppercase">
          {data.data.nameProdcut}
        </h2>
        <span className="2xl:text-[1.25rem] lg:text-[20px] max-md:text-[14px] text-[#6B693B] w-full">
          {truncateText(data.data.tilteProdcut)}
        </span>
        <div className="w-full">
          <Link
            className="2xl:text-[1rem] lg:text-[20px] max-md:text-[14px] transition text-[#736357] uppercase pr-8 font-[600] link"
            to={`/product/${data?.data.idProduct}`}
          >
            Khám phá ngay!
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BannerBoxV2;
