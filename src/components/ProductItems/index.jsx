import React from "react";
import "../ProductItems/style.css";
import { Link } from "react-router-dom";
import Rating from '@mui/material/Rating';


const ProductItems = () => {
  return (
    <div className="productItem shadow-xl rounded-md overflow-hiden border-1 border-[rgb(0,0,0,0.1)]">
      <div className="imgWrapper w-[100%] h-[250px] overflow-hidden rounded-md relative">
        <img className="w-full" src="./public/nho-xanh.jpg" alt="nho" />
       <span className="discount flex items-center absolute top-[10px] p-2 font-[500] left-[10px] z-50 te bg-[#ff5252] text-white rounded-md ">10%</span>

      </div>


      <div className="info p-3 py-5 bg-[rgb(247,247,247)]">
        <h6 className=" text-[13px]">
          <Link to="/" className="link transition-all">
            Nho Kẹo
          </Link>
        </h6>
        <h3 className="title text-[14px] mt-3 font-[500] mb-1 text-[#000]">
          <Link to="/" className="link transition-all">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s
          </Link>
        </h3>
        <Rating name="half-rating" defaultValue={2.5} precision={0.5} readOnly/>

        <div className="flex items-center gap-4">
          <span className="old-price line-through text-gray-500 font-[500]">
            200.000
          </span>
          <span className="old-price text-primary font-bold">
            150.000
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProductItems;
