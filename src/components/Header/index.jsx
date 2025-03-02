import React from "react";
import { Link } from "react-router-dom";
import Search from "../Search";
import { Button, IconButton } from "@mui/material";
import Badge from "@mui/material/Badge";
import Tooltip from "@mui/material/Tooltip";
import { styled } from "@mui/material/styles";
import { GiShoppingCart } from "react-icons/gi";
import { FaRegHeart } from "react-icons/fa";
import { FaMapMarkerAlt } from "react-icons/fa";
import { FaPhoneAlt } from "react-icons/fa";
import { SiGmail } from "react-icons/si";
import Navigation from "./Navigation";

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    right: -3,
    top: 13,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: "0 4px",
  },
}));

const Header = () => {
  return (
    <header className="bg-white">
      <div className="top-strip py-2 border-t-[1px] border-gray-250">
        <div className="container">
          <div className="flex items-center justify-between">
            <div className="col1 w-[50%]">
              <ul className="flex items-center justify-end gap-5 w-full">
                <li>
                  <IconButton>
                    <FaMapMarkerAlt className="text-[20px] text-[#2e7d32] hover:text-[#f54c4c]" />
                  </IconButton>
                  <span className="text-[15px]">
                    120 XL Hà Nội, TP Thủ Đức, TP. HCM
                  </span>

                  <IconButton>
                    <FaPhoneAlt className="text-[20px] text-[#2e7d32] hover:text-[#f54c4c]" />
                  </IconButton>
                  <span className="text-[15px]">1900 636 787</span>
                  <IconButton>
                    <SiGmail className="text-[20px] text-[#2e7d32] hover:text-[#f54c4c]" />
                  </IconButton>
                  <span className="text-[15px]">
                    phongkinhdoanh@suoitien.com
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="header py-3 border-b-[1px] border-gray-250">
        <div className="container flex items-center justify-between">
          <div className="col1 w-[30%]">
            <Link to={"/"}>
              <img className="w-[313px]" src="./log-st.png" alt="logo" />
            </Link>
          </div>
          <div className="col2 w-[40%]">
            <Search />
          </div>
          <div className="col3 w-[30%] flex items-center pl-7">
            <ul className="flex items-center justify-end gap-5 w-full">
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
                      <FaRegHeart className="hover:text-[#f54c4c]" />
                    </Badge>
                  </IconButton>
                </Tooltip>
              </li>

              <li>
                <Tooltip title="Cart">
                  <IconButton aria-label="cart">
                    <Badge badgeContent={4} color="success">
                      <GiShoppingCart className="w-[30px] hover:text-[#f54c4c]" />
                    </Badge>
                  </IconButton>
                </Tooltip>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <Navigation/>
    </header>
  );
};

export default Header;
