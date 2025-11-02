import axios from 'axios';

const authAxios = axios.create({ baseURL: '/api/proxy' });

authAxios.interceptors.request.use(config => {
  const token = sessionStorage.getItem('authToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

const publicAxios = axios.create({ baseURL: '/api/proxy' });

export { authAxios, publicAxios };
