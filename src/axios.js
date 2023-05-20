import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'http://localhost:4001'
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(alert('network error') || (error.response && error.response.data) || 'Something went wrong!')
);

export default axiosInstance;
