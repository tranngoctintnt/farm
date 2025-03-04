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

const Footer = () => {
  return (
    <footer className="pt-6 bg-[#fafafa]">
      <div className="container">
        <div className="topInfo py-4 w-[88%] m-auto flex items-center justify-center gap-2 pb-4 border-b">
          <div className="col flex items-center gap-3 py-3 px-10 border-r">
            <GiFruitBowl className="text-[26px]" />
            <span>Everyday fresh products</span>
          </div>
          <div className="col flex items-center gap-3 py-3 px-10 border-r">
            <LiaShippingFastSolid className="text-[26px] " />
            <span>Free delivery for order over $70</span>
          </div>
          <div className="col flex items-center gap-3 py-3 px-10 border-r">
            <RiDiscountPercentLine className="text-[26px] " />
            <span>Daily Mega Discounts</span>{" "}
          </div>
          <div className="col flex items-center gap-3 py-3 px-10">
            <CiBadgeDollar className="text-[26px]" />
            <span>Best price on the market</span>
          </div>
        </div>

        <div className="footer flex py-10">
          <div className="contactUs w-[33.3333%] border-r">
            <h2 className="mb-4 text-[18px] font-[600]">Contact us</h2>
            <p className="text-[14px] mb-4">
              Suoi Tien Theme Park
              <br />
              120 Xa Lo Ha Noi - Phuong Tan Phu - Tp.Thu Duc - Tp.HCM
            </p>

            <Link to="mailto:phongkinhdoanh@suoitien.com" className="link">
              phongkinhdoanh@suoitien.com
            </Link>

            <span className="text-[25px] font-[600] block w-full mt-3 text-primary">
              1900 636 787
            </span>

            <div className="flex items-center">
              <IoChatboxOutline className="text-[40px] text-primary" />
              <span className="text-[17px] font-[600] pl-5">
                Online Chat <br />
                Get Expert Help
              </span>
            </div>
          </div>

          <div className="productFooter w-[33.3333%] pl-8">
            <h2 className="mb-4 text-[18px] font-[600]">Products</h2>
            <ul className="list">
              <li className="list-none w-full text-[16px] mb-3">
                <Link className="link" to="/">
                  Prices drop
                </Link>
              </li>
              <li className="list-none w-full text-[16px] mb-3">
                <Link className="link" to="/">
                  New products
                </Link>
              </li>
              <li className="list-none w-full text-[16px] mb-3">
                <Link className="link" to="/">
                  Best sales
                </Link>
              </li>
              <li className="list-none w-full text-[16px] mb-3">
                <Link className="link" to="/">
                  Contact us
                </Link>
              </li>
            </ul>
          </div>

          <div className="company w-[33.333%]">
            <h2 className="mb-4 text-[18px] font-[600]">Our Company</h2>

            <ul className="list">
              <li className="list-none w-full text-[16px] mb-3">
                <Link className="link" to="/">
                  Delivery
                </Link>
              </li>
              <li className="list-none w-full text-[16px] mb-3">
                <Link className="link" to="/">
                  Legal Notice
                </Link>
              </li>
              <li className="list-none w-full text-[16px] mb-3">
                <Link className="link" to="/">
                  Terms and conditions of use
                </Link>
              </li>
              <li className="list-none w-full text-[16px] mb-3">
                <Link className="link" to="/">
                  About us
                </Link>
              </li>
            </ul>
          </div>
        </div>

       
      </div>
      <div className="bottomStrip border-t border-[rgba(0,0,0,0.1)] py-3 bg-white">
          
          <div className="copyRight container items-center justify-between mt-3 pt-3 pb-3 flex">
            <p className="mb-0">Copyright 2024. All rights reserved</p>

            <ul className="list flex list-inline ml-auto gap-4 mb-0 socials">
              <li className="list-none">
                <Link
                  to="/"
                  className="w-[35px] h-[35px] rounded-full border border-[rgba(0,0,0,0.1)] flex items-center justify-center group hover:bg-[#ff5252] transition-all"
                >
                  <FaFacebookF className="text-[21px] text-[#595f6a] group-hover:text-white" />
                </Link>
              </li>
              <li className="list-none ">
                <Link
                  to="/"
                  className="w-[35px] h-[35px] rounded-full border border-[rgba(0,0,0,0.1)] flex items-center justify-center group hover:bg-[#ff5252] transition-all"
                >
                  <FaInstagram className="text-[21px] text-[#595f6a] group-hover:text-white" />
                </Link>
              </li>
              <li className="list-none ">
                <Link
                  to="/"
                  className="w-[35px] h-[35px] rounded-full border border-[rgba(0,0,0,0.1)] flex items-center justify-center group hover:bg-[#ff5252] transition-all"
                >
                  <FaTiktok className="text-[21px] text-[#595f6a] group-hover:text-white" />
                </Link>
              </li>
            </ul>
          </div>
          
         
        </div>
    </footer>
  );
};

export default Footer;
