import React from "react";
import "../FarmTable/style.css";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";

const FarmTable = () => {
  return (
    // <div className="farm-table 2xl:py-[4rem] lg:py-[1rem] relative">
    //   <div className="content-table 2xl:h-[50rem] lg:h-[37rem] md:h-[33rem] flex">
    //     <div className="col1 absolute lg:right-[45%] md:right-[6%] flex flex-col items-start lg:w-[35%] lg:font-normal md:font-[600] md:w-[73%] gap-6">
    //       <h2 className="uppercase 2xl:text-[4rem] lg:text-[2.5rem] md:text-[2rem] text-[#6B693B]">
    //         Farm to table
    //       </h2>

    //       <p className="2xl:text-[1.375rem] lg:text-[0.9rem] text-[#6B693B] 2xl:mt-[1.563rem] lg:mt-[0.6rem] text-justify">
    //         Farm to Table tại Suối Tiên Farm không chỉ là một cách thưởng thức
    //         thực phẩm, mà còn là hành trình kết nối bạn với thiên nhiên. Mọi thứ
    //         đều bắt đầu từ những khu vườn xanh mát, nơi rau củ và trái cây được
    //         chăm sóc tự nhiên, thu hoạch đúng mùa và mang đến bàn ăn mà không
    //         qua bất kỳ khâu trung gian nào.
    //       </p>

    //       <p className="2xl:text-[1.375rem] lg:text-[0.9rem] text-[#6B693B] 2xl:mt-[1.563rem] lg:mt-[0.6rem] text-justify">
    //         Hãy tự tay hái những loại trái cây tươi ngon, cảm nhận vị ngọt
    //         nguyên bản từ đất mẹ, và thưởng thức món ăn chế biến ngay tại nông
    //         trại. Đây không chỉ là một bữa ăn, mà là một lối sống – sạch hơn,
    //         lành mạnh hơn và bền vững hơn.
    //       </p>

    //       <p className="2xl:text-[1.375rem] lg:text-[0.9rem] text-[#6B693B] 2xl:mt-[1.563rem] lg:mt-[0.6rem] text-justify">
    //         Từ nông trại đến bàn ăn – mỗi món ăn đều là sự kết tinh của thiên
    //         nhiên và sự tận tâm. Bạn đã sẵn sàng trải nghiệm chưa?
    //       </p>

    //       <Link className="transition mt-[3.125rem]" to="/">
    //         <Button className="uppercase !text-white !w-[9.75rem] !rounded-[1.875rem] !bg-[#6B693B]">
    //           Đọc Thêm
    //         </Button>
    //       </Link>
    //     </div>
    //     <div className="col2 absolute right-0 top-[18%] lg:w-[60%] lg:opacity-100 md:opacity-30 md:w-[76%]">
    //       <img src="/thit-ham.png" alt="thit ham sung my" />
    //     </div>

    //     <div className="img-farmtb ">
    //     <img className="2xl:w-[16.75rem] lg:w-[11.75rem] md:w-[9.375rem] absolute left-0 2xl:top-[44%] lg:top-[25%]" src="/farm-tb.png" alt="farm-table" />
    //   </div>
    //   </div>
     
    // </div>

//     <div className="farm-table relative py-6 sm:py-8 md:py-10 lg:py-12 xl:py-14 2xl:py-[4rem] bg-gradient-to-br from-[#F9EBC8] to-[#E8E4C9] rounded-2xl shadow-xl overflow-hidden">
//   <div className="content-table relative min-h-[24rem] sm:min-h-[28rem] md:min-h-[33rem] lg:min-h-[37rem] xl:min-h-[44rem] 2xl:min-h-[50rem] flex flex-col lg:flex-row items-center justify-center px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-20">
//     {/* Cột nội dung */}
//     <div className="col1 relative z-10 w-full lg:w-[35%] flex flex-col items-start gap-4 sm:gap-5 md:gap-6 lg:gap-8 xl:gap-10 2xl:gap-6 py-6 lg:py-0">
//       <h2 className="uppercase text-[#6B693B] text-2xl sm:text-[1.8rem] md:text-2xl lg:text-[2.5rem] xl:text-[3.5rem] 2xl:text-[4rem] font-extrabold tracking-tight leading-tight">
//         Farm to Table
//       </h2>

//       <p className="text-[#6B693B] text-sm sm:text-base md:text-[1rem] lg:text-[0.9rem] xl:text-[1.2rem] 2xl:text-[1.375rem] text-justify leading-relaxed mt-2 sm:mt-3 md:mt-4 lg:mt-[0.6rem] xl:mt-6 2xl:mt-[1.563rem]">
//         Farm to Table tại Suối Tiên Farm không chỉ là một cách thưởng thức thực phẩm, mà còn là hành trình kết nối bạn với thiên nhiên. Từ những khu vườn xanh mát, rau củ và trái cây được chăm sóc tự nhiên, thu hoạch đúng mùa, mang thẳng đến bàn ăn.
//       </p>

//       <p className="text-[#6B693B] text-sm sm:text-base md:text-[1rem] lg:text-[0.9rem] xl:text-[1.2rem] 2xl:text-[1.375rem] text-justify leading-relaxed mt-2 sm:mt-3 md:mt-4 lg:mt-[0.6rem] xl:mt-6 2xl:mt-[1.563rem]">
//         Tự tay hái trái cây tươi ngon, cảm nhận vị ngọt nguyên bản, và thưởng thức món ăn chế biến ngay tại nông trại. Đây là lối sống sạch, lành mạnh và bền vững.
//       </p>

//       <p className="text-[#6B693B] text-sm sm:text-base md:text-[1rem] lg:text-[0.9rem] xl:text-[1.2rem] 2xl:text-[1.375rem] text-justify leading-relaxed mt-2 sm:mt-3 md:mt-4 lg:mt-[0.6rem] xl:mt-6 2xl:mt-[1.563rem]">
//         Mỗi món ăn là sự kết tinh của thiên nhiên và sự tận tâm. Bạn đã sẵn sàng trải nghiệm chưa?
//       </p>

//       <Link to="/" className="transition mt-6 sm:mt-8 md:mt-10 lg:mt-12 xl:mt-14 2xl:mt-[3.125rem]">
//         <Button className="uppercase !text-white !text-sm sm:!text-base md:!text-lg lg:!text-[1rem] xl:!text-[1.1rem] 2xl:!text-[1rem] !w-full sm:!w-[8rem] md:!w-[9.75rem] !rounded-[1.875rem] !bg-[#6B693B] !py-2 sm:!py-2.5 md:!py-3 !px-6 sm:!px-8 hover:!bg-[#5A5732] hover:scale-105 transition-all duration-300 shadow-md">
//           Đọc Thêm
//         </Button>
//       </Link>
//     </div>

//     {/* Hình ảnh chính */}
//     <div className="col2 relative w-full lg:w-[60%] mt-6 lg:mt-0 lg:absolute lg:right-0 lg:top-0 lg:h-full">
//       <img
//         src="/thit-ham.png"
//         alt="Thịt hầm Sung Mỹ"
//         className="w-full h-auto lg:h-full object-cover opacity-50 sm:opacity-60 md:opacity-70 lg:opacity-100"
//       />
//     </div>

//     {/* Hình ảnh trang trí */}
//     <div className="img-farmtb absolute left-0 bottom-0 w-32 sm:w-40 md:w-[9.375rem] lg:w-[11.75rem] xl:w-[14rem] 2xl:w-[16.75rem] z-20">
//       <img
//         src="/farm-tb.png"
//         alt="Farm to Table"
//         className="w-full h-auto object-cover"
//       />
//     </div>
//   </div>
// </div>
<div className="farm-table relative py-6 sm:py-8 md:py-10 lg:py-12 xl:py-14 2xl:py-[4rem] bg-gradient-to-br from-[#F9EBC8] to-[#E8E4C9] rounded-2xl shadow-xl overflow-hidden">
  <div className="content-table relative min-h-[24rem] sm:min-h-[28rem] md:min-h-[33rem] lg:min-h-[37rem] xl:min-h-[44rem] 2xl:min-h-[50rem] flex flex-col lg:flex-row items-center lg:justify-start px-4 sm:px-6 md:px-8 lg:px-48 xl:px-60 2xl:px-72">
    {/* Cột nội dung */}
    <div className="col1 relative z-10 w-full xl:w-[60%] lg:w-[70%] flex flex-col items-start gap-4 sm:gap-5 md:gap-6 lg:gap-8 xl:gap-10 2xl:gap-6 py-6 lg:py-0">
      <h2 className="uppercase text-[#6B693B] text-2xl sm:text-[1.8rem] md:text-2xl lg:text-[2.5rem] xl:text-[3.5rem] 2xl:text-[4rem] font-extrabold tracking-tight leading-tight">
        Farm to Table
      </h2>

      <p className="text-[#6B693B] !leading-8 text-sm sm:text-base md:text-[1rem] lg:text-[0.9rem] xl:text-[1.2rem] 2xl:text-[1.375rem] text-justify mt-2 sm:mt-3 md:mt-4 lg:mt-[0.6rem] xl:mt-6 2xl:mt-[1.563rem]">
        Farm to Table tại Suối Tiên Farm không chỉ là một cách thưởng thức thực phẩm, mà còn là hành trình kết nối bạn với thiên nhiên. Từ những khu vườn xanh mát, rau củ và trái cây được chăm sóc tự nhiên, thu hoạch đúng mùa, mang thẳng đến bàn ăn.
      </p>

      <p className="text-[#6B693B] !leading-8 text-sm sm:text-base md:text-[1rem] lg:text-[0.9rem] xl:text-[1.2rem] 2xl:text-[1.375rem] text-justify mt-2 sm:mt-3 md:mt-4 lg:mt-[0.6rem] xl:mt-6 2xl:mt-[1.563rem]">
        Tự tay hái trái cây tươi ngon, cảm nhận vị ngọt nguyên bản, và thưởng thức món ăn chế biến ngay tại nông trại. Đây là lối sống sạch, lành mạnh và bền vững.
      </p>

      <p className="text-[#6B693B] !leading-8 text-sm sm:text-base md:text-[1rem] lg:text-[0.9rem] xl:text-[1.2rem] 2xl:text-[1.375rem] text-justify mt-2 sm:mt-3 md:mt-4 lg:mt-[0.6rem] xl:mt-6 2xl:mt-[1.563rem]">
        Mỗi món ăn là sự kết tinh của thiên nhiên và sự tận tâm. Bạn đã sẵn sàng trải nghiệm chưa?
      </p>

      <Link to="/" className="transition mt-6 sm:mt-8 md:mt-10 lg:mt-12 xl:mt-14 2xl:mt-[3.125rem]">
        <Button className="uppercase !text-white !text-sm sm:!text-base md:!text-lg lg:!text-[1rem] xl:!text-[1.1rem] 2xl:!text-[1rem] !w-full sm:!w-[8rem] md:!w-[9.75rem] !rounded-[1.875rem] !bg-[#6B693B] !py-2 sm:!py-2.5 md:!py-3 !px-6 sm:!px-0 hover:!bg-[#5A5732] hover:scale-105 transition-all duration-300 shadow-md">
          Đọc Thêm
        </Button>
      </Link>
    </div>

    {/* Hình ảnh chính */}
    <div className="col2 relative w-full lg:w-[60%] mt-6 lg:mt-0 lg:absolute lg:right-0 lg:top-0 lg:h-full">
      <img
        src="/thit-ham.png"
        alt="Thịt hầm Sung Mỹ"
        className="w-full h-auto lg:h-full object-cover opacity-50 sm:opacity-60 md:opacity-70 lg:opacity-70"
      />
    </div>

    {/* Hình ảnh trang trí */}
    <div className="img-farmtb absolute left-0 bottom-0 w-32 sm:w-40 md:w-[9.375rem] max-[768px]:hidden lg:w-[11.75rem] xl:w-[14rem] 2xl:w-[16.75rem] z-20">
      <img
        src="/farm-tb.png"
        alt="Farm to Table"
        className="w-full h-auto object-cover"
      />
    </div>
  </div>
</div>
  );
};

export default FarmTable;
