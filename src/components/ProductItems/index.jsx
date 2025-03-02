import React from "react";
import "../ProductItems/style.css";
import { Link } from "react-router-dom";

const ProductItems = () => {
  return (
    <div className="productItem rounded-md overflow-hiden">
      <div className="imgWrapper w-[100%] h-[250px] overflow-hidden rounded-md">
        <img className="w-full" src="./public/nho-xanh.jpg" alt="nho" />
      </div>

      <div className="info p-3">
        <h6 className=" text-[13px]">
          <Link to="/" className="link transition-all">
            Nho Kẹo
          </Link>
        </h6>
        <h3 className="title text-[14px] mt-3 font-[500] text-[rgb(0,0,0,0.9)]">
          <Link to="/" className="link transition-all">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s
          </Link>
        </h3>
      </div>
    </div>
  );
};

export default ProductItems;
