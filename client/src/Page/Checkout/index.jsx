import {
  Button,
  Radio,
  Card,
  Typography,
  Space,
  Tag,
  Input,
  message,
} from "antd";
import React, { useEffect, useState } from "react";
import { IoBagCheckOutline } from "react-icons/io5";
import "../Checkout/style.css";

import AddAddressModal from "../../components/AddAddressModal/AddAddressModal";
import { useAuthUser } from "../../Context/AuthContextUser";
import axios from "axios";
import LoadingComponent from "../../components/Loading";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../../Context/CartContext";
import EditAddressModal from "../../components/EditAddressModal/EditAddressModal";
import EmptyCheckout from "../../components/EmptyCheckout";
import api from "../../api";
import BASE_URL from "../../config";
const { Text } = Typography;

const Checkout = () => {
  // const {form} = useForm()
  const { user } = useAuthUser();
  const { cart, fetchCart } = useCart();
  const [addresses, setAddresses] = useState([]);
  const [selectedAddressId, setSelectedAddressId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editAddress, setEditAddress] = useState(null);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [checkoutLoading, setCheckoutLoading] = useState(false);
  const navigate = useNavigate();
  // const handleAddAddress = (address) => {
  //   console.log("New address:", address);
  //   // Gọi API hoặc cập nhật state
  // };
  const idCustomer = user?.id;
  // Lấy danh sách địa chỉ

  const fetchAddresses = async () => {
    try {
      const response = await api.get(
        `/addresses/${idCustomer}`
      );
      // console.log(response.data);
      setAddresses(response.data);
      if (response.data.length > 0) {
        setSelectedAddressId(response.data[0].idAddress); // Chọn địa chỉ đầu tiên mặc định
      }
    } catch (error) {
      message.error(
        error.response?.data?.error || "Không thể tải danh sách địa chỉ"
      );
    } finally {
      setLoading(false);
    }
  };

  // Xử lý checkout
  const handleCheckout = async () => {
    if (!selectedAddressId) {
      message.error('Vui lòng chọn một địa chỉ trước khi đặt hàng');
      return;
    }
  
    setCheckoutLoading(true);
    try {
      const response = await api.post(
        '/orders/checkout',
        { idAddress: selectedAddressId },
      
      );
      // console.log('Checkout response:', response.data);
      message.success(`Đặt hàng thành công! Mã đơn hàng: #${response.data.orderId}`);
      fetchCart();
      navigate("/my-order");


    } catch (error) {
      console.error('Checkout error:', error.response?.data);
      message.error(error.response?.data?.message || 'Đặt hàng thất bại');
    } finally {
      setCheckoutLoading(false);
    }
  };
  useEffect(() => {
    if (idCustomer) {
      fetchAddresses(idCustomer);
    }
  }, [idCustomer]);
  // Thêm địa chỉ mới
  const handleAddAddress = (newAddress) => {
    setAddresses((prev) => [
      ...prev,
      { idAddress: newAddress.idAddress, ...newAddress },
    ]);
  };

  // Xóa địa chỉ
  const handleDeleteAddress = async (idAddress) => {
    try {
      await api.delete(`/addresses/${idAddress}`);
      setAddresses((prev) =>
        prev.filter((addr) => addr.idAddress !== idAddress)
      );
      if (selectedAddressId === idAddress) {
        setSelectedAddressId(addresses[0]?.idAddress || null);
      }
      message.success("Địa chỉ đã được xóa");
    } catch (error) {
      message.error(error.response?.data?.error || "Không thể xóa địa chỉ");
    }
  };

  // Sửa địa chỉ (mở modal với dữ liệu cũ)
  // Mở modal sửa địa chỉ
  const handleEditAddress = (address) => {
    setEditAddress(address);
    setIsEditModalVisible(true);
  };

  // Cập nhật địa chỉ sau khi sửa
  const handleUpdateAddress = (updatedAddress) => {
    setAddresses((prev) =>
      prev.map((addr) =>
        addr.idAddress === updatedAddress.idAddress ? updatedAddress : addr
      )
    );
  };

  if (!user && loading ) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <LoadingComponent />
      </div>
    );
  }
  if(!cart && loading){
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <LoadingComponent />
      </div>
    );
  }
  if (loading) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <LoadingComponent />
      </div>
    );
  }
  if (!cart || !cart.cartItems || cart.cartItems.length === 0) {
    return <EmptyCheckout />;
  }

  if (!user && loading) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <LoadingComponent />
      </div>
    );
  }

  const handleChange = (e) => {
    setSelectedAddressId(e.target.value);
    // console.log(selectedAddressId);
  };
  const subtotal = cart.tongTien || 0;
  const tax = 0;
  const shipping = cart.cartItems.length === 0 ? 0 : 30000;
  const total = subtotal + tax + shipping;
  return (
   
    <section className="py-6 px-3 bg-[#f9f9f9] md:px-6">
  <div className="container flex flex-col lg:flex-row gap-5">
    {/* Cột trái - Địa chỉ */}
    <div className="leftCol w-full lg:w-[55%] 2xl:w-[60%]">
      <div className="card w-full rounded-md bg-white shadow-md p-5">
        <div className="flex items-center justify-between flex-wrap gap-3">
          <h1 className="text-lg font-semibold">Địa chỉ nhận hàng</h1>
          <AddAddressModal
            refreshAddresses={fetchAddresses}
            onAdd={handleAddAddress}
          />
        </div>

        <div className="w-full mt-4">
          {loading ? (
            <LoadingComponent />
          ) : addresses.length === 0 ? (
            <p>Chưa có địa chỉ nào</p>
          ) : (
            <Radio.Group
              className="w-full"
              onChange={handleChange}
              value={selectedAddressId}
            >
              <Space direction="vertical" className="w-full">
                {addresses.map((addr) => {
                  const newAdd = `${addr.streetAddress || ""} - ${
                    addr.city || ""
                  } - ${addr.stateProvince || ""} - ${addr.country || ""}`;

                  return (
                    <Card
                      key={addr.idAddress}
                      style={{
                        borderColor:
                          selectedAddressId === addr.idAddress
                            ? "#ffccc7"
                            : "#d9d9d9",
                        background:
                          selectedAddressId === addr.idAddress
                            ? "#fff1f0"
                            : "#fff",
                      }}
                      className="p-4"
                    >
                      <Space align="start" className="w-full btn">
                        <Radio value={addr.idAddress} />
                        <div className="w-full">
                          <div className="flex flex-wrap items-center justify-between mb-3 gap-2">
                            <Tag color="blue">{addr.addressType}</Tag>
                            <div className="flex gap-2">
                              <Button
                                className="!bg-[#D86500] py-4 !text-white !px-4 !font-serif"
                                size="small"
                                type="link"
                                onClick={() => handleEditAddress(addr)}
                              >
                                Edit
                              </Button>
                              <Button
                                className="!bg-[#D86500] py-4 !text-white !px-4 !font-serif"
                                size="small"
                                type="link"
                                onClick={() =>
                                  handleDeleteAddress(addr.idAddress)
                                }
                              >
                                Delete
                              </Button>
                            </div>
                          </div>
                          <div className="flex flex-col">
                            <Text strong>{addr.fullName}</Text>
                            <Text>{newAdd}</Text>
                            <Text>{addr.phone}</Text>
                          </div>
                        </div>
                      </Space>
                    </Card>
                  );
                })}
              </Space>
            </Radio.Group>
          )}
        </div>
      </div>
    </div>

    {/* Cột phải - Hóa đơn */}
    <div className="rightCol w-full lg:w-[45%]">
      <div className="shadow-md bg-white p-5 rounded-md">
        <h2 className="text-base md:text-lg font-semibold mb-4">Hóa Đơn</h2>

        <div className="flex items-center justify-between text-sm border-y py-3 px-2 mb-4">
          <span className="font-medium">Sản Phẩm</span>
          <Link to="/cart">
            <span className="text-[#d86500] underline font-medium">
              Thay đổi sản phẩm
            </span>
          </Link>
        </div>

        <div className="mb-5 max-h-[300px] md:max-h-[350px] overflow-y-auto pr-2">
          {cart.cartItems.map((item) => {
            const img = JSON.parse(item.imgProduct);
            return (
              <div
                key={item.idCartItem}
                className="flex items-center justify-between py-3"
              >
                <div className="flex items-center gap-3">
                  <div className="img rounded-md group overflow-hidden object-cover">
                    <img
                      className="w-[70px] h-[60px] md:w-[90px] md:h-[70px] transition-all group-hover:scale-105"
                      src={`${BASE_URL}/${img[0]}`}
                      alt=""
                    />
                  </div>
                  <div className="infoOrder">
                    <h4 className="text-[13px] md:text-[14px] font-medium mb-2">
                      {item.nameProdcut}
                    </h4>
                    <span className="text-[13px]">
                      {item.priceAtAdd.toLocaleString("vi-VN")} x{" "}
                      <span>{item.quantity}</span>
                    </span>
                  </div>
                </div>

                <span className="text-[13px] md:text-[14px] font-semibold">
                  {item.ThanhTien.toLocaleString("vi-VN")} <span>đ</span>
                </span>
              </div>
            );
          })}
        </div>

        <hr className="mt-10" />

        <div className="mt-6 grid grid-cols-1 gap-4 md:gap-6 text-sm md:text-base">
          <div className="flex items-center justify-between">
            Thành Tiền
            <span className="font-medium text-gray-800">
              {subtotal.toLocaleString("vi-VN")} <span>đ</span>
            </span>
          </div>
          <div className="flex items-center justify-between">
            Thuế
            <span className="font-medium text-gray-800">0</span>
          </div>
          <div className="flex items-center justify-between">
            Shipping
            <span className="font-medium text-gray-800">
              {shipping.toLocaleString("vi-VN")} <span>đ</span>
            </span>
          </div>
          <div className="border-t pt-4 flex items-center justify-between font-semibold text-gray-900">
            Tổng Tiền
            <span className="font-semibold">
              {total.toLocaleString("vi-VN")} <span>đ</span>
            </span>
          </div>
        </div>

        <Button
          onClick={handleCheckout}
          loading={checkoutLoading}
          disabled={!selectedAddressId || checkoutLoading}
          className="btn-pri w-full !py-4 md:!py-6 flex items-center justify-center gap-2 mt-5"
        >
          <IoBagCheckOutline className="text-[20px]" />
          Đặt hàng
        </Button>
      </div>
    </div>
  </div>

  {editAddress && (
    <EditAddressModal
      address={editAddress}
      onUpdate={handleUpdateAddress}
      visible={isEditModalVisible}
      setVisible={setIsEditModalVisible}
    />
  )}
</section>

  );
};

export default Checkout;
