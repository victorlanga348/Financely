import axios from 'axios';
import type { Transaction } from '../types';

const api = axios.create({
    baseURL: 'http://localhost:3000'
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