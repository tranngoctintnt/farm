import React, { useEffect, useState } from 'react';
import { Modal, Form, Input, Select, Button, message } from "antd";
import axios from 'axios';
import api from '../../api';

const { Option } = Select;

const EditAddressModal = ({ address, onUpdate, visible, setVisible }) => {
  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);
  const [loadingProvinces, setLoadingProvinces] = useState(true);
  const [loadingWards, setLoadingWards] = useState(false);
  const [selectedProvince, setSelectedProvince] = useState(null);
  const [selectedDistrict, setSelectedDistrict] = useState(null);
  const [form] = Form.useForm();

  // Lấy danh sách tỉnh/thành
  useEffect(() => {
    const fetchProvinces = async () => {
      try {
        const res = await axios.get('https://provinces.open-api.vn/api/?depth=3');
        setProvinces(res.data);
      } catch (err) {
        console.error('Lỗi khi lấy danh sách tỉnh:', err);
        message.error('Không thể tải danh sách tỉnh');
      } finally {
        setLoadingProvinces(false);
      }
    };
    fetchProvinces();
  }, []);

  // Điền dữ liệu vào form khi address thay đổi
  useEffect(() => {
    if (address && provinces.length > 0) {
      form.setFieldsValue(address);

      // Tìm province, district, ward tương ứng để điền sẵn
      const province = provinces.find((p) => p.name === address.country);
      if (province) {
        setSelectedProvince(province);
        setDistricts(province.districts || []);
        const district = province.districts.find((d) => d.name === address.stateProvince);
        if (district) {
          setSelectedDistrict(district);
          setWards(district.wards || []);
        }
      }
    }
  }, [address, provinces, form]);

  const handleProvinceChange = (provinceName) => {
    const province = provinces.find((p) => p.name === provinceName);
    setSelectedProvince(province);
    setDistricts(province?.districts || []);
    setSelectedDistrict(null);
    setWards([]);
    form.setFieldsValue({ stateProvince: null, city: null });
  };

  const handleDistrictChange = (districtName) => {
    setLoadingWards(true);
    const district = districts.find((d) => d.name === districtName);
    setSelectedDistrict(district);
    setWards(district?.wards || []);
    setLoadingWards(false);
    form.setFieldsValue({ city: null });
  };

  const handleOk = () => {
    form
      .validateFields()
      .then(async (values) => {
        try {
          const response = await api.put(
            `/addresses/${address.idAddress}`,
            values,
        
          );
          message.success('Địa chỉ đã được cập nhật thành công');
          onUpdate({ ...address, ...values }); // Cập nhật dữ liệu ở parent
          form.resetFields();
          setVisible(false);
        } catch (error) {
          message.error(error.response?.data?.error || 'Không thể cập nhật địa chỉ');
        }
      })
      .catch((info) => {
        console.log("Validate Failed:", info);
      });
  };

  const handleCancel = () => {
    form.resetFields();
    setVisible(false);
  };

  return (
    <Modal
      title="Sửa địa chỉ"
      open={visible}
      onOk={handleOk}
      onCancel={handleCancel}
      okText="Save"
      cancelText="Cancel"
    >
      <Form layout="vertical" form={form}>
        <Form.Item
          name="addressType"
          label="Loại địa chỉ"
          rules={[{ required: true, message: "Vui lòng chọn loại địa chỉ" }]}
        >
          <Select placeholder="Chọn loại">
            <Option value="Home">Home</Option>
            <Option value="Office">Office</Option>
          </Select>
        </Form.Item>

        <Form.Item
          name="fullName"
          label="Họ và tên"
          rules={[{ required: true, message: "Vui lòng nhập tên người nhận" }]}
        >
          <Input placeholder="Họ và tên" />
        </Form.Item>

        <Form.Item
          name="phone"
          label="Số điện thoại"
          rules={[
            { required: true, message: "Vui lòng nhập số điện thoại" },
            { pattern: /^[0-9]{9,15}$/, message: "Số điện thoại không hợp lệ" },
          ]}
        >
          <Input maxLength={10} type="tel" placeholder="Nhập số điện thoại" />
        </Form.Item>

        <Form.Item
          name="country"
          label="Thành phố, Tỉnh"
          rules={[{ required: true, message: "Vui lòng chọn tỉnh/thành phố" }]}
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

        <Form.Item
          name="stateProvince"
          label="Quận, Huyện"
          rules={[{ required: true, message: "Vui lòng chọn quận/huyện" }]}
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

        <Form.Item
          name="city"
          label="Phường, Xã"
          rules={[{ required: true, message: "Vui lòng chọn phường/xã" }]}
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
          rules={[{ required: true, message: "Vui lòng nhập địa chỉ chi tiết" }]}
        >
          <Input.TextArea placeholder="Tên đường, Tòa nhà, Số nhà" autoSize />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default EditAddressModal;