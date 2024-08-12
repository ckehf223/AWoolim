import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '/src/common/AuthContext';
import { removeAccessToken, clearRefreshToken } from '/src/common/auth/Auth';

const PrivateRoute = ({ element }) => {
  const { isAuthenticated, role } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace />;
  }
  if (role !== 'ROLE_ADMIN') {
    // removeAccessToken();
    // clearRefreshToken();
    console.log("role accept")
    // return <Navigate to="/admin/login" replace />;
  }

  console.log("Authenticated, rendering component");
  return element || <Outlet />;
};

export default PrivateRoute;