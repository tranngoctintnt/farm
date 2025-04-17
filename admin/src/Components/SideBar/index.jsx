import { Button } from "@mui/material";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { LuLayoutDashboard } from "react-icons/lu";
import { FaImage } from "react-icons/fa";
import { MdOutlineCategory } from "react-icons/md";
import { TbBrandProducthunt } from "react-icons/tb";
import { FaUserFriends } from "react-icons/fa";
import { IoBagCheckOutline } from "react-icons/io5";
import { FaBlog } from "react-icons/fa6";
import { MdOutlineRateReview } from "react-icons/md";

import { LiaAngleDownSolid } from "react-icons/lia";
import { Collapse } from "react-collapse";
import { MdOutlineManageAccounts } from "react-icons/md";
import { useAuth } from "../../Context/AuthContext";

const SideBar = () => {
  const [subMenuIndex, setSubMenuIndex] = useState(null);
  const { user } = useAuth();
 

const isSuperAdmin = user?.role === "Super-Admin";
// const isAdmin = user?.role === "Admin";

  const isOpenSubMenu = (index) => {
    if (subMenuIndex === index) {
      setSubMenuIndex(null);
    } else {
      setSubMenuIndex(index);
    }
  };
  return (
    <>
      <div className="sidebar fixed top-0 left-0 bg-[#fff] border-r border-[rgb(0,0,0,0.1)] py-2 px-5 w-[18%] h-full">
        <div className="w-full flex justify-center">
          <Link to="/dash-board">
            <img src="/logo-stf.png" alt="logo" className="w-[80px]" />{" "}
          </Link>
        </div>

        <ul className="mt-5 flex flex-col gap-3">
          <li>
            <Link to="/dash-board">
              <Button className="w-full !capitalize !py-3 !text-[rgba(0,0,0,0.8)] flex gap-3 items-center !text-[16px] font-[600] !font-salute !justify-start">
                <LuLayoutDashboard className="!text-[18px]" />
                DashBoard
              </Button>
            </Link>
          </li>

          <li>
            <Button
              onClick={() => isOpenSubMenu(1)}
              className="w-full !capitalize !py-3 !text-[rgba(0,0,0,0.8)] flex gap-3 items-center !text-[16px] font-[600] !font-salute !justify-start"
            >
              <FaImage className="!text-[18px]" />
              Product List Slides
              <span className="ml-auto">
                <LiaAngleDownSolid
                  className={`transition-all ${
                    subMenuIndex === 1 ? "rotate-180" : ""
                  }`}
                />
              </span>
            </Button>
            <Collapse isOpened={subMenuIndex === 1 ? true : false}>
              <ul className="w-full">
                <li className="w-full">
                  <Button className="!text-[rgba(0,0,0,0.7)] !pl-10 !text-[15px] !py-2 !font-[500] !font-salute  !capitalize flex gap-3 items-center !justify-start !w-full">
                    <span className="block w-[8px] h-[8px] rounded-full bg-[rgba(0,0,0,0.2)]"></span>
                    Home Product List Slide
                  </Button>
                </li>
                <li className="w-full">
                  <Button className="!text-[rgba(0,0,0,0.7)] !pl-10 !text-[15px] !py-2 !font-[500] !font-salute  !capitalize flex gap-3 items-center !justify-start !w-full">
                    <span className="block w-[8px] h-[8px] rounded-full bg-[rgba(0,0,0,0.2)]"></span>
                    Add Product List Slide
                  </Button>
                </li>
              </ul>
            </Collapse>
          </li>

          <li>
            <Button
              onClick={() => isOpenSubMenu(2)}
              className="w-full !capitalize !py-3 !text-[rgba(0,0,0,0.8)] flex gap-3 items-center !text-[16px] font-[600] !font-salute !justify-start"
            >
              <MdOutlineCategory className="!text-[18px]" />
              Category
              <span className="ml-auto">
                <LiaAngleDownSolid
                  className={`transition-all ${
                    subMenuIndex === 1 ? "rotate-180" : ""
                  }`}
                />
              </span>
            </Button>

            <Collapse isOpened={subMenuIndex === 2 ? true : false}>
              <ul className="w-full">
                <li className="w-full">
                  <Link to="/categories/list">
                    <Button className="!text-[rgba(0,0,0,0.7)] !pl-10 !text-[15px] !py-2 !font-[500] !font-salute  !capitalize flex gap-3 items-center !justify-start !w-full">
                      <span className="block w-[8px] h-[8px] rounded-full bg-[rgba(0,0,0,0.2)]"></span>
                      Category List
                    </Button>
                  </Link>
                </li>
                <li className="w-full">
                  <Link to="/category/upload">
                    <Button className="!text-[rgba(0,0,0,0.7)] !pl-10 !text-[15px] !py-2 !font-[500] !font-salute  !capitalize flex gap-3 items-center !justify-start !w-full">
                      <span className="block w-[8px] h-[8px] rounded-full bg-[rgba(0,0,0,0.2)]"></span>
                      Add Category
                    </Button>
                  </Link>
                </li>
              </ul>
            </Collapse>
          </li>

          <li>
            <Button
              onClick={() => isOpenSubMenu(3)}
              className="w-full !capitalize !py-3 !text-[rgba(0,0,0,0.8)] flex gap-3 items-center !text-[16px] font-[600] !font-salute !justify-start"
            >
              <TbBrandProducthunt className="!text-[18px]" />
              Products
              <span className="ml-auto">
                <LiaAngleDownSolid
                  className={`transition-all ${
                    subMenuIndex === 1 ? "rotate-180" : ""
                  }`}
                />
              </span>
            </Button>

            <Collapse isOpened={subMenuIndex === 3 ? true : false}>
              <ul className="w-full">
                <li className="w-full">
                  <Link to="/product/product-list">
                    <Button className="!text-[rgba(0,0,0,0.7)] !pl-10 !text-[15px] !py-2 !font-[500] !font-salute  !capitalize flex gap-3 items-center !justify-start !w-full">
                      <span className="block w-[8px] h-[8px] rounded-full bg-[rgba(0,0,0,0.2)]"></span>
                      Product List
                    </Button>
                  </Link>
                </li>
                <li className="w-full">
                  <Link to="/product/upload">
                    <Button className="!text-[rgba(0,0,0,0.7)] !pl-10 !text-[15px] !py-2 !font-[500] !font-salute  !capitalize flex gap-3 items-center !justify-start !w-full">
                      <span className="block w-[8px] h-[8px] rounded-full bg-[rgba(0,0,0,0.2)]"></span>
                      Add Product
                    </Button>
                  </Link>
                </li>
              </ul>
            </Collapse>
          </li>

          <li>
            <Link to="/customer/customer-list">
            
            <Button className="w-full !capitalize !py-3 !text-[rgba(0,0,0,0.8)] flex gap-3 items-center !text-[16px] font-[600] !font-salute !justify-start">
              <FaUserFriends className="!text-[18px]" />
              Customer
            </Button>
            </Link>

          </li>

          <li>
            <Link to="/review/review-list">
            <Button className="w-full !capitalize !py-3 !text-[rgba(0,0,0,0.8)] flex gap-3 items-center !text-[16px] font-[600] !font-salute !justify-start">
              <MdOutlineRateReview className="!text-[18px]" />
              Review
            </Button>
            </Link>
          </li>

          <li>
            <Link to="/order/order-list">
            <Button className="w-full !capitalize !py-3 !text-[rgba(0,0,0,0.8)] flex gap-3 items-center !text-[16px] font-[600] !font-salute !justify-start">
              <IoBagCheckOutline className="!text-[18px]" />
              Orders
            </Button>
            </Link>
          </li>

          <li>
            <Button
              onClick={() => isOpenSubMenu(4)}
              className="w-full !capitalize !py-3 !text-[rgba(0,0,0,0.8)] flex gap-3 items-center !text-[16px] font-[600] !font-salute !justify-start"
            >
              <FaBlog className="!text-[18px]" />
              Blog
              <span className="ml-auto">
                <LiaAngleDownSolid
                  className={`transition-all ${
                    subMenuIndex === 1 ? "rotate-180" : ""
                  }`}
                />
              </span>
            </Button>

            <Collapse isOpened={subMenuIndex === 4 ? true : false}>
              <ul className="w-full">
                <li className="w-full">
                  <Link to="/blogs">
                    <Button className="!text-[rgba(0,0,0,0.7)] !pl-10 !text-[15px] !py-2 !font-[500] !font-salute  !capitalize flex gap-3 items-center !justify-start !w-full">
                      <span className="block w-[8px] h-[8px] rounded-full bg-[rgba(0,0,0,0.2)]"></span>
                      Blog List
                    </Button>
                  </Link>
                </li>
                <li className="w-full">
                  <Link to="/blog/add">
                    <Button className="!text-[rgba(0,0,0,0.7)] !pl-10 !text-[15px] !py-2 !font-[500] !font-salute  !capitalize flex gap-3 items-center !justify-start !w-full">
                      <span className="block w-[8px] h-[8px] rounded-full bg-[rgba(0,0,0,0.2)]"></span>
                      Add Blog
                    </Button>
                  </Link>
                </li>
              </ul>
            </Collapse>
          </li>
          {isSuperAdmin && (
            <li>
              <Button
                onClick={() => isOpenSubMenu(5)}
                className="w-full !capitalize !py-3 !text-[rgba(0,0,0,0.8)] flex gap-3 items-center !text-[16px] font-[600] !font-salute !justify-start"
              >
                <MdOutlineManageAccounts className="!text-[18px]" />
                Account
                <span className="ml-auto">
                  <LiaAngleDownSolid
                    className={`transition-all ${
                      subMenuIndex === 1 ? "rotate-180" : ""
                    }`}
                  />
                </span>
              </Button>

              <Collapse isOpened={subMenuIndex === 5 ? true : false}>
                <ul className="w-full">
                  <li className="w-full">
                    <Link to="/account-admin/account-admin-list">
                      <Button className="!text-[rgba(0,0,0,0.7)] !pl-10 !text-[15px] !py-2 !font-[500] !font-salute  !capitalize flex gap-3 items-center !justify-start !w-full">
                        <span className="block w-[8px] h-[8px] rounded-full bg-[rgba(0,0,0,0.2)]"></span>
                        Account List
                      </Button>
                    </Link>
                  </li>
                  <li className="w-full">
                    <Link to="/account-admin/add-account-admin">
                      <Button className="!text-[rgba(0,0,0,0.7)] !pl-10 !text-[15px] !py-2 !font-[500] !font-salute  !capitalize flex gap-3 items-center !justify-start !w-full">
                        <span className="block w-[8px] h-[8px] rounded-full bg-[rgba(0,0,0,0.2)]"></span>
                        Add Account
                      </Button>
                    </Link>
                  </li>

                  <li className="w-full">
                    <Link to="/account/log">
                      <Button className="!text-[rgba(0,0,0,0.7)] !pl-10 !text-[15px] !py-2 !font-[500] !font-salute  !capitalize flex gap-3 items-center !justify-start !w-full">
                        <span className="block w-[8px] h-[8px] rounded-full bg-[rgba(0,0,0,0.2)]"></span>
                        Activity log
                      </Button>
                    </Link>
                  </li>
                </ul>
              </Collapse>
            </li>)}
        

          {/* <li>
            <Button onClick={handleLogout} className="w-full !capitalize !py-3 !text-[rgba(0,0,0,0.8)] flex gap-3 items-center !text-[16px] font-[600] !font-salute !justify-start">
              <AiOutlineLogout className="!text-[18px]" />
              Logout
            </Button>
          </li> */}
        </ul>
      </div>
    </>
  );
};
export default SideBar;
