import React, { createContext, useContext, useEffect, useState } from 'react';
import { login as loginService, logout as logoutService, adminLogout as adminLogoutService } from '/src/common/auth/authService';
import { jwtDecode } from 'jwt-decode';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loginId, setLoginId] = useState();
  const [role, setRole] = useState();

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    setIsAuthenticated(!!token);
    if (token != null) {
      const decodeToken = jwtDecode(token);
      setLoginId(decodeToken.userId)
      setRole(decodeToken.role);
    }
  }, []);


  const login = async (username, password) => {
    try {
      const reponse = await loginService(username, password);
      setIsAuthenticated(true);
      return reponse;
    } catch (error) {
      console.error('Login error:', error);
      setIsAuthenticated(false);
    }
  };

  const socialLogin = async (token, loginId) => {
    try {
      localStorage.setItem('accessToken', token);
      setLoginId(loginId);
      setIsAuthenticated(true);
    } catch (error) {
      console.error('Social login error:', error);
      setIsAuthenticated(false);
    }
  };

  const logout = async () => {
    try {
      await logoutService();
      setIsAuthenticated(false);
      setLoginId('');
      setRole('');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const adminLogout = async () => {
    try {
      await adminLogoutService();
      setIsAuthenticated(false);
      setLoginId('');
      setRole('');
    } catch (error) {
      console.error('Logout error:', error);
    }
  }
  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, adminLogout, socialLogin, loginId, role }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};