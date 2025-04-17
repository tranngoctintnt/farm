// src/api/index.js
import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:3000/api", // Lấy từ .env hoặc fallback
  withCredentials: true, // Hỗ trợ gửi cookie (dựa trên code của bạn)
  headers: {
    "Content-Type": "application/json",
  },
});

export const submitContactForm = async (data) => {
  // Giả lập API call (thay bằng fetch thực tế)
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return { status: 'success', data };
};

export const submitEventRegistration = async (data) => {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return { status: 'success', data };
};

// // Xử lý lỗi chung (ví dụ: redirect khi nhận lỗi 401)
// api.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     if (error.response?.status === 401) {
//       // Redirect đến trang login nếu chưa đăng nhập
//       window.location.href = "/login";
//     }
//     return Promise.reject(error);
//   }
// );

export default api;