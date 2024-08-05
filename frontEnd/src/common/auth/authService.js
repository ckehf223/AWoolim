import instance from "/src/common/auth/axios";

export const login = async (username, password) => {
  try {
    const response = await instance.post('/login', { username, password });

    if (!response.headers['authorization']) {
      throw new Error('Authorization header is missing in the response');
    }

    const accessToken = response.headers['authorization'];

    const refreshToken = response.data.refresh;

    localStorage.setItem('accessToken', accessToken);
    document.cookie = `refresh=${refreshToken}; path=/;`;

    return response;
  } catch (error) {
    console.error('Login failed', error);
    throw error;
  }
};

export const logout = async () => {
  try {
    await instance.post('/logout', {}, {
      withCredentials: true 
    });
    localStorage.removeItem('accessToken');
    document.cookie = 'refresh=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/;';
  } catch (error) {
    console.log('Logout failed', error);
  }
};