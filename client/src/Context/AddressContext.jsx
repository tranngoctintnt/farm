// import { message } from 'antd';
//  axios from 'axios';
// import React, { createContext, useEffect, useState } from 'react'
// import api from '../api';
// const AddressContext = createContext();

// const AddressProvider = () => {
//       const [addresses, setAddresses] = useState([]);
//       const [selectedAddressId, setSelectedAddressId] = useState(null);
//       const [loading, setLoading] = useState(true);
    
//      // Lấy danh sách địa chỉ
//   useEffect(() => {
//     const fetchAddresses = async () => {
//       try {
//         const response = await api.get(
//           `/addresses/${idCustomer}`,
//           { withCredentials: true }
//         );
//         // console.log(response.data);
//         setAddresses(response.data);
//         if (response.data.length > 0) {
//           setSelectedAddressId(response.data[0].idAddress); // Chọn địa chỉ đầu tiên mặc định
//         }
//       } catch (error) {
//         message.error(
//           error.response?.data?.error || "Không thể tải danh sách địa chỉ"
//         );
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchAddresses();
//   }, [idCustomer]);
//   return (
//     <div>AddressProvider</div>
//   )
// }

// export default AddressProvider