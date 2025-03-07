import { Button } from "@mui/material";
import React from "react";
import '../HomeBanner/style.css'
import { Link } from "react-router-dom";

const HomeBanner = () => {
  return (
    <div className="homeBanner relative flex flex-col pb-[16rem]">
      <div className="backgroundBanner bg-[#FFA500] h-[31.875rem] max-h-[31.875rem]">
        <div className="content-Banner flex flex-col relative justify-start">
          <h2 className="text-[64px] 2xl:ml-72 lg:ml-[6.25rem] text-[#fff] mt-[5.688rem] !font-americana">
            SUỐI TIÊN FARM
          </h2>
            <div className="!bg-[#f5deb3] h-[5.6rem] opacity-30"></div>
           
          <h4 className="absolute !top-[52%] 2xl:left-[15%] lg:left-[10%] text-[1.875rem] text-[#fff]">
              Nông trại 4.0 - Vừa chill, vừa chất
            </h4>
          <div className="2xl:ml-72 lg:ml-[6.25rem] pt-[5.125rem] button-banner">
            <Link to="/">
              <Button className="!bg-[#D86500] !text-[16px] !py-2 !px-9 !rounded-[20px] !text-white">ĐẶT HÀNG</Button>
            </Link>

            <Link to="/">
              <Button className="!ml-5 !text-[16px] !py-2 !px-6 !rounded-[20px] !border-solid !border-[1px] !text-white">TÌM HIỂU THÊM</Button>
            </Link>
          </div>
        </div>

      </div>

        <div className="absolute top-[23%] right-[10%]">
          <img src="./Asset1.png" alt="gio-oi" className=""/>
        </div>

    </div>
  );
};

export default HomeBanner;
