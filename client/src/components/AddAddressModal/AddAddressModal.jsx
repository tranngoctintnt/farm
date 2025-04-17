import React, { useEffect, useState } from "react";
import { Modal, Form, Input, Select, Button, message } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import axios from "axios";
import { useAuthUser } from "../../Context/AuthContextUser";
import api from "../../api";

const { Option } = Select;
const AddAddressModal = ({ onAdd,refreshAddresses }) => {
  const { user } = useAuthUser();
  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);

  const [loadingProvinces, setLoadingProvinces] = useState(true);
  // const [loadingDistricts, setLoadingDistricts] = useState(false);
  const [loadingWards, setLoadingWards] = useState(false);

  const [selectedProvince, setSelectedProvince] = useState(null);
  const [selectedDistrict, setSelectedDistrict] = useState(null);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();

  const showModal = () => setIsModalOpen(true);
  const handleCancel = () => {
    form.resetFields();
    setIsModalOpen(false);
  };

  // Lấy danh sách tỉnh (cấp 3 chứa cả quận và phường)
  useEffect(() => {
    const fetchProvinces = async () => {
      try {
        const res = await axios.get(
          "https://provinces.open-api.vn/api/?depth=3"
        );
        setProvinces(res.data);
      } catch (err) {
        console.error("Lỗi khi lấy danh sách tỉnh:", err);
      } finally {
        setLoadingProvinces(false);
      }
    };

    fetchProvinces();
  }, []);

  // Khi chọn tỉnh → cập nhật quận
  const handleProvinceChange = (provinceName) => {
    const province = provinces.find((p) => p.name === provinceName);
    setSelectedProvince(province);
    setDistricts(province.districts || []);
    setSelectedDistrict(null);
    setWards([]);
  };

  // Khi chọn quận → cập nhật phường
  const handleDistrictChange = (districtName) => {
    setLoadingWards(true);
    const district = districts.find((d) => d.name === districtName);
    setSelectedDistrict(district);
    setWards(district?.wards || []);
    setLoadingWards(false);
  };

  const handleOk = () => {
    form
      .validateFields()
      .then(async (values) => {
        try {
          // Giả sử idCustomer được lấy từ context hoặc state toàn cục
          const idCustomer = user.id; // Thay bằng logic thực tế để lấy idCustomer
          const addressData = { ...values, idCustomer };

          const response = await api.post(
            "/addresses",
            addressData,
           
          );

          message.success("Địa chỉ đã được thêm thành công");
          onAdd(response.data); // Gọi callback để cập nhật danh sách ở parent
          form.resetFields();
          setIsModalOpen(false);
          refreshAddresses();
        } catch (error) {
          message.error(
            error.response?.data?.error || "Không thể thêm địa chỉ"
          );
        }
      })
      .catch((info) => {
        console.log("Validate Failed:", info);
      });
  };
  return (
    <>
      <Button
        variant="outlined"
        className="!py-5 !text-white !bg-[#D86500] !border-0 !font-serif transition-all"
        icon={<PlusOutlined />}
        type="primary"
        onClick={showModal}
      >
        Thêm địa chỉ
      </Button>
      <Modal
        title="Thêm địa chỉ mới"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="Save"
        cancelText="Cancel"
        // getContainer={false}
      >
        <Form layout="vertical" form={form}>
          <Form.Item
            name="addressType"
            label="Loại địa chỉ"
            rules={[{ required: true, message: "Please select address type" }]}
          >
            <Select placeholder="Select type">
              <Option value="Home">Nhà Riêng</Option>
              <Option value="Office">Văn Phòng</Option>
              <Option value="Other">Khác</Option>

            </Select>
          </Form.Item>

          <Form.Item
            name="fullName"
            label="Họ và tên"
            rules={[
              { required: true, message: "Vui lòng nhập tên người nhận" },
            ]}
          >
            <Input placeholder="Full name" />
          </Form.Item>

          <Form.Item
            name="phone"
            label="Số điện thoại"
            rules={[
              { required: true, message: "Vui lòng hãy nhập số điện thoại" },
              {
                pattern: /^[0-9]{9,15}$/,
                message: "Số điện thoại không hợp lệ",
              },
            ]}
          >
            <Input
              maxLength={10} // Giới hạn số ký tự nhập vào
              type="tel" // Chỉ cho phép nhập số
              placeholder="Nhập số điện thoại"
            />
          </Form.Item>
          {/* <Form.Item
            name="city"
            label="Phường, Xã"
            rules={[{ required: true, message: "Vui lòng nhập địa chỉ!" }]}
          >
            <Input.TextArea placeholder="Phường, Xã" autoSize />
          </Form.Item>

          <Form.Item
            name="stateProvince"
            label="Quận, Huyện"
            rules={[{ required: true, message: "Vui lòng nhập địa chỉ!" }]}
          >
            <Input.TextArea placeholder="Quận, Huyện" autoSize />
          </Form.Item>


          <Form.Item
            name="country"
            label="Thành phố, Tỉnh"
            rules={[{ required: true, message: "Vui lòng nhập địa chỉ!" }]}
          >
            <Input.TextArea placeholder="Thành phố, Tỉnh" autoSize />
          </Form.Item> */}
          <Form.Item
            name="country"
            label="Thành phố, Tỉnh"
            rules={[{ required: true, message: "Vui lòng nhập địa chỉ!" }]}
          >
            <Select
              className="w-full"
              showSearch
              placeholder="Chọn tỉnh/thành phố"
              loading={loadingProvinces}
              onChange={handleProvinceChange}
              optionFilterProp="children"
              filterOption={(input, option) =>
                option?.children?.toLowerCase().includes(input.toLowerCase())
              }
            >
              {provinces.map((province) => (
                <Option key={province.code} value={province.name}>
                  {province.name}
                </Option>
              ))}
            </Select>
          </Form.Item>
          {/* Quận/Huyện */}
          <Form.Item
            name="stateProvince"
            label="Quận, Huyện"
            rules={[{ required: true, message: "Vui lòng nhập địa chỉ!" }]}
          >
            <Select
              className="w-full"
              showSearch
              placeholder="Chọn quận/huyện"
              disabled={!selectedProvince}
              onChange={handleDistrictChange}
              value={selectedDistrict?.name}
              optionFilterProp="children"
              filterOption={(input, option) =>
                option?.children?.toLowerCase().includes(input.toLowerCase())
              }
            >
              {districts.map((district) => (
                <Option key={district.code} value={district.name}>
                  {district.name}
                </Option>
              ))}
            </Select>
          </Form.Item>
          {/* Phường/Xã */}
          <Form.Item
            name="city"
            label="Phường, Xã"
            rules={[{ required: true, message: "Vui lòng nhập địa chỉ!" }]}
          >
            <Select
              showSearch
              placeholder="Chọn phường/xã"
              className="w-full"
              disabled={!selectedDistrict}
              loading={loadingWards}
              optionFilterProp="children"
              filterOption={(input, option) =>
                option?.children?.toLowerCase().includes(input.toLowerCase())
              }
              notFoundContent={
                loadingWards ? <Spin size="small" /> : "Không có dữ liệu"
              }
            >
              {wards.map((ward) => (
                <Option key={ward.code} value={ward.name}>
                  {ward.name}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            name="streetAddress"
            label="Tên đường, Tòa nhà, Số nhà"
            rules={[{ required: true, message: "Vui lòng nhập địa chỉ!" }]}
          >
            <Input.TextArea placeholder="Tên đường, Tòa nhà, Số nhà" autoSize />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default AddAddressModal;
