import { Button } from "@mui/material";
import React from "react";
import '../HomeBanner/style.css'
import { Link } from "react-router-dom";

const HomeBanner = () => {
  return (
    <div className="homeBanner">
      <div className="backgroundBanner bg-[#FFA500] h-[510px] max-h-[510px]">
        <div className="content-Banner flex flex-col relative justify-start">
          <h2 className="text-[64px] ml-[300px]  text-[#fff] mt-[91px]">
            SUỐI TIÊN FARM
          </h2>
            <div className="!bg-[#f5deb3] h-[91px] opacity-30"></div>
           
          <h4 className="absolute !top-[52%] left-[16%] text-[30px] text-[#fff]">
              Nông trại 4.0 - Vừa chill, vừa chất
            </h4>
          <div className=" ml-[300px] mt-[82px] button-banner">
            <Link to="/">
              <Button className="!bg-[#D86500] !text-[16px] !py-2 !px-9 !rounded-[20px] !text-white">ĐẶT HÀNG</Button>
            </Link>

            <Link to="/">
              <Button className="!ml-5 !text-[16px] !py-2 !px-6 !rounded-[20px] !border-solid !border-[1px] !text-white">TÌM HIỂU THÊM</Button>
            </Link>
          </div>
        </div>

      </div>

        <div className="bg-white relative h-[200px] max-h-[200px]">
          <img src="./Asset1.png" alt="gio-oi" className="absolute top-[-170%] right-[17%]"/>
        </div>

    </div>
  );
};

export default HomeBanner;
