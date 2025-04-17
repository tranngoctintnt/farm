import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuthUser } from '../Context/AuthContextUser';
import LoadingComponent from '../components/Loading';

const ProtectedRoute = ({ children, redirectTo="/", restrictIfAuthenticated  = false }) => {
  // const { user, isLoadingUser } = useContext(MyContext);
  // const { isAuthenticated } = useAuthUser();
  // if (restrictIfAuthenticated && isAuthenticated) {
  //   return <Navigate to={redirectTo} />;
  // }
  // if (!user) {
  //   // Nếu chưa login → redirect và lưu lại đường dẫn
  //   return <Navigate to="/login" state={{ from: location }} replace />;
  // }

  const { isAuthenticated, isLoading } = useAuthUser(); // cần có isLoading từ context
  const location = useLocation();

  // Chờ xác thực xong (tránh flash redirect khi reload)
  if (isLoading) return <div><LoadingComponent/></div>;

  // Nếu là trang cấm người đã đăng nhập (ví dụ: login, register)
  if (restrictIfAuthenticated && isAuthenticated) {
    return <Navigate to={redirectTo} replace />;
  }

  // Nếu là trang bảo vệ mà user chưa đăng nhập
  if (!restrictIfAuthenticated && !isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }


  return children;
};

export default ProtectedRoute;