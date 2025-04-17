// hooks/useFetchData.js
import { useState, useEffect } from "react";
import axios from "axios";
import { message } from "antd";
import api from "../api";

const useFetchDataCate = () => {
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState("");

  const loadCategories = async () => {
    try {
      const response = await api.get("/category");
      setCategories(response.data.data || []);
      setError("");
    } catch (err) {
      const errorMsg = err.response?.data?.message || "Error loading categories";
      message.error(errorMsg);
      setError(errorMsg);
    }
  };

  useEffect(() => {
    loadCategories();
  }, []);

  return { categories, error, loadCategories };
};

export default useFetchDataCate;