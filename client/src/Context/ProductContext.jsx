import React, { createContext, useContext, useState, useMemo, useCallback } from 'react';
import api from '../api';

const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasFetched, setHasFetched] = useState(false);

  const areProductsEqual = (prev, next) => {
    if (prev.length !== next.length) return false;
    return prev.every((p, i) => {
      const n = next[i];
      return p.id === n.id && p.name === n.name && p.price === n.price;
    });
  };

  const fetchProducts = useCallback(async () => {
    if (hasFetched) return;
    setLoading(true);
    try {
      const response = await api.get('/productuser');
      setProducts((prevProducts) => {
        const newProducts = response.data.data || [];
        if (!areProductsEqual(prevProducts, newProducts)) return newProducts;
        return prevProducts;
      });
    } catch (error) {
      console.error('Error fetching products:', error);
      setProducts([]);
    } finally {
      setHasFetched(true);
      setLoading(false);
    }
  }, [hasFetched]);

  const resetProducts = useCallback(() => {
    setProducts([]);
    setHasFetched(false); // Cho phép fetch lại nếu cần
  }, []);

  const contextValue = useMemo(
    () => ({
      products,
      loading,
      setProducts,
      fetchProducts,
      hasFetched,
      resetProducts,
    }),
    [products, loading, fetchProducts, hasFetched, resetProducts]
  );

  return (
    <ProductContext.Provider value={contextValue}>
      {children}
    </ProductContext.Provider>
  );
};

export const useProduct = () => useContext(ProductContext); 