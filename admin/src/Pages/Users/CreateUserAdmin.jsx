import React, { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import FormAdmin from "../../Components/FormAdmin";
import axios from "axios";
import Loading from "../../Components/Loading";
import { message } from "antd";
import api from "../../api";

message.config({
  top: 10, // Cách đỉnh màn hình 10px
  right: 10,
  duration: 2, // Hiển thị trong 2 giây
  maxCount: 1, // Chỉ hiển thị 1 thông báo cùng lúc
});
const CreateUserAdmin = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [submitError, setSubmitError] = useState(null);

  const handleSubmit = useCallback(
    async (values, avatarFile, avatarPreview) => {
      // console.log("handleSubmit triggered with:", {
      //   values,
      //   avatarFile,
      //   avatarPreview,
      // });
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
        formData.append("password", values.passwordHash); // Required for create
        if (avatarFile) formData.append("Avatar", avatarFile);
        formData.append(
          "avatarPreview",
          avatarPreview === null ? "/user.jpg" : avatarPreview
        );

        const response = await api.post(
          "/admin/create-user",
          formData,
          {
            withCredentials: true,
            headers: { "Content-Type": "multipart/form-data" },
          }
        );
        // console.log("Create response:", response.data);
        setLoading(false);
        setTimeout(() => {
          message.success("Tạo user thành công");
        }, 1000);

        navigate("/account-admin/account-admin-list");
      } catch (error) {
        const err = error.response?.data?.message;
        setTimeout(() => {
          message.error(err);
        }, 1000);
        console.error("Failed to create admin user:", error);
        // setSubmitError(
        //   error.response?.data?.message || "Failed to create user. Please try again."
        // );
        setLoading(false);
      }
    },
    [navigate]
  );

  // console.log("CreateUserAdmin render");

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          <h2 className="text-[22px] p-5 ml-3">Create New Admin User</h2>
          {submitError && <p className="text-red-500">{submitError}</p>}
          <FormAdmin mode="create" onSubmit={handleSubmit} loading={loading} />
        </>
      )}
    </>
  );
};

export default CreateUserAdmin;
