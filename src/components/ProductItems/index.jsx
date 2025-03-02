import React from "react";
import "../ProductItems/style.css";
import { Link } from "react-router-dom";
import Rating from "@mui/material/Rating";
import { CiHeart } from "react-icons/ci";
import { MdZoomOutMap } from "react-icons/md";
import { Button } from "@mui/material";
import Tooltip from "@mui/material/Tooltip";

const ProductItems = () => {
  return (
    <div className="productItem shadow-xl rounded-md overflow-hiden border-1 border-[rgb(0,0,0,0.1)]">
      <div className="imgWrapper w-[100%] overflow-hidden rounded-md relative group">
        <Link to="/">
          <div className="img h-[220px] !overflow-hidden">
            <img className="w-full" src="./public/nho-xanh.jpg" alt="nho" />

            <img
              className="w-full transition-all duration-700 absolute top-0 left-0 opacity-0 group-hover:opacity-100 group-hover:scale-105"
              src="./public/nho-2.jpg"
              alt="nho"
            />
          </div>
        </Link>

        <span className="discount flex items-center absolute top-[10px] p-2 font-[500] left-[10px] z-50 te bg-[#ff5252] text-white rounded-md ">
          10%
        </span>

        <div className="action absolute top-[5px] right-[3px] z-50 flex items-center gap-2 flex-col w-[50px] transition-all duration-300 group-hover:top-[15px] opacity-0 group-hover:opacity-100">
          {/* <Tooltip title="Add" placement="View Product Detailss"> */}

          <Button className="!w-[35px] !h-[35px] !min-w-[35px] !rounded-full group !bg-white hover:!bg-[#ff5252] hover:text-white">
            <MdZoomOutMap className="!text-black text-[18px] group-hover:text-white hover:!text-white" />
          </Button>
          {/* </Tooltip> */}

          <Button className="!w-[35px] !h-[35px] !min-w-[35px] !rounded-full group !bg-white hover:!bg-[#ff5252] hover:text-white">
            <CiHeart className="!text-black text-[18px] group-hover:text-white hover:!text-white" />
          </Button>
        </div>
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
        <Rating
          name="half-rating"
          defaultValue={2.5}
          precision={0.5}
          readOnly
        />

        <div className="flex items-center gap-4">
          <span className="old-price line-through text-gray-500 font-[500]">
            200.000
          </span>
          <span className="old-price text-primary font-bold">150.000</span>
        </div>
      </div>
    </div>
  );
};

export default ProductItems;
