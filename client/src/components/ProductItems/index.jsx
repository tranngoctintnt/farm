import React, { useContext, useState } from "react";
import "../ProductItems/style.css";
import { Link } from "react-router-dom";
import { CiHeart } from "react-icons/ci";
import { MdZoomOutMap } from "react-icons/md";
import { Button } from "@mui/material";
import { MyContext } from "../../App";
import { useAuthUser } from "../../Context/AuthContextUser";
import { message } from "antd";
import axios from "axios";
import { useCart } from "../../Context/CartContext";
import api from "../../api";
import BASE_URL from "../../config";

const ProductItems = ({product}) => {
  // const [products, setProducts] = useState([]);
  // const [loading, setLoading] = useState(false);
  const context = useContext(MyContext);
  const {user} = useAuthUser();
    const {fetchCart} = useCart();
  
  // console.log(product.idProduct);
  const truncateText = (text, maxLength = 40) => {
    return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
  };

  const handleOpenProductDetail = () => {
    context.setSelectedProduct(product); // Lưu sản phẩm được chọn vào context
    context.setOpenProductDetailModal(true); // Mở dialog
  };

  const handleAddCart = async () =>{
      if (user) {
        try {
          // console.log(user.accessToken);
          // Gọi API addToCart với idProduct và quantity (mặc định là 1)
          const response = await api.post(
            "/cart/add",{idProduct:product.idProduct, quantity: 1});
            setTimeout(() => {
              fetchCart(); // Gọi lại fetchCart sau một khoảng thời gian
            }, 100); // 500ms 
            // console.log(response.data);
          // Hiển thị thông báo thành công
          message.success("Product added to cart successfully!");
        } catch (err) {
          // Hiển thị thông báo lỗi nếu có
          message.error(err.response?.data?.message || "Failed to add product to cart");
        }
      } else {
        message.error("Bạn chưa đăng nhập!");
      }
  };

  const img = JSON.parse(product.imgProduct);
// console.log(product);
 
  return (
   
     
        <div className="productItem w-full shadow-lg rounded-md overflow-hidden border border-[rgba(0,0,0,0.1)]">
  <div className="imgWrapper w-full overflow-hidden rounded-md relative group">
    <Link to={`/product/${product.idProduct}`}>
      <div className="img lg:h-[300px] sm:h-[200px] max-sm:h-[200px] overflow-hidden">
        <img
          className="w-full h-full object-cover"
          src={`${BASE_URL}${img[0]}`}
          alt={product.nameProdcut}
        />
        {/* <img
          className="absolute p-2 sm:p-3 md:p-4 lg:p-5 xl:p-6 2xl:p-3 h-full w-auto object-cover transition-all duration-700 opacity-0 group-hover:opacity-100 group-hover:scale-105"
          src={`${BASE_URL}${img[1]}`}
          alt={product.nameProdcut}
        /> */}
      </div>
    </Link>

    {/* Discount badge (ẩn tạm, có thể bật lại nếu cần) */}
    {/* <span className="discount absolute top-2 left-2 sm:top-3 sm:left-3 flex items-center p-1 sm:p-2 font-medium bg-[#ff5252] text-white rounded-md text-xs sm:text-sm">
      10%
    </span> */}

    <div className="action absolute top-1 right-1 z-10 flex flex-col items-center gap-1 sm:gap-2 w-10 sm:w-12 md:w-[3.125rem] transition-all duration-300 group-hover:top-2 sm:group-hover:top-3 opacity-0 group-hover:opacity-100">
      <Button
        onClick={handleOpenProductDetail}
        className="!w-7 sm:!w-8 md:!w-[2.188rem] !h-7 sm:!h-8 md:!h-[2.188rem] !min-w-7 sm:!min-w-8 md:!min-w-[2.188rem] !rounded-full !bg-white hover:!bg-[#ff5252] hover:!text-white"
      >
        <MdZoomOutMap className="!text-black text-sm sm:text-base md:text-[18px] group-hover:!text-black" />
      </Button>
      {/* <Button className="!w-7 sm:!w-8 md:!w-[2.188rem] !h-7 sm:!h-8 md:!h-[2.188rem] !min-w-7 sm:!min-w-8 md:!min-w-[2.188rem] !rounded-full !bg-white hover:!bg-[#ff5252] hover:!text-white">
        <CiHeart className="!text-black text-sm sm:text-base md:text-[1.125rem] group-hover:!text-black" />
      </Button> */}
    </div>
  </div>

  <div className="info p-2 sm:p-3 md:p-4 lg:p-5 xl:p-6 2xl:p-3 py-3 sm:py-4 md:py-5 ]">
    <h6 className="text-[18px] sm:text-base md:text-[18px] lg:text-[1.2rem] xl:text-[1.25rem] 2xl:text-[1.2rem] font-americana">
      <Link to={`/product/${product.idProduct}`} className="transition-all hover:text-[#D86500]">
        {product.nameProdcut}
      </Link>
    </h6>
    <h3 className="title text-[16px] sm:text-[16px] md:text-[16px] lg:text-[1rem] xl:text-[1.1rem] 2xl:text-[1rem] mt-1 sm:mt-2 md:mt-3 font-medium text-[#000]">
      <Link to={`/product/${product.idProduct}`} className="transition-all hover:text-[#D86500]">
        {truncateText(product.tilteProdcut)}
      </Link>
    </h3>
    <div className="flex items-center gap-2 sm:gap-3 md:gap-4 mt-1 sm:mt-2">
      <span className="old-price line-through text-gray-500 font-medium text-xs sm:text-sm md:text-base">
        {product.oldPrice.toLocaleString("vi-VN")} <span>đ</span>
      </span>
      <span className="new-price text-[#D86500] font-bold text-sm sm:text-base md:text-lg">
        {product.newPrice.toLocaleString("vi-VN")} <span>đ</span>
      </span>
    </div>
  </div>

  <div className="btnAddCart max-md:ml-[20px] ml-2 sm:ml-3 md:ml-4 pb-2 sm:pb-3 md:pb-4">
    <Link className="transition-all">
      <Button
        onClick={handleAddCart}
        className="!bg-[#D86500] !text-white !px-3 sm:!px-4 md:!px-6 !py-1 sm:!py-2 md:!py-2 text-xs sm:text-sm md:text-base"
      >
        Thêm vào giỏ hàng
      </ Button>
    </Link>
  </div>
</div>
     
  );
};

export default ProductItems;
