import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { CiHeart } from "react-icons/ci";
import { MdZoomOutMap } from "react-icons/md";
import { Button } from "@mui/material";
import { MdOutlineShoppingCart } from "react-icons/md";
import { MyContext } from "../../App";
import BASE_URL from "../../config";


const ProductItemListView = ({product}) => {
    const context = useContext(MyContext);
    const img = JSON.parse(product.imgProduct);
    const handleOpenProductDetail = () => {
      context.setSelectedProduct(product); // Lưu sản phẩm được chọn vào context
      context.setOpenProductDetailModal(true); // Mở dialog
    };
  const truncateText = (text, maxLength = 50) => {
    return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
  };
  return (
    

    <div className="productItem flex flex-col sm:flex-row shadow-lg rounded-md bg-[#fff] overflow-hidden border border-[rgba(0,0,0,0.1)]">
  {/* Hình ảnh */}
  <div className="imgWrapper w-full sm:w-[30%] overflow-hidden rounded-md relative group">
    <Link to={`/product/${product.idProduct}`}>
      <div className="img h-[250px] sm:h-[250px] flex items-center justify-center relative">
        <img
          className="w-full h-full object-contain transition-all duration-700"
          src={`${BASE_URL}${img[0]}`}
          alt=""
        />
        <img
          className="absolute top-0 left-0 w-full h-full object-contain transition-all duration-700 opacity-0 group-hover:opacity-100 group-hover:scale-105"
          src={`${BASE_URL}${img[1]}`}
          alt=""
        />
      </div>
    </Link>

    {/* Action nút hover */}
    <div className="action absolute top-1 right-1 z-10 flex items-center gap-2 flex-col w-12 transition-all duration-300 group-hover:top-4 opacity-0 group-hover:opacity-100">
      <Button
        onClick={handleOpenProductDetail}
        className="!w-9 !h-9 !min-w-9 !rounded-full group !bg-white hover:!bg-[#ff5252] hover:text-white"
      >
        <MdZoomOutMap className="text-black text-[18px] group-hover:text-black" />
      </Button>
      {/* <Button className="!w-9 !h-9 !min-w-9 !rounded-full group !bg-white hover:!bg-[#ff5252] hover:text-white">
        <CiHeart className="text-black text-[18px] group-hover:text-white" />
      </Button> */}
    </div>
  </div>

  {/* Thông tin sản phẩm */}
  <div className="info w-full sm:w-[70%] p-4">
    <h6 className="text-base font-medium mb-1">
      <Link to="/" className="hover:underline">
        {product.nameProdcut}
      </Link>
    </h6>

    <h3 className="text-lg font-semibold text-[#000] mb-3">
      <Link to="/" className="hover:underline">
        {truncateText(<p>{product.tilteProdcut}</p>)}
      </Link>
    </h3>

    {/* Giá */}
    <div className="flex flex-wrap items-center gap-4 mb-3">
      <span className="line-through text-gray-500 font-medium">
        {product.oldPrice.toLocaleString("vi-VN")} <span>VND</span>
      </span>
      <span className="text-[#D86500] font-bold text-[1.1rem]">
        {product.newPrice.toLocaleString("vi-VN")} <span>VND</span>
      </span>
    </div>

    {/* Nút thêm giỏ hàng */}
    <Button className="btn-pri flex items-center gap-2 !px-5">
      <MdOutlineShoppingCart className="text-[1.1rem]" />
      Add to Cart
    </Button>
  </div>
</div>

  );
};

export default ProductItemListView;
