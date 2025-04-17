import React, { createContext, useContext, useState, useCallback } from 'react';
import api from '../api';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState({ cartItems: [],tongTien:0, tongSP: 0 });

  const fetchCart = useCallback(async () => {
    try {
      const response = await api.get('/cart');
      setCart(response.data);
    } catch (error) {
      console.error('Error fetching cart:', error);
    }
  }, []);

  const clearCart = useCallback(() => {
    setCart({ cartItems: [],tongTien:0, tongSP: 0 }); // Đặt lại giỏ hàng về trạng thái mặc định
  }, []);

  const contextValue = {
    cart,
    fetchCart,
    clearCart,
  };

  return (
    <CartContext.Provider value={contextValue}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);