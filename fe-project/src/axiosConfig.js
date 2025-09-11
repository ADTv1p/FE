import axios from 'axios';

// Tạo một instance của axios
const axios = axios.create({
    baseURL: 'https://localhost:3001//api',
    timeout: 10000, // Thời gian chờ request (ms)
    headers: {
        'Content-Type': 'application/json',
    },
});

// Thêm interceptor để xử lý request và response
axios.interceptors.request.use(
    (config) => {
        // Thêm token vào header nếu cần
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

axios.interceptors.response.use(
    (response) => {
        return response.data;
    },
    (error) => {
        console.error('API Error:', error);
        return Promise.reject(error);
    }
);

export default axios;