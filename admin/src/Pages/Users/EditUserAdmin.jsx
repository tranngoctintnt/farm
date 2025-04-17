import React, { useCallback, useEffect, useState } from 'react'
import FormAdmin from '../../Components/FormAdmin'
import { useNavigate, useParams } from 'react-router-dom';
import Cookies from "js-cookie";
import Loading from '../../Components/Loading';
import { Modal,message } from "antd";
import api from '../../api';

// Cấu hình message (tùy chọn)
message.config({
  top: 10, // Cách đỉnh màn hình 10px
  right:10,
  duration: 2, // Hiển thị trong 2 giây
  maxCount: 1, // Chỉ hiển thị 1 thông báo cùng lúc
});
const EditUserAdmin = () => {
    const { id } = useParams(); // Get the ID from the URL
  const navigate = useNavigate();
  const [initialData, setInitialData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formDataToSave, setFormDataToSave] = useState(null);
  // console.log("Component render lại!");

  useEffect(() => {
    const fetchAdminUser = async () => {
      setLoading(true);
      try {
        const response = await api.get(
          `/admin-users/${id}`,
          { withCredentials: true }
        );
        // const { passwordHash, ...rest } = response.data;
        // setInitialData(rest);
        // console.log("Fetched initialData:", response.data);
        setInitialData(response.data);
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

    fetchAdminUser();
  }, [id]);

  const showConfirmModal = useCallback(() => {
    setIsModalOpen(true); // Hiển thị modal khi nhấn Save
  },[]);

  const handleOk = useCallback(async () => {
    if (!formDataToSave) {
      console.error("No form data to save");
      setIsModalOpen(false);
      return;
    }

    const { values, avatarFile, avatarPreview } = formDataToSave;
    setIsModalOpen(false); // Đóng modal
    setLoading(true);
    setSubmitError(null);

    try {
      const formData = new FormData();
      formData.append("username", values.username);
      formData.append("fullName", values.fullName);
      formData.append("email", values.email);
      formData.append("role", values.role);
      formData.append("phone", values.phone || "");
      formData.append("isActive", values.isActive);
      if (values.password) formData.append("password", values.password);
      if (avatarFile) formData.append("Avatar", avatarFile);
      formData.append("avatarPreview", avatarPreview === null ? "null" : avatarPreview);
      // console.log(formData);
      const response = await api.put(
        `/admin-users/${id}`,
        formData,
        {
          withCredentials: true,
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      // console.log("Update response:", response.data);
      setInitialData((prev) => ({
        ...prev,
        ...values,
        Avatar: avatarPreview === "null" ? "/user.jpg" : avatarPreview,
      }));
      setLoading(false);
      message.success("Edit thành công");
      navigate("/account-admin/account-admin-list"); 
    } catch (error) {
      console.error("Failed to update admin user:", error);
      setSubmitError(
        error.response?.data?.message || "Failed to update user. Please try again."
      );
      setLoading(false);
    }
  },[formDataToSave, navigate, id]);

  const handleCancel = useCallback(() => {
    setIsModalOpen(false); // Đóng modal
    navigate("/account-admin/account-admin-list"); // Chuyển hướng về danh sách khi nhấn No
  },[navigate]);

  const handleSubmit = useCallback((values, avatarFile, avatarPreview) => {
    // console.log("handleSubmit triggered with:", { values, avatarFile, avatarPreview });
    setFormDataToSave({ values, avatarFile, avatarPreview }); // Lưu dữ liệu vào state
    showConfirmModal();
  },[showConfirmModal]);

  // console.log("EditUserAdmin render", { initialData }); // Debug parent renders
  
  return (
    <>
    <h2 className='text-[22px] mb-6'>Edit User Admin</h2>
    {/* {loading ? (<Loading/>) : 
    
    (

      <> */}
      {submitError && <p className="text-red-500">{submitError}</p>}
      {!loading && initialData && (
        <FormAdmin initialData={initialData} onSubmit={handleSubmit} loading={loading} mode="edit"/>
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
    // )
    // }
      
    // </>
  )
}

export default EditUserAdmin