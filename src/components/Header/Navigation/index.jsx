import { Button, IconButton } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import "../Navigation/style.css";
import { useState, useEffect } from "react";
import { GiShoppingCart } from "react-icons/gi";
import { FaRegHeart } from "react-icons/fa";
import Badge from "@mui/material/Badge";
import Tooltip from "@mui/material/Tooltip";
import Drawer from "@mui/material/Drawer";
import Box from '@mui/material/Box';
import { RiMenu2Fill } from "react-icons/ri";
import { IoMdClose } from "react-icons/io";


const Navigation = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);
  const [isScrolled, setIsScrolled] = useState(false);
  const [open, setOpen] = React.useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  const DrawerList = (
    <Box sx={{ width: 300 }} role="presentation" onClick={toggleDrawer(false)}>
      <h3 className="flex items-center justify-between p-3">Show Category <IoMdClose onClick={toggleDrawer(false)}/></h3>
    </Box>
  );

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className="navbar">
      <div
        className={`w-full fixed py-4 flex transition-all z-50 duration-1000 ${isMobile ? "justify-between px-6" : "justify-center"} ${
          isScrolled
            ? "bg-[#FFA500] items-center top-0 left-0 justify-center 2xl:gap-5 lg:gap-0 rounded-b-[2.5rem]"
            : "bg-[#FFA500] items-center justify-center 2xl:gap-5 lg:gap-0"
        } `}
      >
        {isMobile ? (
          <div>
            <Button onClick={toggleDrawer(true)}><RiMenu2Fill className="text-[1.5rem] text-white"/></Button>
            <Drawer open={open} onClose={toggleDrawer(false)}>
              {DrawerList}
            </Drawer>
          </div>
        ) : (
          <ul className="flex items-center gap-5 nav">
            <li className="list-none relative">
              <Link to="/" className="link transition">
                <Button className="link transition 2xl:!text-[1.125rem] lg:!text-[1rem] hover:!text-[#d84b4b] !py-[0.5rem] !px-[0.5rem]">
                  Sản Phẩm
                </Button>
              </Link>
              <div className="submenu absolute top-[120%] left-[0%] min-w-[12.5rem] bg-white rounded-b-[0.625rem] opacity-0">
                <ul>
                  <li className="list-none w-full relative">
                    <Link to="/">
                      <Button className="!text-[#000000b3] w-full !text-[1rem] !text-left !justify-start !rounded-none">
                        Nho
                      </Button>
                    </Link>

                    <div className="submenu absolute top-[0%] left-[100%] min-w-[12.5rem] bg-white rounded-b-[0.625rem] opacity-0">
                      <ul>
                        <li className="list-none w-full">
                          <Link to="/">
                            <Button className="!text-[#000000b3] w-full !text-[1rem] !text-left !justify-start !rounded-none">
                              Nho
                            </Button>
                          </Link>
                        </li>

                        <li className="list-none w-full">
                          <Link to="/">
                            <Button className="!text-[#000000b3] w-full !text-[1rem] !text-left !justify-start !rounded-none">
                              Sung
                            </Button>
                          </Link>
                        </li>

                        <li className="list-none w-full">
                          <Link to="/">
                            <Button className="!text-[#000000b3] w-full !text-[1rem] !text-left !justify-start !rounded-none">
                              Ổi
                            </Button>
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </li>

                  <li className="list-none w-full">
                    <Link to="/">
                      <Button className="!text-[#000000b3] w-full !text-[1rem] !text-left !justify-start !rounded-none">
                        Sung
                      </Button>
                    </Link>
                  </li>

                  <li className="list-none w-full">
                    <Link to="/">
                      <Button className="!text-[#000000b3] w-full !text-[1rem] !text-left !justify-start !rounded-none">
                        Ổi
                      </Button>
                    </Link>
                  </li>
                </ul>
              </div>
            </li>
            <li className="list-none">
              <Link to="/" className="link transition">
                <Button className="link transition 2xl:!text-[1.125rem] lg:!text-[1rem] !text-[#fff] hover:!text-[#d84b4b] !py-[0.5rem] 2xl:!px-[1.625rem] lg:!px-[0.5rem]">
                  Special
                </Button>
              </Link>
            </li>
            <li className="list-none">
              <Link to="/" className="link transition">
                <Button className="link transition 2xl:!text-[1.125rem] lg:!text-[1rem] !text-[#fff] hover:!text-[#d84b4b] !py-[0.5rem] 2xl:!px-[1.625rem] lg:!px-[0.5rem]">
                  About
                </Button>
              </Link>
            </li>
            <li className="list-none">
              <Link to="/" className="link transition">
                <Button className="link transition 2xl:!text-[1.125rem] lg:!text-[1rem] !text-[#fff] hover:!text-[#d84b4b] !py-[0.5rem] 2xl:!px-[1.625rem] lg:!px-[0.5rem]">
                  Tham Quan
                </Button>
              </Link>
            </li>
            <li className="list-none">
              <Link to="/" className="link transition">
                <Button className="link transition 2xl:!text-[1.125rem] lg:!text-[1rem] !text-[#fff] hover:!text-[#d84b4b] !py-[0.5rem] 2xl:!px-[1.625rem] lg:!px-[0.5rem]">
                  Blog
                </Button>
              </Link>
            </li>
            <li className="list-none">
              <Link to="/" className="link transition">
                <Button className="link transition 2xl:!text-[1.125rem] lg:!text-[1rem] !text-[#fff] hover:!text-[#d84b4b] !py-[0.5rem] 2xl:!px-[1.625rem] lg:!px-[0.5rem]">
                  Đối Tác
                </Button>
              </Link>
            </li>

            <li className="list-none">
              <Link to="/" className="link transition">
                <Button className="link transition 2xl:!text-[1.125rem] lg:!text-[1rem] !text-[#fff] hover:!text-[#d84b4b] !py-[0.5rem] 2xl:!px-[1.625rem] lg:!px-[0.5rem]">
                  Contact
                </Button>
              </Link>
            </li>
          </ul>
        )}

        {/* <div className="header py-3 border-b-[1px] border-gray-250"> */}
        {/* <div className="container flex items-center justify-between"> */}
        {/* <div className="col1 w-[30%]">
            <Link to={"/"}>
              <img className="w-[313px]" src="./log-st.png" alt="logo" />
            </Link>
          </div>
          <div className="col2 w-[40%]">
            <Search />
          </div> */}
        <div className="col3 flex items-center">
          <ul className="flex items-center justify-start gap-3 w-full">
            <li className="list-none w-[100px]">
              <Link to="/login" className="link transition">
                <Button className="!bg-[#2e7d32] w-[100px] !text-white text-[15px] font-[500] !rounded-[20px]">
                  Login
                </Button>
              </Link>
            </li>

            <li>
              <Tooltip title="Wish List">
                <IconButton aria-label="cart">
                  <Badge badgeContent={4} color="success">
                    <FaRegHeart className="text-white hover:text-[#f54c4c]" />
                  </Badge>
                </IconButton>
              </Tooltip>
            </li>

            <li>
              <Tooltip title="Cart">
                <IconButton aria-label="cart">
                  <Badge badgeContent={4} color="success">
                    <GiShoppingCart className="w-[30px] text-white hover:text-[#f54c4c]" />
                  </Badge>
                </IconButton>
              </Tooltip>
            </li>
          </ul>
        </div>
      </div>
      {/* </div> */}
      {/* </div> */}
    </nav>
  );
};

export default Navigation;
