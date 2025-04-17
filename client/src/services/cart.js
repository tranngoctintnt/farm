import axios from "axios";

// Cấu hình base URL của back-end
const API = axios.create({
  baseURL: "https://localhost:3000/api", // Thay đổi nếu back-end chạy trên port khác
  withCredentials: true, // Gửi cookie trong các yêu cầu
});

// console.log('api', API);

// API cho giỏ hàng
export const addToCart = async (idProduct, quantity) => {
  return API.post("/cart/add", { idProduct, quantity });
};
export const viewCart = () => API.get("/cart/view");

export const updateCartItem = (idProduct, quantity) =>
  API.put("/cart/update", { idProduct, quantity });

export const removeCartItem = (idProduct) =>
  API.delete("/cart/remove", { data: { idProduct } });

// API cho đơn hàng
export const createOrder = (idAddress, paymentMethod) =>
  API.post("/order/create", { idAddress, paymentMethod });

export const getOrderHistory = () => API.get("/order/history");
