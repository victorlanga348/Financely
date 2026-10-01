import axios from 'axios';
import type { Transaction } from '../types';

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3333'
});

api.interceptors.request.use(config => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export const getTransactions = async (): Promise<Transaction[]> => {
    const response = await api.get('/transition/list');
    return response.data;
};

export default api;