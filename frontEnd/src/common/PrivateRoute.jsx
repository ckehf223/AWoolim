import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '/src/common/AuthContext';

const PrivateRoute = ({ element }) => {
  const { isAuthenticated, role } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace />;
  }
  if (!role) {
    return <Navigate to="/admin/login" replace />;
  }
  if (role === 'ROLE_MEMBER') {
    return <Navigate to="/" replace />;
  }
  if (role === 'ROLE_ADMIN') {
    return element || <Outlet />;
  }
};

export default PrivateRoute;