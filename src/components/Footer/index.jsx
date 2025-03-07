import React from "react";
import { GiFruitBowl } from "react-icons/gi";
import { LiaShippingFastSolid } from "react-icons/lia";
import { RiDiscountPercentLine } from "react-icons/ri";
import { CiBadgeDollar } from "react-icons/ci";
import { Link } from "react-router-dom";
import { IoChatboxOutline } from "react-icons/io5";
import { FaFacebookF } from "react-icons/fa6";
import { FaTiktok } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import '../Footer/style.css'
import { Button } from "@mui/material";

const Footer = () => {
  return (
    <footer className="pt-6 relative h-[700px]">
      <div className="container absolute left-[15%] top-[19%] flex flex-col items-center justify-center">
        <img className="w-[200px] h-[200px] m-w-[200px]" src="/logo-stf.png" alt="logo footer" />

        <div className="social flex gap-8">
          <Link className="transition" to='/'>
            <img src="/fb.png" alt="facebook" />
          </Link>

          <Link className="transition" to='/'>
            <img src="/mess.png" alt="mess" />
          </Link>

          <Link className="transition" to='/'>
            <img src="/zalo.png" alt="zalo" />
          </Link>

          
        </div>

        <div className="location flex items-center gap-6 py-[30px]">
            <img src="/location.png" alt="location" />
            <span className="text-[#6B693B]">
            120 Xa Lộ Hà Nội, P. Tân Phú, TP. Thủ Đức, TP.HCM
            </span>
        </div>

        <div className="footer-contact flex items-center gap-6">
            <img src="/phone.png" alt="location" />
            <span className="text-[#6B693B]">
           0914 347 787
            </span>

            <img src="/clock.png" alt="location" />
            <span className="text-[#6B693B]">
           8.00 am - 5.00 pm (Tư vấn 24/7)
            </span>
        </div>

        <div className="footer-contact flex items-center gap-6 py-[20px]">
            <img src="/qa.png" alt="location" />
            <span className="text-[#6B693B]">
           Câu hỏi thường gặp (FAQ)
            </span>

            <img src="/manual.png" alt="location" />
            <span className="text-[#6B693B]">
           Hướng dẫn đặt hàng
            </span>
        </div>
      </div>
     
    </footer>
  );
};

export default Footer;
