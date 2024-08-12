import axios from 'axios';
import { getAccessToken, setAccessToken, removeAccessToken, clearRefreshToken } from '/src/common/auth/Auth';

const instance = axios.create({
  baseURL: 'http://localhost:8080',
  withCredentials: true,
});

instance.interceptors.request.use(
  async config => {
    const accessToken = getAccessToken();
    if (accessToken) {
      config.headers.Authorization = `${accessToken}`;
    } 
    return config;
  },
  error => Promise.reject(error)
);

instance.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config;
    if ((error.response.status === 401 || error.response.status === 403) && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const response = await axios.post('http://localhost:8080/refresh', {}, { withCredentials: true });
        if (response.status === 200) {
          const newAccessToken = response.headers['authorization'];
          setAccessToken(newAccessToken);
          instance.defaults.headers.Authorization = `${newAccessToken}`;
          originalRequest.headers.Authorization = `${newAccessToken}`;
          return instance(originalRequest);
        }
      } catch (refreshError) {
        await axios.post('http://localhost:8080/deleteRefresh', {}, { withCredentials: true });
        removeAccessToken();
        clearRefreshToken();
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

export default instance;