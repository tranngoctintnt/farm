import React, { createContext, useContext, useState, useMemo, useCallback } from 'react';
import api from '../api';

const ReviewContext = createContext();

export const ReviewProvider = ({ children }) => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(false);
  const areReviewsEqual = (prev, next) => {
    if (prev.length !== next.length) return false;
    return prev.every((review, i) => review.id === next[i].id);
  };
  const fetchReviews = useCallback(async () => {
    setLoading(true);
    try {
      
      const response = await api.get("/reviews");
      setReviews((prevReviews) => {
        const newReviews = response.data.data || [];
        if (!areReviewsEqual(prevReviews, newReviews)) {
          return newReviews;
        }
        return prevReviews;
      });
    } catch (error) {
      console.error("Error fetching reviews:", error);
      setReviews([]);
    } finally {
      setLoading(false);
    }
  }, []);

  const contextValue = useMemo(
    () => ({
      reviews,
      loading,
      setReviews,
      fetchReviews,
    }),
    [reviews, loading, fetchReviews]
  );

  return (
    <ReviewContext.Provider value={contextValue}>
      {children}
    </ReviewContext.Provider>
  );
};

export const useReviews = () => useContext(ReviewContext);