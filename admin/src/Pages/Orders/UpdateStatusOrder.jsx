import React from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { IoArrowBackOutline } from "react-icons/io5";
import { Button,Modal } from "antd";
import DetaiOrder from "../../Components/DetaiOrder/DetaiOrder";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { message } from "antd";
import api from "../../api";
const UpdateStatusOrder = () => {
  const [orderItem, setOrderItem] = useState([]);
  const [loading, setLoading] = useState(false);
  const [newStatus, setNewStatus] = useState(null); // Lưu trạng thái mới
  const navigate = useNavigate();

  const { id } = useParams(); // Get the ID from the URL
  // console.log(id);
  const subTotal = orderItem.totalAmount;
  const shipping = 30000;
  const total = subTotal + shipping;
  const fetchOrderItems = async () => {
    try {
      const response = await api.get(
        `/orders/orderdetail/${id}`,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      // console.log("Fetched order items:", response.data.orders[0]);

      setOrderItem(response.data.orders[0]);
      setNewStatus(response.data.orders[0].orderStatus); // Khởi tạo trạng thái mới
      setLoading(false);
    } catch (error) {
      console.error("Failed to fetch order items:", error);
      if (error.response?.status === 401 || error.response?.status === 403) {
        message.error(error.response?.status);
      }
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchOrderItems();
  }, [id]);


  // Xử lý thay đổi trạng thái từ DetaiOrder
  const handleStatusChange = (value) => {
    setNewStatus(value);
  // setIsStatusChanged(value !== orderItem.orderStatus);

  };


  // Xử lý lưu trạng thái
  const handleSave = async () => {
    if (!newStatus) {
      message.warning('Vui lòng chọn trạng thái đơn hàng');
      return;
    }
// console.log("New status:", newStatus);
// console.log("Order ID:", id);
    Modal.confirm({
      title: 'Xác nhận cập nhật',
      content: `Bạn có chắc muốn thay đổi trạng thái đơn hàng thành ${newStatus}?`,
      onOk: async () => {
        try {
          setLoading(true);
          const response = await api.put(
            '/orders/update-status',
            { idOrder: id, newStatus },
            { withCredentials: true, headers: { 'Content-Type': 'application/json' } }
          );
          message.success(response.data.message);
          setOrderItem((prev) => ({ ...prev, orderStatus: newStatus }));
        } catch (error) {
          message.error(error.response?.data?.message || 'Cập nhật trạng thái thất bại');
        } finally {
          setLoading(false);
        }
      },
    });
  };

  if (orderItem.length === 0 || !orderItem) {
    return (
      <div className="flex justify-center items-center h-screen">
        <h2 className="text-[16px] font-semibold text-gray-800">Loading...</h2>
      </div>
    );
  }

  console.log("Order Item:", orderItem);
  return (
    <section className="py-10 w-full">
      <div className="container flex flex-col lg:flex-row gap-6">
        {/* Main Content */}
        <div className="col2 w-full">
          <div className="card bg-white shadow-lg rounded-lg p-6">
            <div className="infoOrder">
              {/* Header */}

              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <Link
                  to="/order/order-list"
                  className="flex items-center gap-2 text-[14px] text-gray-600 hover:text-gray-800 transition"
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
            <DetaiOrder  data={orderItem} status={newStatus} onStatusChange={handleStatusChange} />
          </div>

          {/* Back Button */}
          <div className="mt-6 flex items-center justify-end gap-6 text-end">
            <Link className="transition-all" to="/order/order-list">
              <Button className="py-4 px-8 bg-green-100 hover:bg-green-200 text-green-700 rounded-full text-[14px] font-semibold">
                Quay lại 
              </Button>
            </Link>

            <Button onClick={handleSave} 
              loading={loading} className="py-4 px-8 bg-green-100 hover:bg-green-200 text-green-700 rounded-full text-[14px] font-semibold">
                Save
              </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default UpdateStatusOrder;
