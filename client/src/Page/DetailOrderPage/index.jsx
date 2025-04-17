import React from "react";
import AccountSideBar from "../../components/AccountSideBar";
import DetailOrder from "../../components/DetailOrder/DetailOrder";
import { Link, useLocation } from "react-router-dom";
import { IoArrowBackOutline } from "react-icons/io5";
import { Button } from "antd";

const DetailOrderPage = () => {
  const location = useLocation();
  const orderItem = location.state?.orderItems || [];
  const subTotal = orderItem.totalAmount;
  const shipping = 30000;
  const total = subTotal + shipping;

  return (
    <section className="py-10 w-full bg-gray-50">
      <div className="container flex flex-col lg:flex-row gap-6">
        {/* Sidebar */}
        <div className="col1 w-full lg:w-[30%]">
          <AccountSideBar />
        </div>

        {/* Main Content */}
        <div className="col2 w-full lg:w-[70%]">
          <div className="card bg-white shadow-lg rounded-lg p-6">
            <div className="infoOrder">
              {/* Header */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <Link
                  to="/my-order"
                  className="flex items-center gap-2 text-[16px] text-gray-600 hover:text-gray-800 transition"
                >
                  <IoArrowBackOutline />
                  Quay lại
                </Link>
                <h2 className="text-[16px] font-semibold text-gray-800">
                  Chi tiết đơn hàng #{orderItem.idOrder}
                </h2>
              </div>

              {/* Order Details */}
              <div className="flex flex-col md:flex-row w-full mt-6 gap-6">
                {/* Left Column */}
                <div className="w-full md:w-[50%] px-4 pb-4 md:border-r border-gray-200">
                  <h4 className="text-[16px] text-gray-700">
                    Mã đơn hàng: <strong>#{orderItem.idOrder}</strong> (
                    {orderItem.items.length} sản phẩm / 1 kiện)
                  </h4>
                  <h4 className="text-[16px] text-gray-700 mt-2">
                    Ngày đặt: {orderItem.orderDate}
                  </h4>
                  <div className="mt-4">
                    <h2 className="font-semibold text-[16px] text-gray-800">
                      Địa chỉ nhận hàng
                    </h2>
                    <div className="flex items-center mt-2">
                      <span className="bg-green-600 text-white text-[12px] lg:px-3 px-1 py-1 rounded-full mr-2">
                        {orderItem.addressType}
                      </span>
                      <span className="text-[16px] text-gray-700">
                        {orderItem.customerName} - {orderItem.customerPhone}
                      </span>
                    </div>
                    <h2 className="text-[16px] text-gray-700 mt-2">
                      {orderItem.shippingAddress}
                    </h2>
                  </div>
                </div>

                {/* Right Column */}
                <div className="w-full md:w-[50%] px-4">
                  <div className="payment flex items-center justify-between border-b pb-3 border-gray-200">
                    <h2 className="text-[16px] font-semibold text-gray-800">
                      Hình thức thanh toán
                    </h2>
                    <h2 className="bg-green-100 px-3 py-1 text-[12px] rounded-full text-green-700">
                      Thanh toán khi nhận hàng
                    </h2>
                  </div>

                  <div className="subTotal py-4 border-b border-gray-200">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-[16px] text-gray-700">
                        Tạm tính ({orderItem.items.length})
                      </h3>
                      <h3 className="text-[16px] text-gray-800">
                        {subTotal.toLocaleString("vi-VN")} đ
                      </h3>
                    </div>
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-[16px] text-gray-700">Thuế</h3>
                      <h3 className="text-[16px] text-gray-800">0 đ</h3>
                    </div>
                    <div className="flex items-center justify-between">
                      <h3 className="text-[16px] text-gray-700">
                        Phí vận chuyển
                      </h3>
                      <h3 className="text-[16px] text-gray-800">
                        {shipping.toLocaleString("vi-VN")} đ
                      </h3>
                    </div>
                  </div>

                  <div className="totalAmount py-4 flex items-center justify-between">
                    <h2 className="text-[16px] font-semibold text-gray-800">
                      Thành tiền (Đã VAT)
                    </h2>
                    <h2 className="text-[#f60] text-[16px] font-bold">
                      {total.toLocaleString("vi-VN")} đ
                    </h2>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Product Order */}
          <div className="productOrder bg-white mt-6 shadow-lg rounded-lg p-6">
            <DetailOrder orderItems={orderItem} />
          </div>

          {/* Back Button */}
          <div className="mt-6 text-end">
            <Link className="transition-all" to="/my-order">
              <Button className="py-4 px-8 bg-green-100 hover:bg-green-200 text-green-700 rounded-full text-[16px] font-semibold">
                Quay lại đơn hàng
              </Button>
            </Link>

            
          </div>
        </div>
      </div>
    </section>

    
  );
};

export default DetailOrderPage;