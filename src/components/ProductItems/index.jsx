import React from "react";
import "../ProductItems/style.css";
import { Link } from "react-router-dom";
import { CiHeart } from "react-icons/ci";
import { MdZoomOutMap } from "react-icons/md";
import { Button } from "@mui/material";

const ProductItems = () => {
  const truncateText = (text, maxLength = 50) => {
    return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
  };
  return (
    <div className="productItem shadow-lg rounded-lg overflow-hiden border-1 border-[rgb(0,0,0,0.1)]">
      <div className="imgWrapper w-[100%] overflow-hidden rounded-md relative group">
        <Link to="/">
          <div className="img 2xl:h-[21.875rem] lg:h-[15.875rem] flex items-center !overflow-hidden justify-center">
            <img className="" src="./public/nuoc-ep-sung.png" alt="nho" />

            <img
              className=" transition-all duration-700 absolute opacity-0 group-hover:opacity-100 group-hover:scale-105"
              src="./public/ep-sung2.png"
              alt="nho"
            />
          </div>
        </Link>

        {/* <span className="discount flex items-center absolute top-[10px] p-2 font-[500] left-[10px] z-50 te bg-[#ff5252] text-white rounded-md ">
          10%
        </span> */}

        <div className="action absolute top-1 right-1 z-50 flex items-center gap-2 flex-col w-[3.125rem] transition-all duration-300 group-hover:top-[1rem] opacity-0 group-hover:opacity-100">
          {/* <Tooltip title="Add" placement="View Product Detailss"> */}

          <Button className="!w-[2.188rem] !h-[2.188rem] !min-w-[2.188rem] !rounded-full group !bg-white hover:!bg-[#ff5252] hover:text-white">
            <MdZoomOutMap className="!text-black text-[18px] group-hover:text-white hover:!text-white" />
          </Button>
          {/* </Tooltip> */}

          <Button className="!w-[2.188rem] !h-[2.188rem] !min-w-[2.188rem] !rounded-full group !bg-white hover:!bg-[#ff5252] hover:text-white">
            <CiHeart className="!text-black text-[1.125rem] group-hover:text-white hover:!text-white" />
          </Button>
        </div>
      </div>

      <div className="info p-3 py-5 bg-[rgb(247,247,247)]">
        <h6 className=" text-[0.813rem]">
          <Link to="/" className="link transition-all">
            Nho Kẹo
          </Link>
        </h6>
        <h3 className="title text-[0.875rem] mt-3 font-[500] mb-1 text-[#000]">
          <Link to="/" className="link transition-all">
            {truncateText(
              "Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry standard dummy text ever since the 1500s"
            )}
          </Link>
        </h3>
        {/* <Rating
          name="half-rating"
          defaultValue={2.5}
          precision={0.5}
          readOnly
        /> */}

        <div className="flex items-center gap-4">
          <span className="old-price line-through text-gray-500 font-[500]">
            200.000
          </span>
          <span className="old-price text-[#D86500] font-bold">
            150.000 <span>VND</span>
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProductItems;
