import React from 'react'
import { FaCloudUploadAlt } from "react-icons/fa";
import { FaRegUser } from "react-icons/fa";
import { IoLocationOutline } from "react-icons/io5";
import { IoBagCheckOutline } from "react-icons/io5";
import { IoLogOutOutline } from "react-icons/io5";
import { NavLink, useNavigate } from "react-router-dom";
import { Button } from '@mui/material';
import { useAuthUser } from '../../Context/AuthContextUser';
import { message } from 'antd';
import LoadingComponent from '../Loading';
import api from '../../api';
import BASE_URL from '../../config';
 const AccountSideBar = () => {
  const {user, logout, loading} = useAuthUser();
  const navigate = useNavigate();

  if(loading){
    return <LoadingComponent/>
  }
  const handleLogout = async () => {
    try {
      // Send logout request to backend
      await api.post(
        "/user/logout",
        
      );
      // console.log('Logout response:', response);
      // Clear local auth state
      logout();
      // console.log('User state cleared');
      // Redirect to login page or home
      message.success("Logout susscesLogged out successfully");
      navigate("/");
    } catch (error) {
      console.error("Logout failed:", error);
      message.error("Failed to log out. Please try again.");
    }
  };
  return (
 
  <div className="card bg-white shadow-md rounded-md p-5 w-full">
  {/* Avatar + Info */}
  <div className="w-full flex flex-col items-center justify-center text-center border-b border-gray-200 pb-5">
    <div className="w-[90px] h-[90px] rounded-full overflow-hidden relative group mb-3">
      <img
        src={`${BASE_URL}${user.avatar}`}
        alt="avatar"
        className="w-full h-full object-cover"
      />
      <div className="overlay absolute top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
        <FaCloudUploadAlt className="text-white text-xl" />
        <input
          type="file"
          className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
        />
      </div>
    </div>
    <h3 className="text-base font-semibold">{user.fullName}</h3>
    <p className="text-sm text-gray-500">{user.email}</p>
  </div>

  {/* Menu Items */}
  <ul className="mt-5 space-y-2">
    <li>
      <NavLink
        to={`/my-account/${user.id}`}
        className={({ isActive }) =>
          `block ${isActive ? "bg-gray-100 font-medium" : ""}`
        }
      >
        <Button className="w-full !justify-start !text-left !text-gray-700 !capitalize px-4 py-2 flex items-center gap-3">
          <FaRegUser className="text-lg" />
          Hồ sơ
        </Button>
      </NavLink>
    </li>

    <li>
      <NavLink
        to={`/my-address/${user.id}`}
        className={({ isActive }) =>
          `block ${isActive ? "bg-gray-100 font-medium" : ""}`
        }
      >
        <Button className="w-full !justify-start !text-left !text-gray-700 !capitalize px-4 py-2 flex items-center gap-3">
          <IoLocationOutline className="text-lg" />
          Địa chỉ
        </Button>
      </NavLink>
    </li>

    <li>
      <NavLink
        to={`/my-order/${user.id}`}
        className={({ isActive }) =>
          `block ${isActive ? "bg-gray-100 font-medium" : ""}`
        }
      >
        <Button className="w-full !justify-start !text-left !text-gray-700 !capitalize px-4 py-2 flex items-center gap-3">
          <IoBagCheckOutline className="text-lg" />
          Đơn hàng của tôi
        </Button>
      </NavLink>
    </li>

    <li>
      <Button
        onClick={handleLogout}
        className="w-full !justify-start !text-left !text-gray-700 !capitalize px-4 py-2 flex items-center gap-3"
      >
        <IoLogOutOutline className="text-lg" />
        Đăng xuất
      </Button>
    </li>
  </ul>
</div>

  )
}
export default AccountSideBar;
