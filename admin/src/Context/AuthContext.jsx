// src/context/AuthContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../api';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // Initial loading state
//   const logout = () => {
//     setUser(null);
// };
  useEffect(() => {
    // Check authentication status on mount
    const checkAuth = async () => {
      try {
        const response = await api.get('/authadmin/check-admin');
        // console.log('Auth check response:', response.data);
        setUser(response.data.user);
        // if (response.data.user) {
        //   setUser(response.data.user);
        // }else {
        //     setUser(null);
        //   }
      } catch (err) {
        // console.log('Not authenticated:', err.response?.data?.message);
        // setUser(null);
        console.error('Auth check failed:', {
            status: err.response?.status,
            data: err.response?.data,
            message: err.message,
          });
          setUser(null);
      } 
      finally {
        setLoading(false);
        // console.log('Auth check complete, user:', user);
      }
    };
    checkAuth();
  }, []);

  const logout = () => {
    setUser(null);
};



  return (
    <AuthContext.Provider value={{ user, setUser,logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);