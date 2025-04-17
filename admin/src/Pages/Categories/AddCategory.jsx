import React, { useCallback, useState } from 'react';
import CategoryForm from '../../Components/CategoryForm';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import { message } from "antd";
import api from '../../api';

message.config({
    top: 10, // Cách đỉnh màn hình 10px
    right: 10,
    duration: 2, // Hiển thị trong 2 giây
    maxCount: 1, // Chỉ hiển thị 1 thông báo cùng lúc
  });
const AddCategory = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [submitError, setSubmitError] = useState(null);
  
    const handleSubmit = useCallback(
      async (values, imgCateFile, imgCatePreview) => {
        // console.log("handleSubmit triggered with:", {
        //   values,
        //   imgCateFile,
        //   imgCatePreview,
        // });
        setLoading(true);
        setSubmitError(null);
  
        try {
          const formData = new FormData();
          formData.append("nameCategory", values.nameCategory);
          if (imgCateFile) formData.append("imgCate", imgCateFile);
          formData.append(
            "catePreview",
            imgCatePreview === null ? "null" : imgCatePreview
          );
  
          const response = await api.post(
            "/category/create",
            formData,
            {
              withCredentials: true,
              headers: { "Content-Type": "multipart/form-data" },
            }
          );
          console.log("Create response:", response.data); 
          setLoading(false);
          setTimeout(() => {
            message.success("Tạo category thành công");
          }, 1000);
          setTimeout(() => {
          navigate("/categories/list");
          },500);
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
  

  return (
    <>
      <h2 className='py-5 px-6 mb-4'>Create New Category</h2>
      {submitError && <p className="text-red-500">{submitError}</p>}
      <CategoryForm
        onSubmit={handleSubmit}
        loading={loading}
        mode="create"
      />
    </>
  );
};

export default AddCategory;