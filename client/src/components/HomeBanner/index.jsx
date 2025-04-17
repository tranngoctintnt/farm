import { Button } from "@mui/material";
import React from "react";
import '../HomeBanner/style.css'
import { Link } from "react-router-dom";

const HomeBanner = () => {
  return (
    // <div className="homeBanner relative flex flex-col 2xl:pb-[16rem] lg:pb-[3rem]">
    //   <div className="backgroundBanner bg-[#FFA500] lg:h-[31.875rem] md:h-[25.875rem] max-h-[31.875rem]">
    //     <div className="content-Banner flex flex-col relative justify-start">
    //       <h2 className="lg:text-[4rem] 2xl:ml-72 md:text-[2rem] md:ml-[6.25rem] text-[#fff] mt-[5.688rem] !font-americana">
    //         SUỐI TIÊN FARM
    //       </h2>
    //         <div className="!bg-[#f5deb3] h-[5.6rem] opacity-30"></div>
           
    //       <h4 className="absolute lg:!top-[52%] md:!top-[49%] 2xl:left-[15%] md:left-[10%] lg:text-[1.875rem] md:text-[1.3rem] text-[#fff]">
    //           Nông trại 4.0 - Vừa chill, vừa chất
    //         </h4>
    //       <div className="2xl:ml-72 md:ml-[6.25rem] lg:pt-[5.125rem] md:pt-[3rem] button-banner">
    //         <Link to="/productList">
    //           <Button className="!bg-[#D86500] lg:!text-[1rem] md:!text-[0.8rem] lg:!py-2 !px-7 !rounded-[1.25rem] !text-white">ĐẶT HÀNG</Button>
    //         </Link>

    //         <Link to="/">
    //           <Button className="!ml-5 lg:!text-[1rem] md:!text-[0.8rem] lg:!py-2 lg:!px-6 md:!px-2 !rounded-[1.25rem] !border-solid !border-[1px] !text-white">TÌM HIỂU THÊM</Button>
    //         </Link>
    //       </div>
    //     </div>

    //   </div>

    //     <div className="absolute 2xl:top-[23%] 2xl:right-[10%] md:top-[39%] md:right-[3%]">
    //       <img src="./Asset1.png" alt="gio-oi" className="2xl:w-full md:w-[21rem]"/>
    //     </div>

    // </div>

    <div className="homeBanner relative flex flex-col 2xl:pb-[9rem] lg:pb-[3rem]">
  {/* Background Banner */}
  <div className="backgroundBanner bg-[#FFA500] lg:h-[31.875rem] md:h-[25.875rem] max-h-[31.875rem]">
    <div className="content-Banner max-md:py-[40px] flex flex-col relative justify-start">
      {/* Title */}
      <h2 className="lg:text-[4rem] md:text-[2.5rem] sm:text-[2rem] max-sm:mt-[2.688rem] text-[1.5rem] 2xl:ml-72 md:ml-[6.25rem] sm:ml-8 ml-4 text-[#fff] mt-[5.688rem] font-americana">
        SUỐI TIÊN FARM
      </h2>

      {/* Decorative Bar */}
      <div className="bg-[#f5deb3] h-[5.6rem] opacity-30 mt-4 sm:mt-6 md:mt-8"></div>

      {/* Subtitle */}
      <h4 className="absolute lg:top-[56%] md:top-[59%] sm:top-[59%] top-[40%] max-sm:top-[52%] 2xl:left-[15%] md:left-[10%] sm:left-8 left-4 max-sm:top-[52 %] lg:text-[1.875rem] md:text-[1.5rem] sm:text-[1.2rem] text-[1rem] text-[#fff]">
        Nông trại 4.0 - Vừa chill, vừa chất
      </h4>

      {/* Buttons */}
      <div className="2xl:ml-72 md:ml-[6.25rem] sm:ml-8 ml-4 lg:pt-[5.125rem] md:pt-[3rem] pt-6  flex gap-4">
        <Link to="/productList">
          <Button className="!bg-[#D86500] lg:!text-[1rem] md:!text-[0.8rem] max-sm:!text[12px] lg:!py-1 !px-6 !rounded-[1.25rem] !text-white">
            ĐẶT HÀNG
          </Button>
        </Link>

        <Link to="/">
          <Button className="!ml-5 max-sm:!ml-0 lg:!text-[1rem] md:!text-[0.8rem] max-sm:!text[12px] lg:!py-1 lg:!px-6 md:!px-2 !rounded-[1.25rem] !border-solid !border-[1px] !text-white">
            TÌM HIỂU THÊM
          </Button>
        </Link>
      </div>
    </div>
  </div>

  {/* Image */}
  <div className="absolute 2xl:top-[62%] 2xl:right-[10%] md:top-[79%] md:right-[3%] sm:top-[81%] sm:right-[5%] top-[50%] max-sm:hidden max-sm:top-[81%] max-sm:right-[7%] right-[5%] transform -translate-y-1/2">
    <img
      src="./Asset1.png"
      alt="gio-oi"
      className="2xl:w-[30rem] lg:w-[25rem] md:w-[20rem] sm:w-[15rem] w-[12rem]"
    />
  </div>
</div>
  );
};

export default HomeBanner;
