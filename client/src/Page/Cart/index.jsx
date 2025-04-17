import React, { useEffect, useState } from "react";

import { CartItems } from "./CartItems";
import { message } from "antd";
// import axios from "axios";
import { useAuthUser } from "../../Context/AuthContextUser";
import { useNavigate } from "react-router-dom";
import LoadingComponent from "../../components/Loading";
import { useCart } from "../../Context/CartContext";

const CartPage = () => {
  const navigate = useNavigate();

  const { user,loading } = useAuthUser();
  const {cart, fetchCart} = useCart();


  useEffect(() => {
    if (user && !loading) {
      fetchCart(); // Chỉ gọi khi user đã đăng nhập và không đang loading
    }
  }, [user, loading, fetchCart]);

  if (!cart || !cart.cartItems || cart.length === 0) {
    return <LoadingComponent />;
  }
  // console.log(cart);

  return (
    <>
      {/* {loading === false && ( */}
        <section className="section py-5">
          <div className="container w-[80%] max-w-[80%]">
            <div className="py-2 px-3">
              <h2 className="text-[1.5rem]">Giỏ hàng của bạn</h2>
              <p className="!py-3">
                Bạn có{" "}
                <span className="font-bold  text-primary">
                  {cart.cartItems.length}
                </span>{" "}
                sản phẩm trong giỏ hàng
              </p>
              <CartItems fetchCart={fetchCart} data={cart} />
            </div>
          </div>
        </section>
      {/* )} */}
    </>
  );
};

export default CartPage;
