import React from "react";
import { Link } from "react-router-dom";
import { Button , message } from "antd";
import axios from "axios";
import { GoPlus } from "react-icons/go";
import { GoDash } from "react-icons/go";
import { CiTrash } from "react-icons/ci";
import api from "../../api";
import BASE_URL from "../../config";

export const CartItems = ({fetchCart,data}) => {
  // console.log(data);
  const handleUpdateQuantity = async (idCartItem, newQuantity) => {
    const quantity = parseInt(newQuantity, 10); // Ép kiểu thành số
  if (isNaN(quantity) || quantity < 1) return; // Kiểm tra số lượng hợp lệ
    try {
      const response = await api.put(
        "/cart/update",
        { idCartItem: idCartItem, quantity: newQuantity },
       
      );

      fetchCart(); 
      // console.log(response.data);
      
    } catch (err) {
      message.error(err.response?.data?.message || "Failed to update quantity");
    }
  };

  const removeCartItem = async (idCartItem) =>{
    // setLoading(true);
    try {
      const response = await api.delete(
        "/cart/remove",
        {
         
          data: { idCartItem },
        }
      );
      message.success("Đã xóa sản phẩm khỏi giỏ hàng");

  

    fetchCart();
    } catch (err) {
      message.error(err.response?.data?.message || "Xóa sản phẩm thất bại");
    }
  }


  // Tính toán tổng tiền (giả định thuế và phí vận chuyển là 0)
  const subtotal = data.tongTien || 0;
  const tax = 0;
  const shipping = data.cartItems.length === 0 ? 0 : 30000;
  const total = subtotal + tax + shipping;
  return (
    

    <div className="cartWrapper mt-6 flex flex-col lg:flex-row gap-6">
  {/* LEFT: Cart Items */}
  <div className="leftPart w-full lg:w-[70%]">
  {data.cartItems.map((item) => {
    const img = JSON.parse(item.imgProduct);
    return (
      <div
        key={item.idProduct}
        className="flex flex-col sm:flex-row items-start gap-4 border border-gray-200 rounded-lg p-4 mb-4 shadow-sm"
      >
        {/* Image */}
        <div className="w-full sm:w-32 flex-shrink-0">
          <img
            src={`${BASE_URL}${img[0]}`}
            alt={item.nameProduct}
            className="w-full aspect-square object-cover rounded-lg bg-gray-100"
          />
        </div>

        {/* Info + Actions */}
        <div className="flex flex-col justify-between flex-grow w-full">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-base font-semibold text-gray-800 truncate max-w-[200px] sm:max-w-[300px]">
                <Link to="/">{item.nameProdcut}</Link>
              </h3>
              <p className="text-sm text-gray-500">
                Đơn giá: {item.priceAtAdd.toLocaleString("vi-VN")} đ
              </p>
              <p className="text-sm font-medium text-orange-600">
                Thành tiền: {item.ThanhTien.toLocaleString("vi-VN")} đ
              </p>
            </div>

            {/* Remove + Heart */}
            <div className="flex gap-2">
              <Button onClick={() => removeCartItem(item.idCartItem)} className="hover:text-red-500 p-2">
                <CiTrash />
              </Button>
              {/* <Button className="hover:text-pink-500 p-2">
                <IoIosHeartEmpty />
              </Button> */}
            </div>
          </div>

          {/* Quantity */}
          <div className="flex mt-3 items-center gap-2">
            <span className="text-sm text-gray-600">Số lượng:</span>
            <div className="flex items-center border rounded-lg overflow-hidden">
              <Button
                onClick={() =>
                  handleUpdateQuantity(item.idCartItem, item.quantity - 1)
                }
                className="px-2 py-1 text-gray-600 hover:text-black"
              >
                <GoDash />
              </Button>
              <input
                readOnly
                value={item.quantity}
                className="w-10 text-center border-l border-r border-gray-200"
              />
              <Button
                onClick={() =>
                  handleUpdateQuantity(item.idCartItem, item.quantity + 1)
                }
                className="px-2 py-1 text-gray-600 hover:text-black"
              >
                <GoPlus />
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  })}
</div>


  {/* RIGHT: Totals */}
  <div className="rightPart w-full lg:w-[30%] sticky top-24 self-start">
    <div className="border border-gray-200 rounded-lg p-6 shadow-sm bg-white">
      <h2 className="text-lg font-semibold mb-4 border-b pb-2">
        Cart Totals
      </h2>

      <div className="space-y-3 text-sm">
        <div className="flex justify-between">
          <span>Thành Tiền</span>
          <span>{subtotal.toLocaleString("vi-VN")} đ</span>
        </div>
        <div className="flex justify-between">
          <span>Thuế</span>
          <span>{tax.toLocaleString("vi-VN")} đ</span>
        </div>
        <div className="flex justify-between">
          <span>Shipping</span>
          <span>{shipping.toLocaleString("vi-VN")} đ</span>
        </div>
        <div className="border-t pt-3 flex justify-between text-base font-semibold">
          <span>Tổng Tiền</span>
          <span>{total.toLocaleString("vi-VN")} đ</span>
        </div>
        <Link to="/checkout">
          <Button className="w-full mt-4 bg-[#D86500] hover:bg-[#bd5500] text-white py-3 rounded-full text-base">
            Đặt Hàng
          </Button>
        </Link>
      </div>
    </div>
  </div>
</div>


  );
};
