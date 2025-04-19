import { Button, IconButton } from "@mui/material";
import React from "react";
import { data, Link, useNavigate } from "react-router-dom";
import "../Navigation/style.css";
import { useState, useEffect } from "react";
import { RiMenu2Fill } from "react-icons/ri";
import { Drawer, Menu } from "antd";
import {
  AppstoreOutlined,
  MailOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import CategoryCollapse from "../../CategoryCollapse";

const Navigation = React.memo(({ data }) => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);
  // const [isScrolled, setIsScrolled] = useState(false);
  const [open, setOpen] = React.useState(false);
  const navigate = useNavigate(); // Hook để điều hướng

  // console.log(data);
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // const toggleDrawer = (newOpen) => () => {
  //   setOpen(newOpen);
  // };

  const items = [
    {
      key: "sub1",
      label: "Sản Phẩm",
      icon: <MailOutlined />,
      children: data.map((category) => ({
        key: category.idCategory,
        label: category.nameCategory,
        onClick: () => {
          navigate(`/productList?category=${category.idCategory}`);
          setOpen(false);
        },
      })),
    },
    {
      key: "sub2",
      label: "Special",
      icon: <AppstoreOutlined />,

      children: [
        { key: "3", label: "Option 3" },
        { key: "4", label: "Option 4" },
      ],
    },

    {
      key: "sub3",
      label: "About",
      icon: <AppstoreOutlined />,
      children: [
        { key: "5", label: "Option 5" },
        { key: "6", label: "Option 6" },
      ],
    },

    {
      key: "sub4",
      label: "Tham quan",
      icon: <AppstoreOutlined />,
      children: [
        { key: "7", label: "Option 7" },
        { key: "8", label: "Option 8" },
      ],
    },

    {
      key: "sub5",
      label: "Blog",
      icon: <AppstoreOutlined />,
      children: [
        { key: "9", label: "Option 9" },
        { key: "10", label: "Option 10" },
      ],
    },

    {
      key: "sub6",
      label: "Đối tác",
      icon: <AppstoreOutlined />,
      children: [
        { key: "11", label: "Option 7" },
        { key: "12", label: "Option 8" },
      ],
    },

    {
      key: "sub7",
      label: "Contact",
      icon: <AppstoreOutlined />,
      children: [
        { key: "13", label: "Option 7" },
        { key: "14", label: "Option 8" },
      ],
    },
  ];

  // const DrawerList = <CategoryCollapse />;

  // useEffect(() => {
  //   const handleScroll = () => {
  //     setIsScrolled(window.scrollY > 50);
  //   };

  //   window.addEventListener("scroll", handleScroll);
  //   return () => window.removeEventListener("scroll", handleScroll);
  // }, []);

  return (
    <nav className="max-lg:absolute max-lg:top-[18%] max-lg:left-[14%] max-sm:left-[18%] navbar">
      <div
        className={`w-full py-2 flex transition-allduration-1000 max-lg:bg-inherit bg-[#FFA500] items-center top-0 left-0 justify-center 2xl:gap-5 lg:gap-0 rounded-b-[2.5rem] ${
          isMobile ? "justify-between px-6 max-lg:px-3 " : "justify-center"
        }  `}
      >
        {isMobile ? (
          <div>
            <Button onClick={() => setOpen(true)}>
              <RiMenu2Fill className="text-[1.5rem] text-white" />
            </Button>
            {/* Drawer hiển thị menu */}
            <Drawer
              title="Menu"
              placement="left"
              onClose={() => setOpen(false)}
              open={open}
              className="p-0"
            >
              <Menu
                style={{ width: "100%" }}
                defaultSelectedKeys={["1"]}
                defaultOpenKeys={["sub1"]}
                mode="inline"
                items={items}
              />
            </Drawer>
          </div>
        ) : (
          <ul className="flex items-center gap-5 nav">
            <li className="list-none relative">
              <Link to="/productList" className="link transition">
                <Button className="link transition 2xl:!text-[1.125rem] lg:!text-[1rem] hover:!text-[#d84b4b] !py-[0.2rem] 2xl:!px-[1rem]">
                  Sản Phẩm
                </Button>
              </Link>
              <div className="submenu absolute min-w-[12.5rem] bg-white rounded-[0.625rem] hidden opacity-0">
                <ul>
                  <li className="list-none w-full relative">
                    <Link to="/productList">
                      <Button className="!text-[#000000b3] w-full !text-[1rem] !text-left !justify-start !rounded-none">
                        Tất cả
                      </Button>
                    </Link>

                    {/* <div className="submenu absolute top-[0%] left-[100%] min-w-[12.5rem] bg-white rounded-[0.625rem] opacity-0">
                      <ul>
                        <li className="list-none w-full">
                          <Link to="/">
                            <Button className="!text-[#000000b3] w-full !text-[1rem] !text-left !justify-start !rounded-none">
                              Trái Cây
                            </Button>
                          </Link>
                        </li>

                        <li className="list-none w-full">
                          <Link to="/">
                            <Button className="!text-[#000000b3] w-full !text-[1rem] !text-left !justify-start !rounded-none">
                              Nước ép
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
                    </div> */}
                  </li>
                  {data.map((category) => (
                    <li key={category.idCategory} className="list-none w-full">
                      <Link key={category.idCategory} to="/">
                        <Button className="!text-[#000000b3] w-full !text-[1rem] !text-left !justify-start !rounded-none">
                          {category.nameCategory}
                        </Button>
                      </Link>
                    </li>
                  ))}

                  {/* <li className="list-none w-full">
                    <Link to="/">
                      <Button className="!text-[#000000b3] w-full !text-[1rem] !text-left !justify-start !rounded-none">
                        Nước ép
                      </Button>
                    </Link>
                  </li> */}
                </ul>
              </div>
            </li>
            <li className="list-none">
              <Link to="/event" className="link transition">
                <Button className="link transition 2xl:!text-[1.125rem] lg:!text-[1rem] !text-[#fff] hover:!text-[#d84b4b] !py-[0.2rem] 2xl:!px-[1rem] lg:!px-[0.5rem]">
                  Special
                </Button>
              </Link>
            </li>
            <li className="list-none">
              <Link to="/about" className="link transition">
                <Button className="link transition 2xl:!text-[1.125rem] lg:!text-[1rem] !text-[#fff] hover:!text-[#d84b4b] !py-[0.2rem] 2xl:!px-[1rem] lg:!px-[0.5rem]">
                  About
                </Button>
              </Link>
            </li>
            <li className="list-none">
              <Link to="/" className="link transition">
                <Button className="link transition 2xl:!text-[1.125rem] lg:!text-[1rem] !text-[#fff] hover:!text-[#d84b4b] !py-[0.2rem] 2xl:!px-[1rem] lg:!px-[0.5rem]">
                  Tham Quan
                </Button>
              </Link>
            </li>
            <li className="list-none">
              <Link to="/" className="link transition">
                <Button className="link transition 2xl:!text-[1.125rem] lg:!text-[1rem] !text-[#fff] hover:!text-[#d84b4b] !py-[0.2rem] 2xl:!px-[1rem] lg:!px-[0.5rem]">
                  Blog
                </Button>
              </Link>
            </li>
            <li className="list-none">
              <Link to="/policy" className="link transition">
                <Button className="link transition 2xl:!text-[1.125rem] lg:!text-[1rem] !text-[#fff] hover:!text-[#d84b4b] !py-[0.2rem] 2xl:!px-[1rem] lg:!px-[0.5rem]">
                  Đối Tác
                </Button>
              </Link>
            </li>

            <li className="list-none">
              <Link to="/contact" className="link transition">
                <Button className="link transition 2xl:!text-[1.125rem] lg:!text-[1rem] !text-[#fff] hover:!text-[#d84b4b] !py-[0.2rem] 2xl:!px-[1rem] lg:!px-[0.5rem]">
                  Contact
                </Button>
              </Link>
            </li>
          </ul>
        )}
      </div>
    </nav>

    //     <nav className="navbar bg-[#FFA500] shadow-md">
    //   <div
    //     className={`w-full py-2 flex items-center transition-all duration-500 top-0 left-0 ${
    //       isMobile ? "justify-between px-4" : "justify-center"
    //     }`}
    //   >
    //     {/* Mobile Menu */}
    //     {isMobile ? (
    //       <div className="flex items-center justify-between w-full">
    //         {/* Logo */}
    //         <Link to="/" className="text-white text-xl font-bold">
    //           Suối Tiên Farm
    //         </Link>

    //         {/* Hamburger Menu */}
    //         <Button onClick={toggleDrawer(true)} className="text-white">
    //           <RiMenu2Fill className="text-2xl" />
    //         </Button>

    //         {/* Drawer for Mobile */}
    //         <Drawer open={open} onClose={toggleDrawer(false)}>
    //           <Box className="w-[250px] p-4">
    //             <ul className="flex flex-col gap-4">
    //               <li>
    //                 <Link to="/" className="text-[#000000b3] text-lg">
    //                   Sản Phẩm
    //                 </Link>
    //               </li>
    //               <li>
    //                 <Link to="/" className="text-[#000000b3] text-lg">
    //                   Special
    //                 </Link>
    //               </li>
    //               <li>
    //                 <Link to="/" className="text-[#000000b3] text-lg">
    //                   About
    //                 </Link>
    //               </li>
    //               <li>
    //                 <Link to="/" className="text-[#000000b3] text-lg">
    //                   Tham Quan
    //                 </Link>
    //               </li>
    //               <li>
    //                 <Link to="/" className="text-[#000000b3] text-lg">
    //                   Blog
    //                 </Link>
    //               </li>
    //               <li>
    //                 <Link to="/" className="text-[#000000b3] text-lg">
    //                   Đối Tác
    //                 </Link>
    //               </li>
    //               <li>
    //                 <Link to="/" className="text-[#000000b3] text-lg">
    //                   Contact
    //                 </Link>
    //               </li>
    //             </ul>
    //           </Box>
    //         </Drawer>
    //       </div>
    //     ) : (
    //       // Desktop Menu
    //       <div className="container mx-auto flex items-center justify-between">
    //         {/* Logo */}
    //         <Link to="/" className="text-white text-2xl font-bold">
    //           Suối Tiên Farm
    //         </Link>

    //         {/* Navigation Links */}
    //         <ul className="flex items-center gap-6">
    //           <li>
    //             <Link
    //               to="/"
    //               className="text-white text-lg hover:text-[#d84b4b] transition"
    //             >
    //               Sản Phẩm
    //             </Link>
    //           </li>
    //           <li>
    //             <Link
    //               to="/"
    //               className="text-white text-lg hover:text-[#d84b4b] transition"
    //             >
    //               Special
    //             </Link>
    //           </li>
    //           <li>
    //             <Link
    //               to="/"
    //               className="text-white text-lg hover:text-[#d84b4b] transition"
    //             >
    //               About
    //             </Link>
    //           </li>
    //           <li>
    //             <Link
    //               to="/"
    //               className="text-white text-lg hover:text-[#d84b4b] transition"
    //             >
    //               Tham Quan
    //             </Link>
    //           </li>
    //           <li>
    //             <Link
    //               to="/"
    //               className="text-white text-lg hover:text-[#d84b4b] transition"
    //             >
    //               Blog
    //             </Link>
    //           </li>
    //           <li>
    //             <Link
    //               to="/"
    //               className="text-white text-lg hover:text-[#d84b4b] transition"
    //             >
    //               Đối Tác
    //             </Link>
    //           </li>
    //           <li>
    //             <Link
    //               to="/"
    //               className="text-white text-lg hover:text-[#d84b4b] transition"
    //             >
    //               Contact
    //             </Link>
    //           </li>
    //         </ul>
    //       </div>
    //     )}
    //   </div>
    // </nav>
  );
});

export default Navigation;
