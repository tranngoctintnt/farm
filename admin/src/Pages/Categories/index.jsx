import React, { useEffect, useState } from "react";
import { Button, Table, Space, message, Modal,Switch } from "antd";
import { FiEdit } from "react-icons/fi";
import { PiTrashLight } from "react-icons/pi";
import { useNavigate } from "react-router-dom";
import Loading from "../../Components/Loading";
import api from "../../api";
import BASE_URL from "../../config";

const { confirm } = Modal;

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [switchLoading, setSwitchLoading] = useState(false); // Local loading state
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 4,
    total: 0,
  });
  useEffect(() => {
    loadCategories();
  }, []);


  const handleSwitchChange = async (idCategory,checked) => {
    // console.log(idCategory,checked);
    setSwitchLoading(true);
    try {
      const response = await api.put(
        `/statusCaterory/${idCategory}`,
        { isActive: checked },
        { withCredentials: true }
      );
      setCategories((prevData) =>
        prevData.map((category) =>
          category.idCategory === idCategory
            ? { ...category, isActiveCate: checked } // Update the isActive status
            : category
        )
      );
      // console.log("Status updated:", response.data);
      message.success("Category status updated successfully");
    } catch (error) {
      console.error("Failed to update status:", error);
      message.error("Failed to update status");
    } finally {
      setSwitchLoading(false);
    }

   
  };

  const loadCategories = async () => {
    try {
      const response = await api.get("/category");
      setCategories(response.data.data);
      setPagination({
        ...pagination,
        current: response.data.page,
        total: response.data.total,
      });
      setError("");
    } catch (err) {
      setError(err.response?.data?.message || "Error loading categories");
    }
  };
  const deleteCate = async (idCategory) => {
    setLoading(true);
    try {
      const response = await api.delete(
        `/category/${idCategory}`,
        {
          withCredentials: true,
        }
      );
      setCategories((prevData) =>
        prevData.filter((user) => user.idCategory !== idCategory)
      );
      setPagination((prev) => ({
        ...prev,
        total: prev.total - 1,
      }));
      message.success(response.data.message);
      // console.log(`Deleted user with id: ${idCategory}`);
    } catch (error) {
      console.error("Failed to delete category:", error);
      const errorMessage = error.response?.data?.message || "An error occurred";
      message.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };
  const showDeleteConfirm = (idCategory) => {
    confirm({
      title: "Are you sure you want to delete this category?",
      content: "This action cannot be undone.",
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk() {
        deleteCate(idCategory); // Gọi hàm xóa khi nhấn "Yes"
      },
      onCancel() {
        // console.log("Cancel delete");
      },
    });
  };

  const columns = [
    {
      title: "Image",
      dataIndex: "imgCate",
      render: (imgCate) =>
        imgCate ? (
          <img
            className="w-[100px] h-[100px] rounded-md min-h-[100px]"
            src={`${BASE_URL}${imgCate}`}
            alt="Category"
          />
        ) : (
          <span>No Image</span>
        ),
    },
    {
      title: "Name",
      dataIndex: "nameCategory",
    },
    {
      title: "Active",
      key: "isActiveCate",
      render: (_,record) => (
        // console.log(record),
        <Switch
          checked={record.isActiveCate}
          // onChange={(checked) => {
          //   handleSwitchChange(checked, record.idAdminUser);
          // }}
          onChange={(checked) => handleSwitchChange(record.idCategory, checked)}
          
          loading={switchLoading} // optional: hiển thị loading khi đang cập nhật
          // Disable during requests
        />
      ),
      sorter: (a, b) => Number(a.isActiveCate) - Number(b.isActiveCate),
    },  
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="small">
          <Button
            className="hover:!border-primary hover:!text-primary"
            onClick={() =>
              navigate(`/category/edit/${record.idCategory}`, { state: record })
            }
          >
            <FiEdit />
          </Button>
          <Button
            className="hover:!border-primary hover:!text-primary"
            onClick={() => showDeleteConfirm(record.idCategory)}
          >
            <PiTrashLight />
          </Button>
        </Space>
      ),
    },
   
  ];

  return (
    <>
      {loading && <Loading />}
      <h2 className="text-[24px] py-6">Category</h2>
      {error && <div style={{ color: "red", marginBottom: 16 }}>{error}</div>}
      <Table
        rowKey="idCategory"
        columns={columns}
        dataSource={categories}
        size="middle"
        pagination={pagination}
        className="!bg-white border px-5 rounded-md"
      />
    </>
  );
};

export default Categories;
