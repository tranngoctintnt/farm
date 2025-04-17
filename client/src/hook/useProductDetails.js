import { useState, useEffect, useCallback } from 'react';
import api from '../api';

const useProductDetails = (id) => {
  const [state, setState] = useState({
    product: {},
    reviews: [],
    loading: false,
    error: '',
    hasFetched: false,
  });

  const fetchData = useCallback(async () => {
    if (!id || state.hasFetched) {
      console.log('Skipping fetch, already fetched or invalid id');
      return;
    }
    console.log('Fetching data for id:', id);
    setState((prev) => ({ ...prev, loading: true }));
    try {
      const [productResponse, reviewsResponse] = await Promise.all([
        api.get(`/product/${id}`),
        api.get(`/reviews/${id}`),
      ]);
      console.log('Product response:', productResponse.data);
      setState({
        product: productResponse.data || {},
        reviews: reviewsResponse.data || [],
        loading: false,
        error: '',
        hasFetched: true,
      });
    } catch (err) {
      setState((prev) => ({
        ...prev,
        loading: false,
        error: 'Failed to fetch data',
        hasFetched: true,
      }));
    }
  }, [id, state.hasFetched]);
  useEffect(() => {
    if (id) {
      fetchData();
    }
  }, [id, fetchData]);

  const fetchReviews = useCallback(async () => {
    try {
      const response = await api.get(`/reviews/${id}`);
      setState((prev) => ({
        ...prev,
        reviews: response.data || [],
        error: '',
      }));
    } catch (err) {
      setState((prev) => ({ ...prev, error: 'Failed to fetch reviews' }));
    }
  }, [id]);
  return {
    product: state.product,
    reviews: state.reviews,
    loading: state.loading,
    error: state.error,
    fetchReviews,
  };
};

export default useProductDetails;