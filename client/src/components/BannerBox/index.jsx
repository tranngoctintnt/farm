import React from "react";
import { Link } from "react-router-dom";

const BannerBox = (props) => {
  return (
    <div className="box bannerBox h-[180px] sm:h-[150px] md:h-[200px] lg:h-[250px] w-full rounded-2xl group overflow-hidden">
      <Link to="/">
        <img
          src={props.img}
          alt="Ads"
          className="transition-all h-full w-full rounded-2xl object-cover group-hover:scale-105 group-hover:rotate-1"
        />
      </Link>
    </div>
  );
};

export default BannerBox;
