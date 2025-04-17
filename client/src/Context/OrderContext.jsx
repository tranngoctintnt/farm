import { message } from 'antd';
import React, { createContext, useContext, useState, useMemo, useCallback } from 'react';
import api from '../api';
import { useParams } from 'react-router-dom';

const OrderContext = createContext();

export function OrderProvider({ children }) {
  const [orderUser, setOrder] = useState([]);
  const [loading, setLoading] = useState(false);
  const {id} = useParams();
  // const areOrdersEqual = (prev, next) => {
  //   if (prev.length !== next.length) return false;
  //   return prev.every((order, i) => order.id === next[i].id);
  // };
  const fetchOrder = useCallback(async () => {
    setLoading(true);
    try {
      const response = await api.get("/orders");
      // setOrder((prevOrders) => {
      //   const newOrders = response.data || [];
      //   if (!areOrdersEqual(prevOrders, newOrders)) {
      //     return newOrders;
      //   }
      //   return prevOrders;
      // });
      // console.log(response.data);
      setOrder(response.data);
    } catch (err) {
      message.error(err.response?.data?.message || "Failed to load orders");
    } finally {
      setLoading(false);
    }
  }, [id]);

  const contextValue = useMemo(
    () => ({
      orderUser,
      setOrder,
      loading,
      fetchOrder,
    }),
    [orderUser, loading, fetchOrder]
  );

  return (
    <OrderContext.Provider value={contextValue}>
      {children}
    </OrderContext.Provider>
  );
}

export const useOrder = () => useContext(OrderContext);