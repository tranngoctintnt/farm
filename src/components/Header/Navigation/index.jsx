import { Button } from "@mui/material";
import React from "react";
import { LuMenu } from "react-icons/lu";
import { FaAngleDown } from "react-icons/fa";
import { Link } from "react-router-dom";
import "../Navigation/style.css";

const Navigation = () => {
  return (
    <nav className="py-2">
      <div className="container flex items-center justify-end gap-5">
        <div className="col_1 w-[30%]">
          <Button className="!px-4 !bg-[#2e7d32] !text-white !rounded-[30px] gap-2">
            <span className="text-[18px]">
              <LuMenu />
            </span>
            <span>Shop by Categories</span>
            <span className="text-[18px] ml-auto">
              <FaAngleDown />
            </span>
          </Button>

          {/* <div className="sub-menu">
            <Link to='/'>
                <Button>
                    Nho
                </Button>
            </Link>
            <Link to='/'>
                <Button>
                    Sung
                </Button>
            </Link>

            <Link to='/'>
                <Button>
                    Ổi
                </Button>
            </Link>
          </div> */}
        </div>

        <div className="col_2 w-[70%]">
          <ul className="flex items-center gap-5 nav">
            <li className="list-none relative">
              <Link to="/" className="link transition">
                <Button className="link transition hover:bg-[#f1f1f1] !text-[16px] !font-[600] !text-[#000000b3] hover:!text-[#d84b4b] !py-[8px] !px-[26px]">
                  Home
                </Button>
              </Link>
              <div className="submenu absolute top-[120%] left-[0%] min-w-[200px] bg-white rounded-b-[10px] opacity-0">
                <ul>
                  <li className="list-none w-full">
                    <Link to="/">
                      <Button className="!text-[#000000b3] w-full !text-left !justify-start !rounded-none">Nho</Button>
                    </Link>
                  </li>

                  <li className="list-none w-full">
                    <Link to="/">
                      <Button className="!text-[#000000b3] w-full !text-left !justify-start !rounded-none">Nho</Button>
                    </Link>
                  </li>

                  <li className="list-none w-full">
                    <Link to="/">
                      <Button className="!text-[#000000b3] w-full !text-left !justify-start !rounded-none">Nho</Button>
                    </Link>
                  </li>
                </ul>
              </div>
            </li>
            <li className="list-none">
              <Link to="/" className="link transition">
                <Button className="link transition !text-[18px] !font-[600] !text-[#000000b3] hover:!text-[#d84b4b] !py-[8px] !px-[26px]">
                  Sung
                </Button>
              </Link>
            </li>
            <li className="list-none">
              <Link to="/" className="link transition">
                <Button className="link transition !text-[18px] !font-[600] !text-[#000000b3] hover:!text-[#d84b4b] py-[8px] px-[26px]">
                  Ổi
                </Button>
              </Link>
            </li>
            <li className="list-none">
              <Link to="/" className="link transition">
                <Button className="link transition !text-[18px] !font-[600] !text-[#000000b3] hover:!text-[#d84b4b] !py-[8px] !px-[26px]">
                  Nho
                </Button>
              </Link>
            </li>
            <li className="list-none">
              <Link to="/" className="link transition">
                <Button className="link transition !text-[18px] !font-[600] !text-[#000000b3] hover:!text-[#d84b4b] !py-[8px] !px-[26px]">
                  Tin tức
                </Button>
              </Link>
            </li>
            <li className="list-none">
              <Link to="/" className="link transition">
                <Button className="link transition !text-[18px] !font-[600] !text-[#000000b3] hover:!text-[#d84b4b] !py-[8px] !px-[26px]">
                  Liên hệ
                </Button>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
