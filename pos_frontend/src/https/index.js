import axios from 'axios';

const api = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL,
    withCredentials: true,
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
    }
})


// Auth EndPoint
export const login = (data) => api.post("/api/user/login", data);
export const register = (data) => api.post("/api/user/register", data)
export const getUserData = () => api.get("/api/user");
export const logout = () => api.post("/api/user/logout");


// Table EndPoint
export const addTable = (data) => api.post("/api/table/", data);
export const getTables = () => api.get("/api/table");

// Payment EndPoint

export const createOrderZalopay = (data) => api.post("/api/payment/create-order", data);
export const verifyPaymentZalopay = (data) => api.post("/api/payment/verify-payment", data);


