import axios from 'axios';

// Create an Axios instance
const instance = axios.create({
  baseURL: 'http://localhost:8080',
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add a request interceptor to include the access token
instance.interceptors.request.use(
  config => {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
      config.headers['Authorization'] = `${accessToken}`;
    }
    const refreshToken = getCookie('refresh');
    if(refreshToken){
      config.headers['']
    }
    return config;
  },
  error => Promise.reject(error)
);

// Add a response interceptor to handle token refresh
instance.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config;
    console.log("refreshTokenError"+error);
    console.log("refreshTokenError"+ error.response.status);
    if (error.response.status === 401 || error.response.status == 403) {
      originalRequest._retry = true;

      // Get refresh token from cookies
      console.log(error.response.status);
      const refreshToken = getCookie('refresh');
      console.log(refreshToken);
      if (refreshToken) {
        try {
          console.log("refreshToken Enter");
          // Request a new access token using the refresh token
          const response = await axios.post('http://localhost:8080/refresh', {}, {
            headers: {
              'Authorization': `Bearer ${refreshToken}`,
              'Content-Type': 'application/json'
            },
          });
          // Save new access token to local storage
          const newAccessToken = response.headers['authorization'];
          localStorage.setItem('accessToken', newAccessToken);
          console.log("newAccessToken"+newAccessToken);

          // Retry the original request with the new access token
          instance.defaults.headers['Authorization'] = `${newAccessToken}`;
          console.log(originalRequest);
          return instance(originalRequest);
        } catch (refreshError) {
          console.error('Failed to refresh token', refreshError);
          // Handle token refresh failure (e.g., redirect to login page)
        }
      }
    }

    return Promise.reject(error);
  }
);

function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
}

export default instance;