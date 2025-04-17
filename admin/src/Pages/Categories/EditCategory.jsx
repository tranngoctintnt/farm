import React, { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Modal, message } from "antd";
import axios from "axios";
import Cookies from "js-cookie";
import CategoryForm from "../../Components/CategoryForm";
import api from "../../api";

message.config({
  top: 10, // Cách đỉnh màn hình 10px
  right: 10,
  duration: 2, // Hiển thị trong 2 giây
  maxCount: 1, // Chỉ hiển thị 1 thông báo cùng lúc
});
const EditCategory = () => {
  const { id } = useParams(); // Get the ID from the URL
  // console.log(id);
  const navigate = useNavigate();
  const [initialDataCate, setInitialDataCate] = useState(null);
  const [loading, setLoading] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formDataToSave, setFormDataToSave] = useState(null);

  // console.log('data edit',formDataToSave)
  useEffect(() => {
    const fetchCategory = async () => {
      setLoading(true);
      try {
        const response = await api.get(
          `/category/${id}`,
          { withCredentials: true }
        );
        // const { passwordHash, ...rest } = response.data;
        // setInitialData(rest);
        // console.log("Fetched initialData:", response.data);
        setInitialDataCate(response.data);
      } catch (error) {
        console.error("Failed to fetch admin user:", error);
        if (error.response?.status === 401 || error.response?.status === 403) {
          Cookies.remove("access_token");
          window.location.href = "/auth/login-admin";
        }
      } finally {
        setLoading(false);
      }
    };

    fetchCategory();
  }, [id]);

  const showConfirmModal = useCallback(() => {
    setIsModalOpen(true); // Hiển thị modal khi nhấn Save
  }, []);

  const handleOk = useCallback(async () => {
    if (!formDataToSave) {
      console.error("No form data to save");
      setIsModalOpen(false);
      return;
    }

    const { values, imgCateFile, imgCatePreview } = formDataToSave;
    // console.log(values,imgCateFile,imgCatePreview);

    setIsModalOpen(false); // Đóng modal
    setLoading(true);
    setSubmitError(null);
    // console.log("imgCatePreview", imgCatePreview);
    // console.log("imgCateFile", imgCateFile);

    try {
      const formData = new FormData();
      // console.log('name cate', values.nameCategory);
      formData.append("nameCategory", values.nameCategory);

      // console.log('img file',imgCateFile);
      if (imgCateFile) formData.append("imgCate", imgCateFile);
      formData.append(
        "imgCatePreview",
        imgCatePreview === null ? "null" : imgCatePreview
      );

      // console.log(formData.get("nameCategory"));
      // console.log(formData.get("imgCate"));


      const response = await api.put(
        `/category/${id}`,
        formData,
        {
          withCredentials: true,
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      // console.log("Update response:", response.data);
      setInitialDataCate((prev) => ({
        ...prev,
        ...values,
        imgCate: imgCatePreview,
      }));
      setLoading(false);
      message.success("Edit thành công");
      navigate("/categories/list");
    } catch (error) {
      console.error("Failed to update admin user:", error);
      setSubmitError(
        error.response?.data?.message ||
          "Failed to update user. Please try again."
      );
      setLoading(false);
    }
  }, [formDataToSave, navigate, id]);

  const handleCancel = useCallback(() => {
    setIsModalOpen(false); // Đóng modal
    navigate("/account-admin/account-admin-list"); // Chuyển hướng về danh sách khi nhấn No
  }, [navigate]);

  const handleSubmit = useCallback(
    (values, imgCateFile, imgCatePreview) => {
      // console.log("handleSubmit triggered with:", {
      //   values,
      //   imgCateFile,
      //   imgCatePreview,
      // });
      setFormDataToSave({ values, imgCateFile, imgCatePreview }); // Lưu dữ liệu vào state
      showConfirmModal();
    },
    [showConfirmModal]
  );
  // console.log("data1", initialDataCate);
 
  return (
    <>
      <h2 className="py-5 px-6 mb-4">Edit Category</h2>
      {submitError && <p className="text-red-500">{submitError}</p>}

      {/* <CategoryForm
      initialData={initialDataCate}
        onSubmit={handleSubmit} loading={loading} mode="edit"
      /> */}

{!loading && initialDataCate && (
        <CategoryForm initialData={initialDataCate} onSubmit={handleSubmit} loading={loading} mode="edit"/>
      )}
      <Modal
        title="Xác nhận sửa đổi"
        open={isModalOpen}
        onOk={handleOk} // Chỉ gọi handleOk, không truyền tham số trực tiếp
        onCancel={handleCancel}
        okText="Yes"
        cancelText="No"
      >
        <p>Bạn có muốn sửa đổi thông tin này không?</p>
      </Modal>
    </>
  );
};

export default EditCategory;
