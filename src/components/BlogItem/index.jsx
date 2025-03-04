import React from "react";
import { GoClock } from "react-icons/go";
import { Link } from "react-router-dom";
import { IoIosArrowForward } from "react-icons/io";


const BlogItem = () => {
  return (
    <div className="blogItems group">
      {/* <div className="container"> */}
      {/* <Link to='/'> */}
      <div className="imgWrapper w-full overflow-hidden rounded-md cursor-pointer relative">
        <img
          src="/blog1.webp"
          alt="blog"
          className="w-fill transiton-all group:hover:scale-105 group-hover:rotate-1"
        />

        <span className="flex items-center justify-center text-white absolute bottom-[15px] right-[15px] bg-[#ff5252] z-50 rounded-md p-1 text-[12px] font-[500] gap-2">
          <GoClock className="text-[16px] font-bold" />3 March 2025
        </span>
      </div>
      {/* </div> */}

      <div className="infoBlog py-4">
        
        <h2 className="text-[16px] font-[600] text-black mb-2">
        <Link to='/' className="link transition-all"> Achieving excellence through thoug customized solutions </Link>
        </h2>
       
        <p className="text-[13px] font-[400] text-[rgba(0,0,0,0.8)] mb-4">
          The rating can display any float number with the value prop. Use the
          precision prop to define the minimum increment value change allowed.
          You can display a label on hover to help the user pick the correct
          rating value. The demo uses the onChangeActive prop.
        </p>

        <Link to='/' className='link transition-all font-[600] text-[15px] flex items-center'>Read more <IoIosArrowForward />
        </Link>
      </div>
      {/* </Link> */}
    </div>
  );
};

export default BlogItem;
