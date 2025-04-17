import React from 'react'
import { Link } from "react-router-dom";
import { IoIosArrowForward } from "react-icons/io";


const SecBlog = () => {
    const truncateText = (text, maxLength = 50) => {
        return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
      };
  return (
    <div className="blogItems group">
    <div className="imgWrapper w-full overflow-hidden rounded-md cursor-pointer relative">
      <img
        src="/blog2.png"
        alt="blog"
        className="w-full 2xl:h-[29.688rem] lg:h-[18.75rem] md:h-[270px] max-sm:h-[200px] transiton-all group:hover:scale-105"
      />

      {/* <span className="flex items-center justify-center text-white absolute bottom-[15px] right-[15px] bg-[#ff5252] z-50 rounded-md p-1 text-[12px] font-[500] gap-2">
        <GoClock className="text-[16px] font-bold" />3 March 2025
      </span> */}
    </div>
    {/* </div> */}

    <div className="infoBlog py-4">
      <h2 className="text-[#6B693B] 2xl:text-[1.375rem] lg:text-[1rem] mb-2 font-americana">
        <Link to="/" className="link transition-all">
          
        {truncateText('Chạy Trốn Thành Phố, Tìm Về Farm! – Trải Nghiệm Một Ngày Làm Nông Dân Ở Suối Tiên')}
        </Link>
      </h2>

      <p className="text-[#6B693B] 2xl:text-[1.125rem] lg:text-[0.8rem] mb-4">
      {truncateText('Thử làm nông dân, tự tay hái quả, tận hưởng không gian trong lành – một ngày chill đúng nghĩa!')}

      </p>

      <Link
        to="/"
        className="link transition-all font-[600] 2xl:text-[0.938rem] lg:text-[0.8rem] flex items-center"
      >
        Read more <IoIosArrowForward />
      </Link>
    </div>
  </div>
  )
}

export default SecBlog;
