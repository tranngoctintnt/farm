import React from "react";
import api from "../../api";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoEyeOutline } from "react-icons/io5";

import { Table, Space,Button, Tag } from "antd";
import BASE_URL from "../../config";

const CustomerList = () => {
  const [customer, setCustomer] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0,
  });
  useEffect(() => {
    loadCustomer();
  }, []);

  const loadCustomer = async () => {
    try {
      const response = await api.get("/users/getlist");
      setCustomer(response.data);
      setPagination({
        ...pagination,
        current: response.data.page,
        total: response.data.total,
      });
// console.log(response.data.groupedArray);
      setError("");
    } catch (err) {
      setError(err.response?.data?.message || "Error loading categories");
    }
  };

  if(!customer || customer.length === 0) {
   return <p>Hiện tại không có danh sách khách hàng</p>;
  }

  // console.log(customer);

  // Kết hợp dữ liệu từ customer và groupedArray
  const combinedData = customer.groupedArray.map((group) => {
    const newDataCustomer = customer.customer.find(
      (cust) => cust.idCustomer === parseInt(group.idCustomer)
    );
    return {
      idCustomer: group.idCustomer,
      customerName: group.customerName,
      totalAmount: group.totalAmount,
      phone: newDataCustomer.phone ,
      isEmailVerified: newDataCustomer.isEmailVerified,
      fullName: newDataCustomer.fullName ,
      email: newDataCustomer.email ,
      avatar: newDataCustomer.avatar,
    };
  });

  console.log(combinedData);

  const columns = [
    {
      title: "Name",
      key: "fullName",
      width: 400,
      render: (_, record) => (
        <Space size="small">
          <div className="flex items-center gap-5">
            <div className="img w-[65px] min-w-[65px] p-2 h-[65px] overflow-hidden group">
              <img
                src={`${BASE_URL}${record.avatar}`}
                className="w-full h-full rounded-md group-hover:scale-105 transition-all"
                alt={record.fullName}
              />
            </div>

            <div className="info flex flex-col">
              <h3 className="font-[400] text-[16px] hover:text-primary">
                {record.fullName}
              </h3>
              <h4>{record.reviewText}</h4>
            </div>
          </div>
        </Space>
      ),
    },
    {
      title: "Email",
      key: "email",
      dataIndex: "email",
      render: (email) => <span>{email}</span>,
      sorter: (a, b) => a.email.localeCompare(b.email),
    },
    {
      title: "Phone",
      key: "phone",
      dataIndex: "phone",
      render: (phone) => <span>{phone}</span>,
      sorter: (a, b) => a.phone.localeCompare(b.phone),
    },

    {
      title: "Status",
      key: "isEmailVerified",
      dataIndex: "isEmailVerified",
      render: (isEmailVerified) => (
        <Tag color={isEmailVerified ? "green" : "red"}>
          {isEmailVerified ? "Active" : "Inactive"}
        </Tag>
      ),
      // sorter: (a, b) => Number(a.isActive) - Number(b.isActive),
      sorter: (a, b) => a.isEmailVerified - b.isEmailVerified,
    },

    {
      title: "Spent",
      key: "totalAmount",
      dataIndex: "totalAmount",
      render: (totalAmount) => <strong>{totalAmount.toLocaleString("vi-VN")} đ</strong>,
      sorter: (a, b) => a.totalAmount - b.totalAmount,

    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="small">
          <Button
            className="hover:!border-primary hover:!text-primary"
            onClick={() =>
              navigate(`/customer/orderOfCustomer/${record.idCustomer}`)
            }
          >
            <IoEyeOutline />
          </Button>
          {/* <Button
            className="hover:!border-primary hover:!text-primary"
            onClick={() => showDeleteConfirm(record.idProduct)}
          >
            <PiTrashLight />
          </Button> */}
        </Space>
      ),
    },

  ];

  return (
    <>
      <h2 className="text-[24px] py-6">Customer</h2>
      {error && <div style={{ color: "red", marginBottom: 16 }}>{error}</div>}
      <Table
        rowKey="idCustomer"
        columns={columns}
        dataSource={combinedData}
        size="middle"
        pagination={pagination}
        className="!bg-white border px-5 rounded-md"
      />
    </>
  );
};

export default CustomerList;
