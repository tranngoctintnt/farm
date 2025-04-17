import React, { useEffect, useState } from "react";
import axios from "axios";
import LoadingComponent from "../../components/Loading";

const ProtectedPage = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/protected");
        setData(response.data);
      } catch (err) {
        setError(err.response?.data?.error || "Lỗi tải dữ liệu");
      }
    };

    fetchData();
  }, []);

  if (error) return <div>{error}</div>;

  return <div>{data ? JSON.stringify(data) : <LoadingComponent/>}</div>;
};

export default ProtectedPage;
