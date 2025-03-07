import React from "react";
import { Link } from "react-router-dom";

const BannerBox = (props) => {
  return (
    <div className="box bannerBox w-full rounded-2xl group">
      <Link to='/'>
        <img src={props.img} alt="Ads" className="transition-all rounded-2xl group-hover:scale-105 group-hover:rotate-1 w-full" />
      </Link>
    </div>
  );
};

export default BannerBox;
