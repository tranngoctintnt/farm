import React from "react";
import "../BannerBoxV2/style.css";
import { Link } from "react-router-dom";
import BASE_URL from "../../config";

const BannerBoxV2 = (data) => {

  const imgProduct = JSON.parse(data?.data.imgProduct)
  // console.log(imgProduct);
  return (
    <div className="bannerBoxV2 w-full 2xl:h-[13.125rem] lg:h-[9.375rem] lg:mt-3 overflow-hidden flex items-center rounded-md group relative">
      <div className="img-list p-4">
      <img
        src={`${BASE_URL}${imgProduct[0]}`}
        alt=""
        className="w-[300px] group group-hover:scale-105 max-md:w-[180px] max-[768px]:w-[200px] transition-all duration-150"
      />
      </div>
      

      <div
        className='info-frui flex flex-col pl-8 max-sm:pl-2 text-start justify-center gap-4'
      >
        <h2 className="2xl:text-[2.188rem] max-md:text-[14px] text-[#6B693B] uppercase">{data.data.nameProdcut}</h2>
        <span className="2xl:text-[1.25rem] max-md:text-[14px] text-[#6B693B] w-full">
        {data.data.tilteProdcut}
        </span>
        <div className="w-full">
          <Link className="2xl:text-[1rem] max-md:text-[14px] transition text-[#736357] uppercase pr-8 font-[600] link" to={`/product/${data?.data.idProduct}`}>
            Khám phá ngay!
          </Link>
        </div>
      </div>
    </div>

   
  );
};

export default BannerBoxV2;
