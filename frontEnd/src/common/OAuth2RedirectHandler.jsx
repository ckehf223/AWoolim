import React, { useEffect } from 'react';
import { useAuth } from '/src/common/AuthContext';
import { useNavigate } from 'react-router-dom';

const OAuth2RedirectHandler = () => {
  const { socialLogin } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const token = new URLSearchParams(window.location.search).get('token');
    const loginId = new URLSearchParams(window.location.search).get('loginid');
    if (token) {
      socialLogin(token, loginId);
      navigate(-1);
    } else {
      navigate('/login');
    }
  }, [socialLogin, navigate]);

  return <div>Loading...</div>;
};

export default OAuth2RedirectHandler;