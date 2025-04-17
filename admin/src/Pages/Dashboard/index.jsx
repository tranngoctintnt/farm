import React, { useEffect, useState } from "react";
import DashBoardBoxes from "../../Components/DashBoardBoxes";
import { Button } from "@mui/material";
import { FaAngleDown } from "react-icons/fa";
import Badge from "../../components/Badge";
import { FaAngleUp } from "react-icons/fa";
import Pagination from "@mui/material/Pagination";
import { useAuth } from "../../Context/AuthContext";
import { useLocation, useNavigate } from "react-router-dom";
import Loading from "../../Components/Loading";
import ProductList from "../Products";
import Orders from "../Orders";

const Dashboard = () => {
  const [isOpenOrderProduct, setisOpenOrderProduct] = useState(null);

  const { user, loading: authLoading } = useAuth();

  // console.log(user.role);
  const navigate = useNavigate();
  const location = useLocation();
  const isShowOrderProduct = (index) => {
    if (isOpenOrderProduct === index) {
      setisOpenOrderProduct(null);
    } else {
      setisOpenOrderProduct(index);
    }
  };
  const successMessage = location.state?.message;
  // console.log(successMessage);

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!authLoading && !user) {
      // console.log(authLoading,user);
      navigate('/auth/login-admin', { replace: true });
    }
  }, [user, authLoading, navigate]);

  if (authLoading) {
    return <div><Loading/></div>;
  }

  if (!user) {
    return null; // Will redirect via useEffect
  }
 
 
  return (
    <>
    {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
      <div className="w-full py-2 px-6 border bg-[#f1faff] rounded-md border-[rgba(0,0,0,0.1)] flex items-center justify-between gap-8 mb-5">
        <div className="info">
          <h1 className="text-[35px] !leading-10 mb-3">
            Welcome,
            <br /> <span>NgocTin</span>
          </h1>
          <p>
            Here’s What happening on your store. See the statistics at once.
          </p>
          <br />
          <Button className="!bg-[#D86500] !text-white !capitalize !py-2 !px-4">
            Add Product
          </Button>
        </div>
        <img src="/shop.webp" alt="" className="w-[250px]" />
      </div>
      <DashBoardBoxes />
      <ProductList/>
      <div className="card border my-4 hadow-md sm:rounded-lg bg-white">
        <div className="flex items-center justify-between px-5 py-5">
          <h2 className="text-[22px]">Recent Orders</h2>
        </div>
        <Orders/>

        {/* <div className="flex items-center justify-center py-4">
          <Pagination count={10} variant="outlined" />
        </div> */}
      </div>
    </>
  );
};
export default Dashboard;
