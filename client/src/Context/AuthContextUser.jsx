import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useMemo,
  useRef,
} from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";
import { message } from "antd";
import { useCart } from '../Context/CartContext'; // Import CartContext

const AuthContextUser = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState({});
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [authError, setAuthError] = useState(null);
  const { clearCart } = useCart(); // Destructure clearCart from CartContext
  const [accessToken, setAccessToken] = useState(null);
  const intervalRef = useRef(null); // Lưu ID của setInterval

  const checkTokenExpiration = useCallback(() => {
    if (!accessToken) {
      logout();
      return;
    }
    // console.log(accessToken);
    try {
      const payload = JSON.parse(atob(accessToken.split(".")[1]));
      const expiry = payload.exp * 1000; // Chuyển sang mili giây
      const now = Date.now();

      if (now >= expiry) {
        // console.log("Access token expired, logging out");
        logout();
        message.error("Phiên đăng nhập hết hạn!!!")
      }
    } catch (error) {
      console.error("Error parsing token:", error);
      logout();
    }
  }, [accessToken]);

  const logout = useCallback(() => {
    setUser(null);
    setAccessToken(null);
    setIsAuthenticated(false);
    
    // Xóa cookie (tùy chọn, vì httpOnly)
    document.cookie =
      "access_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    clearCart();
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
      // console.log('Interval cleared on logout');
    }
    // navigate("/"); // Chuyển hướng về trang chủ
  }, [clearCart]);

  // Kiểm tra auth
  //  useEffect(() => {
  //   const checkAuth = async () => {
  //     try {
  //       const response = await api.get('/auth/checkuser', { withCredentials: true });
  //       console.log('Auth response:', response.data.accessToken);
  //       setUser(response.data.user);
  //       setIsAuthenticated(!!response.data.user);
  //     } catch (err) {
  //       setUser(null);
  //       setIsAuthenticated(false);
  //       setAuthError(err.message);
  //       console.error('Auth check failed:', {
  //         status: err.response?.status,
  //         data: err.response?.data,
  //         message: err.message,
  //       });
  //       if (err.response?.status === 401) {
  //         console.log('Token invalid, logging out');
  //         logout();
  //       }
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   checkAuth();
  //   checkTokenExpiration();

  //   // Kiểm tra định kỳ
  //   const interval = setInterval(() => {
  //     checkAuth();
  //     checkTokenExpiration();
  //   }, 60000);

  //   return () => clearInterval(interval);
  // }, [logout, checkTokenExpiration]);

  // Hàm đăng nhập để lưu accessToken
  const login = useCallback(async (credentials) => {
    try {
      const response = await api.post("/user/login", credentials, {
        withCredentials: true,
      });
      setUser(response.data.user); 
      setLoading(true);
      message.success("Đăng nhập thành công!");
      setAccessToken(response.data.accessToken); // Lưu accessToken từ response
      setIsAuthenticated(true);
    } catch (err) {
      setAuthError(err.message);
      message.error(err.response.data.message)
      console.error("Login failed:", err.response?.data);
    }
  }, []);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await api.get("/auth/checkuser");
        // console.log("Auth response:", response.data);
        setLoading(true);
        setUser(response.data.user);
        setIsAuthenticated(!!response.data.user);
      } catch (err) {
        setUser(null);
        setIsAuthenticated(false);
        setAuthError(err.message);
        console.error("Auth check failed:", {
          status: err.response?.status,
          data: err.response?.data,
          message: err.message,
        });
      } finally {
        setLoading(false);
      }
    };
    checkAuth();
    checkTokenExpiration();

    intervalRef.current = setInterval(() => {
      checkAuth();
      checkTokenExpiration();
    }, 30000);

    // Cleanup khi component unmount
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
        // console.log('Interval cleared on unmount');
      }
    };
  }, [checkTokenExpiration]);

  // const logout = useCallback(() => {
  //   setUser(null);
  //   // setLoading(true);
  //   // clearCart();
  //   setIsAuthenticated(false);
  //   navigate('/login');
  // }, [navigate]);

  // Memoize giá trị của Context
  // const contextValue = useMemo(
  //   () => ({
  //     user,
  //     setUser,
  //     logout,
  //     loading,
  //     isAuthenticated,
  //   }),
  //   [user, loading, isAuthenticated, logout]
  // );

  const contextValue = useMemo(
    () => ({
      user,
      setUser,
      accessToken,
      login,
      logout,
      loading,
      isAuthenticated,
      authError,
    }),
    [user, accessToken, login, logout, loading, isAuthenticated, authError]
  );

  return (
    <AuthContextUser.Provider value={contextValue}>
      {children}
    </AuthContextUser.Provider>
  );
}

export const useAuthUser = () => useContext(AuthContextUser);
