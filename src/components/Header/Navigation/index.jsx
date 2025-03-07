import { Button } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import "../Navigation/style.css";
import { useState, useEffect } from "react";


const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className="navbar">
      <div className={`w-full fixed py-4 flex transition-all z-50 duration-1000 ${
        isScrolled ? "bg-[#FFA500] items-center top-0 left-0 justify-center gap-5 rounded-b-[40px]" : "bg-[#FFA500] items-center justify-center gap-5"} `}>
          <ul className="flex items-center gap-5 nav">
            <li className="list-none relative">
              <Link to="/" className="link transition">
                <Button className="link transition 2xl:!text-[18px] lg:!text-[16px] hover:!text-[#d84b4b] !py-[8px] !px-[26px]">
                  Sản Phẩm
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
                <Button className="link transition 2xl:!text-[18px] lg:!text-[16px] !text-[#fff] hover:!text-[#d84b4b] !py-[8px] !px-[26px]">
                  Special
                </Button>
              </Link>
            </li>
            <li className="list-none">
              <Link to="/" className="link transition">
                <Button className="link transition 2xl:!text-[18px] lg:!text-[16px] !text-[#fff] hover:!text-[#d84b4b] !py-[8px] !px-[26px]">
                  About
                </Button>
              </Link>
            </li>
            <li className="list-none">
              <Link to="/" className="link transition">
                <Button className="link transition 2xl:!text-[18px] lg:!text-[16px] !text-[#fff] hover:!text-[#d84b4b] !py-[8px] !px-[26px]">
                  Tham Quan
                </Button>
              </Link>
            </li>
            <li className="list-none">
              <Link to="/" className="link transition">
                <Button className="link transition 2xl:!text-[18px] lg:!text-[16px] !text-[#fff] hover:!text-[#d84b4b] !py-[8px] !px-[26px]">
                  Blog
                </Button>
              </Link>
            </li>
            <li className="list-none">
              <Link to="/" className="link transition">
                <Button className="link transition 2xl:!text-[18px] lg:!text-[16px] !text-[#fff] hover:!text-[#d84b4b] !py-[8px] !px-[26px]">
                  Đối Tác
                </Button>
              </Link>
            </li>

            <li className="list-none">
              <Link to="/" className="link transition">
                <Button className="link transition 2xl:!text-[18px] lg:!text-[16px] !text-[#fff] hover:!text-[#d84b4b] !py-[8px] !px-[26px]">
                  Contact
                </Button>
              </Link>
            </li>
          </ul>
      </div>
    </nav>
  );
};

export default Navigation;
