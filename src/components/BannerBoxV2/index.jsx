import React from "react";
import "../BannerBoxV2/style.css";
import { Link } from "react-router-dom";

const BannerBoxV2 = (props) => {
  return (
    <div className="bannerBoxV2 w-full overflow-hidden rounded-md group relative">
      <img
        src={props.image}
        alt=""
        className="w-full group group-hover:scale-105 transition-all duration-150"
      />

      <div
        className={`info absolute top-0 p-5 ${
          props.info === "left" ? "left-0" : "right-0"
        } w-[70%] h-[100%] z-50 flex items-center justify-center flex-col gap-2 ${
          props.info === "left" ? "" : "pl-16"
        }`}
      >
        <h2 className="text-[18px] font-[600] w-full">Sung My</h2>
        <span className="text-[20px] text-primary font-[600] w-full">
          300.000
        </span>
        <div className="w-full">
          <Link className="text-[16px] font-[600] link" to="/">
            SHOP NOW
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BannerBoxV2;
