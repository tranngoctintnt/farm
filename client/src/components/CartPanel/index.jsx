import React, { useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CiTrash } from "react-icons/ci";
import { Button, message } from "antd";
import { GoPlus } from "react-icons/go";
import { RiSubtractFill } from "react-icons/ri";
import { MyContext } from "../../App";
import { useCart } from "../../Context/CartContext";
import { useAuthUser } from "../../Context/AuthContextUser";

import api from "../../api";
import BASE_URL from "../../config";

const CartPanel = () => {
  const context = useContext(MyContext);
  const navigate = useNavigate();
  const { user, loading } = useAuthUser();
  const { cart, fetchCart } = useCart();

  const handleUpdateQuantity = async (idCartItem, newQuantity) => {
    const quantity = parseInt(newQuantity, 10); // Ép kiểu thành số
    if (isNaN(quantity) || quantity < 1) return; // Kiểm tra số lượng hợp lệ
    try {
      const response = await api.put("/cart/update", {
        idCartItem: idCartItem,
        quantity: newQuantity,
      });

      fetchCart();
      // console.log(response.data);
    } catch (err) {
      message.error(err.response?.data?.message || "Failed to update quantity");
    }
  };

  const removeCartItem = async (idCartItem) => {
    // setLoading(true);
    try {
      const response = await api.delete("/cart/remove", {
        data: { idCartItem },
      });
      message.success("Đã xóa sản phẩm khỏi giỏ hàng");

      // const prevCart = Object.keys(cart);
      //   setCart((prevCart) => (
      //     // console.log(...prevCart),
      //     {
      //     ...prevCart,
      //     cartItems: prevCart.cartItems.filter((item) => item.idCartItem !== idCartItem),
      //   }

      // ));

      fetchCart();
    } catch (err) {
      message.error(err.response?.data?.message || "Xóa sản phẩm thất bại");
    }
  };

  useEffect(() => {
    if (user && !loading && cart.tongSP === 0) {
      // console.log('fetchCart called');
      fetchCart();
    }
  }, [user, loading, cart.tongSP, fetchCart]);
// console.log(cart);
  if (!cart || !cart.cartItems || cart.length === 0) {
    return (
      <>
        <div className="flex items-center justify-center m-auto">
          <Link to="/" onClick={context.toggleCartPanel(false)}>
            <Button className="!py-6 !px-10 !bg-[#D86500] !text-white hover:!border-0 hover:!border-none transition-all ">
              Tiếp tục mua sắm
            </Button>
          </Link>
        </div>
      </>
    );
  }

  return (
    <>
      <div className="custom-scrollbar h-[calc(100vh_-_170px)] overflow-y-auto scroll-smooth pb-3 mb-5 gap-0 divide-y border-b border-gray-100">
        {cart.cartItems.map((item) => {
          const img = JSON.parse(item.imgProduct);

          return (
            <div
              key={item.idProduct}
              className="grid mb-5 gap-0 divide-y border-b border-gray-100"
            >
              <div className="group relative flex items-center justify-between p-4 pb-5 md:px-6">
                <div className="flex items-center pe-3">
                  <div className="relative aspect-[4/4.5] w-16 shrink-0 overflow-hidden rounded-lg bg-gray-100">
                    <img
                      alt={item.nameProdcut}
                      src={`${BASE_URL}${img[0]}`}
                      className="h-full w-full object-cover absolute inset-0"
                    />
                    <span className="absolute inset-0 grid place-content-center group-hover:bg-[rgba(0,0,0,0.4)] opacity-0 transition duration-300 group-hover:opacity-100"></span>
                    <Button
                      onClick={() => removeCartItem(item.idCartItem)}
                      className="absolute w-full h-full left-1/2 p-0 top-1/2 z-10 -translate-x-1/2 group-hover:border-0 group-hover:!bg-transparent -translate-y-1/2 transform rounded text-white opacity-0 transition duration-300 group-hover:opacity-100"
                    >
                      <CiTrash className="text-white text-[22px]" />
                    </Button>
                  </div>
                  <div className="ps-3">
                    <h3 className="rizzui-title-h3 mb-1 text-sm font-medium text-gray-700">
                      <Link
                        to={`/product/${item.idProduct}`}
                        onClick={context.toggleCartPanel(false)}
                      >
                        {item.nameProdcut}
                      </Link>
                    </h3>
                    <div className="text-gray-500">
                      {item.priceAtAdd.toLocaleString("vi-VN")} đ
                    </div>
                    <div className="mt-2 inline-flex py-1 items-center rounded bg-gray-100 p-0.5 text-xs">
                      <Button
                        onClick={() =>
                          handleUpdateQuantity(
                            item.idCartItem,
                            item.quantity - 1
                          )
                        }
                        className="grid h-5 w-5 place-content-center rounded bg-gray-100 border-0 hover:!text-gray-700 hover:!bg-transparent"
                      >
                        <RiSubtractFill />
                      </Button>
                      <span className="grid w-8 place-content-center">
                        {item.quantity}
                      </span>
                      <Button
                        onClick={() =>
                          handleUpdateQuantity(
                            item.idCartItem,
                            item.quantity + 1
                          )
                        }
                        className="grid h-5 w-5 place-content-center rounded bg-gray-100 border-0 hover:!text-gray-700 hover:!bg-transparent"
                      >
                        <GoPlus />
                      </Button>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3 font-medium text-gray-700">
                  {item.ThanhTien.toLocaleString("vi-VN")} <span>đ</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <br />
      <Link
        to="/checkout"
        onClick={context.toggleCartPanel(false)}
        className="mx-4 mb-6 mt-auto flex items-center justify-between rounded-md bg-[#D86500] px-5 py-2 font-medium text-white -foreground md:mx-6"
      >
        Checkout
        <span className="-mr-3 inline-flex rounded-md bg-primary-lighter p-2 px-4 text-primary-dark">
          {cart.tongTien.toLocaleString("vi-VN")} đ
        </span>
      </Link>
    </>
  );
};
export default CartPanel;
