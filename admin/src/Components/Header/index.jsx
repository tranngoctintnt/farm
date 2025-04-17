import React, {  useState } from "react";
import Button from "@mui/material/Button";
import { RiMenu2Fill } from "react-icons/ri";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Divider from "@mui/material/Divider";
import { AiOutlineLogout } from "react-icons/ai";

import { useAuth } from "../../Context/AuthContext";
import { useNavigate } from "react-router-dom";
import api from "../../api";

const Header = () => {
  const [anchorMyAcc, setAnchorMyAcc] = useState(null);
  const openMyAcc = Boolean(anchorMyAcc);
  const { logout } = useAuth(); // Get logout function from context
  const navigate = useNavigate(); // For redirection

  const handleClickMyAcc = (event) => {
    setAnchorMyAcc(event.currentTarget);
  };
  const handleCloseMyAcc = () => {
    setAnchorMyAcc(null);
  };

  const handleLogout = async () => {
      try {
          // Send logout request to backend
         await api.post('/admin/logout', {}, {
              withCredentials: true, // Include cookies in the request
          });
          // console.log('Logout response:', response);
          // Clear local auth state
          logout();
          // console.log('User state cleared');
          // Redirect to login page or home
          navigate('/auth/login-admin');
      } catch (error) {
          console.error('Logout failed:', error);
          alert('Failed to log out. Please try again.');
      }
  };

  // const context = useContext(MyContext);
  return (
    <header className="w-full h-[auto] py-3 pl-96 pr-20 border-b bg-[#fff] shadow-lg flex items-center justify-between">

     
      <div className="part1">
        <Button className="!w-[40px] !h-[40px] !rounded-full !min-w-[40px] !text-[rgba(0,0,0,0.8)]">
          <RiMenu2Fill className="text-[22px] text-[rgba(0,0,0,0.8)]" />
        </Button>
      </div>

      <div className="part2 w-[40%] flex items-center justify-end gap-3">
        {/* <Button className='!w-[40px] !h-[40px] !rounded-full !min-w-[40px] !text-[rgba(0,0,0,0.8)]'>
                    <RiMenu2Fill className= 'text-[18px] text-[rgba(0,0,0,0.8)]'/>
                </Button> */}

        <div className="relative">
          <div
            onClick={handleClickMyAcc}
            className="rounded-full w-[35px] h-[35px] overflow-hidden cursor-pointer"
          >
            <img
              src="/feed1.png"
              alt=""
              className="w-full h-full object-cover"
            />
          </div>

          <Menu
            anchorEl={anchorMyAcc}
            id="account-menu"
            open={openMyAcc}
            onClose={handleCloseMyAcc}
            onClick={handleCloseMyAcc}
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
            <MenuItem onClick={handleCloseMyAcc} className="!bg-white">
              <div className="flex items-center gap-3">
                <div
                  onClick={handleClickMyAcc}
                  className="rounded-full w-[35px] h-[35px] overflow-hidden cursor-pointer"
                >
                  <img
                    src="/feed1.png"
                    alt=""
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="infoMyAcc">
                    <h3 className="text-[1rem] font-[500] leading-5">Ngoc Tin</h3>
                    <p className="text-[13px] font-[400] opacity-70">ngoctin10a11@gmail.com</p>
                </div>
              </div>
            </MenuItem>
            <Divider/>
            {/* <MenuItem onClick={handleCloseMyAcc} className="flex items-center py-2 gap-3">
             <FaRegUser className="text-[1rem]"/> <span className="text-[14px]">Hồ sơ người dùng</span>
            </MenuItem> */}

            <MenuItem onClick={handleLogout} className="flex items-center !py-3 gap-3">
            <AiOutlineLogout className="text-[1.2rem]"/> <span className="text-[16px]">Đăng xuất</span>

            </MenuItem>

            
          </Menu>
        </div>
      </div>
    </header>
  );
};
export default Header;
