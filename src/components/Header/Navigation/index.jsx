import { Button } from "@mui/material";
import React from "react";
import { LuMenu } from "react-icons/lu";
import { FaAngleDown } from "react-icons/fa";
import { Link } from "react-router-dom";
import "../Navigation/style.css";
import { useState, useRef, useEffect } from "react";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);

  const toggleSubMenu = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <nav className="py-2">
      <div className="container flex items-center justify-end gap-5">
        <div className="col_1 w-[30%] relative">
          <Button
            className="!px-4 !bg-[#2e7d32] !text-white !rounded-[30px] gap-2"
            onClick={toggleSubMenu}
          >
            <span className="text-[18px]">
              <LuMenu />
            </span>
            <span>Shop by Categories</span>
            <span className="text-[18px] ml-auto">
              <FaAngleDown />
            </span>
          </Button>

          <div className="sidebarNav mt-2 space-y-2 top-[110%] !min-w-[224px] bg-white shadow-lg absolute rounded z-50">
            {isOpen && (
              <ul className="">
                <li className="p-2 list-none w-full group cursor-pointer  hover:text-primary hover:bg-gray-200">
                  <Link to="/" className="link">
                    Sub Menu 1
                  </Link>
                </li>
                <li className="p-2 list-none w-full group cursor-pointer hover:text-primary hover:bg-gray-200">
                  <Link to="/" className="link">
                    Sub Menu 2
                  </Link>
                </li>
                <li className="p-2 list-none w-full group cursor-pointer hover:text-primary hover:bg-gray-200">
                  <Link to="/" className="link">
                    Sub Menu 3
                  </Link>
                </li>
              </ul>
            )}
          </div>

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
                  <li className="list-none w-full relative">
                    <Link to="/">
                      <Button className="!text-[#000000b3] w-full !text-[16px] !text-left !justify-start !rounded-none">
                        Nho
                      </Button>
                    </Link>

                    <div className="submenu absolute top-[0%] left-[100%] min-w-[200px] bg-white rounded-b-[10px] opacity-0">
                      <ul>
                        <li className="list-none w-full">
                          <Link to="/">
                            <Button className="!text-[#000000b3] w-full !text-[16px] !text-left !justify-start !rounded-none">
                              Nho
                            </Button>
                          </Link>
                        </li>

                        <li className="list-none w-full">
                          <Link to="/">
                            <Button className="!text-[#000000b3] w-full !text-[16px] !text-left !justify-start !rounded-none">
                              Sung
                            </Button>
                          </Link>
                        </li>

                        <li className="list-none w-full">
                          <Link to="/">
                            <Button className="!text-[#000000b3] w-full !text-[16px] !text-left !justify-start !rounded-none">
                              Ổi
                            </Button>
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </li>

                  <li className="list-none w-full">
                    <Link to="/">
                      <Button className="!text-[#000000b3] w-full !text-[16px] !text-left !justify-start !rounded-none">
                        Sung
                      </Button>
                    </Link>
                  </li>

                  <li className="list-none w-full">
                    <Link to="/">
                      <Button className="!text-[#000000b3] w-full !text-[16px] !text-left !justify-start !rounded-none">
                        Ổi
                      </Button>
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
