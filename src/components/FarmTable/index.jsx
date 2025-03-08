import React from "react";
import "../FarmTable/style.css";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";

const FarmTable = () => {
  return (
    <div className="farm-table 2xl:py-[4rem] lg:py-[1rem] relative">
      <div className="content-table 2xl:h-[50rem] lg:h-[37rem] md:h-[33rem] flex">
        <div className="col1 absolute lg:right-[45%] md:right-[6%] flex flex-col items-start lg:w-[35%] lg:font-normal md:font-[600] md:w-[73%] gap-6">
          <h2 className="uppercase 2xl:text-[4rem] lg:text-[2.5rem] md:text-[2rem] text-[#6B693B]">
            Farm to table
          </h2>

          <p className="2xl:text-[1.375rem] lg:text-[0.9rem] text-[#6B693B] 2xl:mt-[1.563rem] lg:mt-[0.6rem] text-justify">
            Farm to Table tại Suối Tiên Farm không chỉ là một cách thưởng thức
            thực phẩm, mà còn là hành trình kết nối bạn với thiên nhiên. Mọi thứ
            đều bắt đầu từ những khu vườn xanh mát, nơi rau củ và trái cây được
            chăm sóc tự nhiên, thu hoạch đúng mùa và mang đến bàn ăn mà không
            qua bất kỳ khâu trung gian nào.
          </p>

          <p className="2xl:text-[1.375rem] lg:text-[0.9rem] text-[#6B693B] 2xl:mt-[1.563rem] lg:mt-[0.6rem] text-justify">
            Hãy tự tay hái những loại trái cây tươi ngon, cảm nhận vị ngọt
            nguyên bản từ đất mẹ, và thưởng thức món ăn chế biến ngay tại nông
            trại. Đây không chỉ là một bữa ăn, mà là một lối sống – sạch hơn,
            lành mạnh hơn và bền vững hơn.
          </p>

          <p className="2xl:text-[1.375rem] lg:text-[0.9rem] text-[#6B693B] 2xl:mt-[1.563rem] lg:mt-[0.6rem] text-justify">
            Từ nông trại đến bàn ăn – mỗi món ăn đều là sự kết tinh của thiên
            nhiên và sự tận tâm. Bạn đã sẵn sàng trải nghiệm chưa?
          </p>

          <Link className="transition mt-[3.125rem]" to="/">
            <Button className="uppercase !text-white !w-[9.75rem] !rounded-[1.875rem] !bg-[#6B693B]">
              Đọc Thêm
            </Button>
          </Link>
        </div>
        <div className="col2 absolute right-0 top-[18%] lg:w-[60%] lg:opacity-100 md:opacity-30 md:w-[76%]">
          <img src="/thit-ham.png" alt="thit ham sung my" />
        </div>

        <div className="img-farmtb ">
        <img className="2xl:w-[16.75rem] lg:w-[11.75rem] md:w-[9.375rem] absolute left-0 2xl:top-[44%] lg:top-[25%]" src="/farm-tb.png" alt="farm-table" />
      </div>
      </div>
     
    </div>
  );
};

export default FarmTable;
