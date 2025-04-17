import axios from "axios";
import { useEffect } from "react";

import { useNavigate } from 'react-router-dom';

const useAxiosInterceptor = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const interceptor = axios.interceptors.response.use(
      (response) => response,
      (error) => {
        if (
          error.response?.status === 401 &&
          !['/auth/checkuser', '/cart/', '/addresses/','/orders/', '/productuser', '/user/logout'].includes(error.config.url)
        ) {
          navigate('/login');
        }
        return Promise.reject(error);
      }
    );
    return () => axios.interceptors.response.eject(interceptor);
  }, [navigate]);
};

export default useAxiosInterceptor;
