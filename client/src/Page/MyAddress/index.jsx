import React, { useEffect, useState } from "react";
import AccountSideBar from "../../components/AccountSideBar";
import AddAddressModal from "../../components/AddAddressModal/AddAddressModal";
import { Button, Card, message, Radio, Space, Tag,Typography } from "antd";
import { useAuthUser } from "../../Context/AuthContextUser";
import LoadingComponent from "../../components/Loading";
import "../MyAddress/style.css"
import EditAddressModal from "../../components/EditAddressModal/EditAddressModal";
import api from "../../api";
import axios from "axios";
import { useParams } from "react-router-dom";
const { Text } = Typography;

const MyAddress = () => {
  // const { user } = useAuthUser();
  const [editAddress, setEditAddress] = useState(null);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);

  const [addresses, setAddresses] = useState([]);
  const [selectedAddressId, setSelectedAddressId] = useState(null);
  // const [, setLoading] = useState(true);
  const { user, loading } = useAuthUser();
  const {id} = useParams();

  // const idCustomer = user.id;


  
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
  const fetchAddresses = async () => {
    try {
      const response = await api.get(
        `/addresses/${id}`,
       
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
    } 
  };
 
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

 
  useEffect(() => {
    if (id) {
      fetchAddresses(id);
    }
    
    }, [id]);
  if (loading) {
    return <LoadingComponent />;
  }
  
  if (!user) {
    return <div>Vui lòng đăng nhập để xem địa chỉ của bạn.</div>;
  }

  // console.log(addresses);
  return (
  
    <section className="py-10 w-full bg-[#f9f9f9]">
  <div className="container flex flex-col lg:flex-row gap-5">
    {/* Sidebar */}
    <div className="col1 w-full lg:w-[30%]">
      <AccountSideBar />
    </div>

    {/* Main Content */}
    <div className="col2 w-full lg:w-[70%] py-2">
      <div className="card w-full rounded-md bg-white shadow-md p-5">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
          <h1 className="text-lg font-semibold">Địa chỉ nhận hàng</h1>
          <AddAddressModal
            refreshAddresses={fetchAddresses}
            onAdd={handleAddAddress}
          />
        </div>

        {/* Danh sách địa chỉ */}
        <div className="w-full">
          <Space direction="vertical" className="w-full">
            {addresses.map((addr) => {
              const newAdd = `${addr.streetAddress || ""} - ${addr.city || ""} - ${addr.stateProvince || ""} - ${addr.country || ""}`;

              return (
                <Card
                  key={addr.idAddress}
                  className="p-4 shadow-sm border border-gray-100"
                >
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-3">
                    <Tag color="blue">{addr.addressType}</Tag>

                    <div className="flex gap-2 mt-2 sm:mt-0">
                      <Button
                        className="!bg-[#D86500] py-4 !text-white !px-4 !font-serif"
                        size="small"
                        type="link"
                        onClick={() => handleEditAddress(addr)}
                      >
                        Edit
                      </Button>
                      <Button
                        className="!bg-[#D86500] !py-4 !text-white !px-4 !font-serif"
                        size="small"
                        type="link"
                        onClick={() => handleDeleteAddress(addr.idAddress)}
                      >
                        Delete
                      </Button>
                    </div>
                  </div>

                  <div className="text-sm space-y-1">
                    <Text strong>{addr.fullName}</Text>
                    <p>{newAdd}</p>
                    <p>{addr.phone}</p>
                  </div>
                </Card>
              );
            })}
          </Space>
        </div>
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

export default MyAddress;
