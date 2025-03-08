import { Button } from "@mui/material";
import React from "react";
import '../HomeBanner/style.css'
import { Link } from "react-router-dom";

const HomeBanner = () => {
  return (
    <div className="homeBanner relative flex flex-col 2xl:pb-[16rem] lg:pb-[3rem]">
      <div className="backgroundBanner bg-[#FFA500] lg:h-[31.875rem] md:h-[25.875rem] max-h-[31.875rem]">
        <div className="content-Banner flex flex-col relative justify-start">
          <h2 className="lg:text-[4rem] 2xl:ml-72 md:text-[2rem] md:ml-[6.25rem] text-[#fff] mt-[5.688rem] !font-americana">
            SUỐI TIÊN FARM
          </h2>
            <div className="!bg-[#f5deb3] h-[5.6rem] opacity-30"></div>
           
          <h4 className="absolute lg:!top-[52%] md:!top-[49%] 2xl:left-[15%] md:left-[10%] lg:text-[1.875rem] md:text-[1.3rem] text-[#fff]">
              Nông trại 4.0 - Vừa chill, vừa chất
            </h4>
          <div className="2xl:ml-72 md:ml-[6.25rem] lg:pt-[5.125rem] md:pt-[3rem] button-banner">
            <Link to="/">
              <Button className="!bg-[#D86500] lg:!text-[1rem] md:!text-[0.8rem] lg:!py-2 !px-7 !rounded-[1.25rem] !text-white">ĐẶT HÀNG</Button>
            </Link>

            <Link to="/">
              <Button className="!ml-5 lg:!text-[1rem] md:!text-[0.8rem] lg:!py-2 lg:!px-6 md:!px-2 !rounded-[1.25rem] !border-solid !border-[1px] !text-white">TÌM HIỂU THÊM</Button>
            </Link>
          </div>
        </div>

      </div>

        <div className="absolute 2xl:top-[23%] 2xl:right-[10%] md:top-[39%] md:right-[3%]">
          <img src="./Asset1.png" alt="gio-oi" className="2xl:w-full md:w-[21rem]"/>
        </div>

    </div>
  );
};

export default HomeBanner;
