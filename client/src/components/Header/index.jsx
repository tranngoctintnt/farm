import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navigation from "./Navigation";
import Search from "../Search";
import { Button, IconButton } from "@mui/material";
import { GiShoppingCart } from "react-icons/gi";
import { FaRegHeart } from "react-icons/fa";
import Badge from "@mui/material/Badge";
import Tooltip from "@mui/material/Tooltip";
import { FaRegUser } from "react-icons/fa";
import { IoLocationOutline } from "react-icons/io5";
import { IoBagCheckOutline } from "react-icons/io5";
import { IoLogOutOutline } from "react-icons/io5";

import { MyContext } from "../../App";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useAuthUser } from "../../Context/AuthContextUser";
import { message } from "antd";
import { useCart } from "../../Context/CartContext";
import LoadingComponent from "../Loading";
import api from "../../api";
import BASE_URL from "../../config";
import { useProduct } from "../../Context/ProductContext";

const Header = ({categoriesData}) => {
  const { user,loading, logout } = useAuthUser(); // Get logout function from context
  const { cart, fetchCart,clearCart,hasFetchedCart } = useCart();
  const { resetProducts } = useProduct();

  // console.log(cart.cartItems);

  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    try {
      await api.post('/user/logout', {});
      logout();
      clearCart();
      resetProducts();
      message.success('Logged out successfully');
      navigate('/');
    } catch (error) {
      console.error('Logout failed:', error);
      logout(); // Vẫn gọi logout để xóa trạng thái
      message.error('Failed to log out. Please try again.');
      navigate('/login');
    }
  };
  const context = useContext(MyContext);
  const [isScrolled, setIsScrolling] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolling(true);
      } else {
        setIsScrolling(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);


 
  useEffect(() => {
    if (user && !loading && !hasFetchedCart && cart.tongSP === 0) {
      // console.log('Calling fetchCart in Header');
      fetchCart();
    }
  }, [user, loading, fetchCart, hasFetchedCart, cart.tongSP]);
  const beginCartItem = !user ? 0 : cart.tongSP;

  if(!user && loading){
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <LoadingComponent />
      </div>
    );
  }
  if (loading) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <LoadingComponent />
      </div>
    );
  }
  
  // console.log(cart);
  return (
  
    <header
  className={`bg-[#FFA500] w-full transition-transform max-lg:relative duration-1000 sticky top-0 left-0 z-40 ${
    isScrolled ? "translate-y-0 shadow-xl" : "shadow-none"
  }`}
>
  <div className="container mx-auto flex items-center justify-between py-2 px-4 lg:px-8 border-b-[1px] border-[#e98914]">
    {/* Logo */}
    <div className="col1 w-auto">
      <Link to="https://stf.suoitien.vn">
        <img className="w-[60px] lg:w-[80px]" src="/logo-stf.png" alt="logo" />
      </Link>
    </div>

    {/* Search Bar */}
    {/* <div className="hidden lg:block col2 w-[40%]">
      <Search />
    </div> */}

    {/* User Actions */}
    <div className="col3 flex items-center gap-4">
      <ul className="flex items-center gap-3">
        {!user ? (
          <li className="list-none">
            <Link to="/login" className="link transition">
              <Button className="!bg-[#D86500] w-[80px] lg:w-[100px] !text-white text-[14px] lg:text-[15px] font-[500] !rounded-[20px]">
                Login
              </Button>
            </Link>
          </li>
        ) : (
          <>
            {/* User Menu */}
            <div
              onClick={handleClick}
              className="myAccountWrap flex items-center gap-3 cursor-pointer"
            >
              <Button className="!bg-[#f1f1f1] !w-[40px] !h-[40px] !min-w-[40px] overflow-hidden !rounded-full !p-0">
                <img
                  src={`${BASE_URL}${user.avatar}`}
                  className="!w-[40px] !h-[40px] overflow-hidden !rounded-full"
                  alt="Avatar"
                />
              </Button>
              <div className="infoUser hidden lg:flex flex-col">
                <h4 className="text-[0.85rem] leading-4 font-[500] text-[rgba(0,0,0,0.6)] capitalize">
                  {user.fullName}
                </h4>
                <span className="text-[0.8rem] text-[rgba(0,0,0,0.6)] font-[400]">
                  {user.email}
                </span>
              </div>
            </div>

            {/* Dropdown Menu */}
            <Menu
              anchorEl={anchorEl}
              id="account-menu"
              open={open}
              onClose={handleClose}
              onClick={handleClose}
              slotProps={{
                paper: {
                  elevation: 0,
                  sx: {
                    overflow: "visible",
                    filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                    mt: 1.5,
                    "& .MuiAvatar-root": {
                      width: 32,
                      height: 32,
                      ml: -0.5,
                      mr: 1,
                    },
                    "&::before": {
                      content: '""',
                      display: "block",
                      position: "absolute",
                      top: 0,
                      right: 14,
                      width: 10,
                      height: 10,
                      bgcolor: "background.paper",
                      transform: "translateY(-50%) rotate(45deg)",
                      zIndex: 0,
                    },
                  },
                },
              }}
              transformOrigin={{ horizontal: "right", vertical: "top" }}
              anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
            >
              <Link to={`/my-account/${user.id}`} className="w-full block">
                <MenuItem onClick={handleClose} className="flex gap-3 !py-3">
                  <FaRegUser className="text-[18px]" />
                  <span className="text-[14px]">My account</span>
                </MenuItem>
              </Link>
              <Link to={`/my-address/${user.id}`} className="w-full block">
                <MenuItem onClick={handleClose} className="flex gap-3 !py-3">
                  <IoLocationOutline className="text-[18px]" />
                  <span className="text-[14px]">Address</span>
                </MenuItem>
              </Link>
              <Link to={`/my-order/${user.id}`}>
                <MenuItem onClick={handleClose} className="flex gap-3 !py-3">
                  <IoBagCheckOutline className="text-[18px]" />
                  <span className="text-[14px]">Orders</span>
                </MenuItem>
              </Link>
              <MenuItem onClick={handleLogout} className="flex gap-3 !py-3">
                <IoLogOutOutline className="text-[18px]" />
                <span className="text-[14px]">Logout</span>
              </MenuItem>
            </Menu>
          </>
        )}

        {/* Cart */}
        <li>
          <Tooltip title="Cart">
            <IconButton
              onClick={() => context.setOpenCartPanel(true)}
              aria-label="cart"
            >
              <Badge badgeContent={beginCartItem} color="success">
                <GiShoppingCart className="w-[25px] lg:w-[30px] text-white hover:text-[#f54c4c]" />
              </Badge>
            </IconButton>
          </Tooltip>
        </li>
      </ul>
    </div>
  </div>

  {/* Navigation */}
  <Navigation data={categoriesData}/>
</header>
  );
};

export default Header;
