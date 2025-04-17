import React, { useContext, useEffect } from "react";
import AccountSideBar from "../../components/AccountSideBar";
import { Link, useNavigate } from "react-router-dom";
import { Button, message } from "antd";
import { useOrder } from "../../Context/OrderContext";
import { useAuthUser } from "../../Context/AuthContextUser";
import { MyContext } from "../../App";
import axios from "axios";
import DetailOrder from "../../components/DetailOrder/DetailOrder";
import api from "../../api";
import LoadingComponent from "../../components/Loading";

const Orders = () => {
  const context = useContext(MyContext);
  const { user,loading } = useAuthUser();
  const navigate = useNavigate();
  const { orderUser, fetchOrder } = useOrder();


  useEffect(() => {
    if (user) {
      fetchOrder();
      // message.error("Bạn chưa đăng nhập!");
      // navigate("/login");
      // return;
    }

    
  }, [user, fetchOrder]);

  if (!user || loading) {
    return <LoadingComponent />;
  }

  const cancelOrder = async (idOrder) => {
    // console.log(idOrder);
    try {
      const response = await api.put(
        "/orders/cancel",
        {
          idOrder,
        },
        
      );
      message.success("Đã hủy đơn hàng thành công");
      fetchOrder();
    } catch (error) {
      message.error(error.response?.data?.message || "Hủy đơn hàng thất bại");
    }
  };
  if (!orderUser || !orderUser.orders || orderUser.orders.length === 0) {
    return (
      <section className="py-10 bg-[#f9f9f9]  w-full">
        <div className="container flex flex-col lg:flex-row gap-5">
          <div className="col1 w-full lg:w-[30%]">
            <AccountSideBar />
          </div>

          <div className="col2 w-full lg:w-[70%] py-2 px-3">
            <div className="flex flex-col gap-6">
              <div className="py-5 px-3 border-b rounded-lg shadow-md border-[rgba(0,0,0,0.1)]">
                <h2 className="text-[1.2rem] font-[500]">Đơn hàng của bạn</h2>
              </div>
              <p className="text-[14px]">Hiện tại bạn chưa sở hữu đơn hàng nào tại Suối Tiên Farm</p>
              <div className="flex items-center justify-center mt-20">
                <Link to="/" onClick={context.toggleCartPanel(false)}>
                  <Button className="!py-6 !px-10 !bg-[#D86500] !text-white hover:!border-0 hover:!border-none transition-all">
                    Tiếp tục mua sắm
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
  // console.log(orderUser);

  // console.log(orderUser);
  return (
    <section className="py-10 bg-[#f9f9f9]  w-full">
      <div className="container flex flex-col lg:flex-row gap-5">
        <div className="col1 w-full lg:w-[30%]">
          <AccountSideBar />
        </div>

        <div className="col2 w-full lg:w-[70%] py-2 px-3">
          <div className="flex flex-col gap-6">
            <div className="py-5 px-3 rounded-lg border-b shadow-md border-[rgba(0,0,0,0.1)]">
              <h2 className="text-[1.2rem] font-[500]">Đơn hàng của bạn</h2>
            </div>

            {orderUser.orders.map((orderItem) => {
              // console.log(orderItem);

              return (
                <div
                  key={orderItem.idOrder}
                  className="contentOrder rounded-md shadow-md"
                >
                  <div className="max-sm:p-3 lg:p-6 flex flex-col gap-5">
                    <div className="flex flex-row sm:flex-row items-start sm:items-center justify-between mb-1 gap-3 sm:gap-0">
                      <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
                        <h2 className="mr-3 font-[500] text-[14px]">
                          #{orderItem.idOrder}
                        </h2>
                        <span className="text-[14px]">
                          ({orderItem.items.length} sản phẩm / 1 kiện)
                        </span>
                      </div>

                      <Link
                        state={{ orderItems: orderItem }}
                        className="text-blue-800 text-[14px]"
                        to={`/order-detail/${orderItem.idOrder}`}
                      >
                        Chi tiết
                      </Link>
                    </div>

                    <DetailOrder orderItems={orderItem} />

                    <Button
                      onClick={() => cancelOrder(orderItem.idOrder)}
                      className={`w-[120px] ${
                        orderItem.orderStatus === "Pending"
                          ? "opacity-100"
                          : "opacity-0 cursor-default"
                      } text-[#ff5252] border-[#ff5252] rounded-lg py-4 text-[14px]`}
                    >
                      Hủy đơn
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
export default Orders;
