import React, { useContext } from "react";

import { Link } from "react-router-dom";
import '../Footer/style.css'
// import { Button } from "@mui/material";
// import { GiFruitBowl } from "react-icons/gi";
// import { LiaShippingFastSolid } from "react-icons/lia";
// import { RiDiscountPercentLine } from "react-icons/ri";
// import { CiBadgeDollar } from "react-icons/ci";
import Drawer from '@mui/material/Drawer';
import { IoCloseSharp } from "react-icons/io5";
import CartPanel from "../CartPanel";
import { MyContext } from "../../App";


const Footer = () => {
  const context = useContext(MyContext);
  return (
    

    <footer className="relative bg-[#F9F9F9] bg-cover 2xl:h-[41.75rem] lg:h-[28rem] md:h-[28rem] max-sm:h-[30rem]">
  {/* Logo và Social Links */}
  <div className=" absolute w-full max-[768px]:w-full max-[768px]:py-10 max-md:left-0 2xl:top-[19%] lg:top-[12%] flex flex-col items-center justify-center px-4 sm:px-6 md:px-8">
    {/* Logo */}
    <img
      className="2xl:w-[12.5rem] 2xl:h-[12.5rem] lg:w-[9.5rem] lg:h-[9.5rem] w-[7rem] h-[7rem]"
      src="/logo-stf.png"
      alt="logo footer"
    />

    {/* Social Links */}
    <div className="social flex justify-center gap-6 sm:gap-8 mt-4">
      <Link className="transition hover:opacity-80" to="/">
        <img src="/fb.png" alt="facebook" className="w-8 h-8 sm:w-10 sm:h-10" />
      </Link>
      <Link className="transition hover:opacity-80" to="/">
        <img src="/mess.png" alt="mess" className="w-8 h-8 sm:w-10 sm:h-10" />
      </Link>
      <Link className="transition hover:opacity-80" to="/">
        <img src="/zalo.png" alt="zalo" className="w-8 h-8 sm:w-10 sm:h-10" />
      </Link>
    </div>

<div className="flex flex-col items-center gap-4">
{/* Location */}
<div className="location flex sm:flex-row items-center gap-4 sm:gap-6 mt-6 text-center sm:text-left">
      <img src="/location.png" alt="location" className="w-6 h-6 sm:w-6 sm:h-6" />
      <span className="text-[#6B693B] text-sm sm:text-base md:text-lg">
        120 Xa Lộ Hà Nội, P. Tân Phú, TP. Thủ Đức, TP.HCM
      </span>
    </div>

    {/* Contact Info */}
    <div className="footer-contact flex flex-col sm:flex-row items-center gap-4 sm:gap-6 mt-4 text-center sm:text-left">
      <div className="flex items-center gap-2">
        <img src="/phone.png" alt="phone" className="w-6 h-6 sm:w-6 sm:h-6" />
        <span className="text-[#6B693B] text-sm sm:text-base md:text-lg">
          0914 347 787
        </span>
      </div>
      <div className="flex items-center gap-2">
        <img src="/clock.png" alt="clock" className="w-6 h-6 sm:w-6 sm:h-6" />
        <span className="text-[#6B693B] text-sm sm:text-base md:text-lg">
          8.00 am - 5.00 pm (Tư vấn 24/7)
        </span>
      </div>
    </div>

    {/* FAQ and Manual */}
    <div className="footer-contact flex flex-col sm:flex-row sm:items-start md:items-center gap-4 sm:gap-6 mt-4 text-center sm:text-left">
      <div className="flex items-center gap-2">
        <img src="/qa.png" alt="faq" className="w-6 h-6 sm:w-6 sm:h-6" />
        <span className="text-[#6B693B] text-sm sm:text-base md:text-lg">
          Câu hỏi thường gặp (FAQ)
        </span>
      </div>
      <div className="flex items-center gap-2">
        <img src="/manual.png" alt="manual" className="w-6 h-6 sm:w-6 sm:h-6" />
        <span className="text-[#6B693B] text-sm sm:text-base md:text-lg">
          Hướng dẫn đặt hàng
        </span>
      </div>
    </div>
</div>
    
  </div>

  {/* Cart Panel */}
  <Drawer
    open={context.openCartPanel}
    onClose={context.toggleCartPanel(false)}
    className="cartPanel"
    anchor={"right"}
  >
    <div className="flex items-center justify-between py-5 px-6 gap-4 border-b border-[rgba(0,0,0,0.1)]">
      <h4>Giỏ hàng</h4>
      <IoCloseSharp
        onClick={context.toggleCartPanel(false)}
        className="text-[1.3rem] cursor-pointer"
      />
    </div>
    <CartPanel />
  </Drawer>
</footer>
  );
};

export default Footer;
