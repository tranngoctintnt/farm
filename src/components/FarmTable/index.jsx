import React from "react";
import "../FarmTable/style.css";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";

const FarmTable = () => {
  return (
    <div className="farm-table py-[4rem] relative">
      <div className="content-table h-[800px] flex">
        <div className="col1 absolute right-[45%] flex flex-col items-start w-[35%] gap-6">
          <h2 className="uppercase text-[64px] text-[#6B693B]">
            Farm to table
          </h2>

          <p className="text-[22px] text-[#6B693B] mt-[25px] text-justify">
            Farm to Table tại Suối Tiên Farm không chỉ là một cách thưởng thức
            thực phẩm, mà còn là hành trình kết nối bạn với thiên nhiên. Mọi thứ
            đều bắt đầu từ những khu vườn xanh mát, nơi rau củ và trái cây được
            chăm sóc tự nhiên, thu hoạch đúng mùa và mang đến bàn ăn mà không
            qua bất kỳ khâu trung gian nào.
          </p>

          <p className="text-[22px] text-[#6B693B] mt-[25px] text-justify">
            Hãy tự tay hái những loại trái cây tươi ngon, cảm nhận vị ngọt
            nguyên bản từ đất mẹ, và thưởng thức món ăn chế biến ngay tại nông
            trại. Đây không chỉ là một bữa ăn, mà là một lối sống – sạch hơn,
            lành mạnh hơn và bền vững hơn.
          </p>

          <p className="text-[22px] text-[#6B693B] mt-[25px] text-justify">
            Từ nông trại đến bàn ăn – mỗi món ăn đều là sự kết tinh của thiên
            nhiên và sự tận tâm. Bạn đã sẵn sàng trải nghiệm chưa?
          </p>

          <Link className="transition mt-[50px]" to="/">
            <Button className="uppercase !text-white !w-[156px] !rounded-[30px] !bg-[#6B693B]">
              Đọc Thêm
            </Button>
          </Link>
        </div>
        <div className="col2 absolute right-0 w-[60%]">
          <img src="/thit-ham.png" alt="thit ham sung my" />
        </div>

        <div className="img-farmtb ">
        <img className="w-[268px] absolute left-0 top-[44%]" src="/farm-tb.png" alt="farm-table" />
      </div>
      </div>
     
    </div>
  );
};

export default FarmTable;
