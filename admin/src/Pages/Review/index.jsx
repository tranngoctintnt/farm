import React from 'react'
import api from '../../api';
import { useEffect } from 'react';
import { useState } from 'react';
import {  Table,Space, message,Switch } from "antd";
import Loading from '../../Components/Loading';
import BASE_URL from '../../config';

const ReviewList = () => {
    const [review, setReviews] = useState([]);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [switchLoading, setSwitchLoading] = useState(false); // Local loading state
    const [pagination, setPagination] = useState({
      current: 1,
      pageSize: 10,
      total: 0,
    });
    useEffect(() => {
      loadReviews();
    }, []);
  
  
    const handleSwitchChange = async (idReview,checked) => {
      // console.log(idCategory,checked);
      setSwitchLoading(true);
      try {
        const response = await api.put(
          `/reviews/update-status/${idReview}`,
          { isActive: checked },
          { withCredentials: true }
        );
        setLoading(true);
        setReviews((prevData) =>
          prevData.map((review) =>
            review.idReview === idReview
              ? { ...review, isActive: checked } // Update the isActive status
              : review
          )
        );
        // console.log("Status updated:", response.data);
        message.success("Customer Review status updated successfully");
      } catch (error) {
        console.error("Failed to update status:", error);
        message.error("Failed to update status");
      } finally {
        setSwitchLoading(false);
      }
  
     
    };
  
    const loadReviews = async () => {
      try {
        const response = await api.get("/reviews/reviews-all");
        setReviews(response.data);
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
    
    const columns = [
        {
          title: "Customer Review",
          key: "reviewText",
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
                  <h3 className="font-[500] text-[16px] hover:text-primary">
                   {record.fullName}
                  </h3>
                  <h4>
                    {record.reviewText}
                  </h4>
                </div>
              </div>
            </Space>
          ),
        },
        {
          title: "Rating",
          key: "rating",
          width: 200,
          dataIndex: "rating", 
            render: (rating) => {
                const stars = Array.from({ length: 5 }, (_, index) => (
                <span key={index} className={index < rating ? "text-yellow-500" : "text-gray-300"}>★</span>
                ));
                return <div className="flex">{stars}</div>;
            },
            sorter: (a, b) => a.rating - b.rating,
        },
        {
            title: "Product",
            key: "product",
            width: 350,
            render: (_, record) => {
                // console.log(record.imgProduct);
                const img = JSON.parse(record.imgProduct);
                
                return (
              <Space size="small">
                <div className="flex items-center gap-5">
                  <div className="img w-[65px] flex min-w-[65px] p-2 h-[65px] overflow-hidden group">
                      <img
                        src={`${BASE_URL}${img[0]}`}
                        className="w-full h-full rounded-md group-hover:scale-105 transition-all"
                        alt={record.nameProdcut}
                      />
                     
                  </div>
      
                  <div className="info flex flex-col">
                    
                  <h3 className="font-[500] text-[16px] hover:text-primary">
                     {record.nameProdcut}
                    </h3>
                  </div>
                </div>
              </Space>
            )},
          },

          {
            title: "Created At",
            key: "createdAt",
            dataIndex: "createdAt",
            render: (createdAt) => {
              const date = new Date(createdAt);
              return <span>{date.toLocaleDateString("en-US")}</span>;
            },
            sorter: (a, b) => new Date(a.createdAt) - new Date(b.createdAt),
          },
        {
          title: "Active",
          key: "isActive",
          render: (_,record) => (
            // console.log(record),
            <Switch
              checked={record.isActive}
              // onChange={(checked) => {
              //   handleSwitchChange(checked, record.idAdminUser);
              // }}
              onChange={(checked) => handleSwitchChange(record.idReview, checked)}
              
              loading={switchLoading} // optional: hiển thị loading khi đang cập nhật
              // Disable during requests
            />
          ),
          sorter: (a, b) => Number(a.isActive) - Number(b.isActive),
        },  
        
      ];
     
    
  return (
    <>
      <h2 className="text-[24px] py-6">Review</h2>
      {error && <div style={{ color: "red", marginBottom: 16 }}>{error}</div>}
      <Table
        rowKey="idReview"
        columns={columns}
        dataSource={review}
        size="middle"
        pagination={pagination}
        className="!bg-white border px-5 rounded-md"
      />
    </>
  )
}

export default ReviewList