import { Button } from "@mui/material";
import React, { useRef } from "react";
import { QtyBox } from "../QtyBox";
import { MdOutlineShoppingCart } from "react-icons/md";
import { FaRegHeart } from "react-icons/fa";
import { useAuthUser } from "../../Context/AuthContextUser";
import axios from "axios";
import { message } from "antd";
import { useCart } from "../../Context/CartContext";
import api from "../../api";

export const ProductDetailComponent = React.memo(({data}) => {
  const {user} = useAuthUser();
  const {fetchCart} = useCart();
  const qtyRef = useRef();

 

    //   const [productActionInexdex, setProductActionIndex] = useState(null);
    // console.log(data);
    const handleAddCart = async () =>{
      if (user) {
        try {
          const newQuantity = qtyRef.current?.getValue();
  
          // console.log(newQuantity);  
          // console.log(user.accessToken);
          // Gọi API addToCart với idProduct và quantity (mặc định là 1)
          const response = await api.post(
            "/cart/add",{idProduct:data.idProduct, quantity: parseInt(newQuantity,10)});
            fetchCart();

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
  return (
    <>
        <h1 className="text-[1.7rem] font-americana">{data.nameProdcut} </h1>
        <div className="flex items-center my-6 gap-4">
          <span className="old-price line-through text-gray-500 font-[500]">
            {data.oldPrice.toLocaleString("vi-VN")} <span>VND</span>
          </span>
          <span className="old-price text-[#D86500] font-bold">
          {data.newPrice.toLocaleString("vi-VN")} <span>VND</span>
          </span>
        </div>
        {
          data.stockProduct > 0 ? (<span className="text-[#00b853] font-[600] py-2 px-3 bg-[#e5f8ed] rounded-xl">
            Còn hàng
          </span>) : (<span className="text-[rgb(209,58,58)] font-[600] py-2 px-3 bg-[rgb(240,172,172)] rounded-xl">
          Hết hàng
        </span>)
        }
        
        <p className="text-[0.9rem] mt-4">
          {data.tilteProdcut}
        </p>

        <p className="mt-4">Miễn phí vận chuyển</p>

        <div className="flex mt-5 items-center gap-4">
          <div className="qtyBox">
            <QtyBox ref={qtyRef}/>
          </div>
          
{
  data.stockProduct > 0 ? (
<Button onClick={handleAddCart} className="btn-pri flex gap-3 !px-4">
            <MdOutlineShoppingCart className="!text-[1.1rem]" />
            Add to Cart
          </Button>
  ) : (
    <Button disabled={true} className="btn-pri opacity-30 flex gap-3 !px-4">
            <MdOutlineShoppingCart className="!text-[1.1rem]" />
            Add to Cart
          </Button>
  )
}
          

          {/* <div className="ml-2">
            <Button className="!min-w-[2.5rem] !w-[2.5rem] !h-[2.5rem] !rounded-full !bg-[#edeef5] !border !border-solid !border-[rgba(0,0,0,0.1)] text-[#000]">
              <FaRegHeart className="text-[#000]" />
            </Button>
            
          </div> */}
        </div>
    </>
  );
});
