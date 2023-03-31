import axios from 'axios';
const BASE_URL = 'http://127.O.0.1:8000/';

export default axios.create({
    baseURL: BASE_URL
});

export const axiosPrivate = axios.create({
    baseURL: BASE_URL,
    headers: { 'Content-Type': 'application/json' },
    
});