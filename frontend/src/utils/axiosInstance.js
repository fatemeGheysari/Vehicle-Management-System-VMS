// utils/axiosInstance.js
import axios from "axios";

const axiosInstance = axios.create({
  // baseURL: "http://localhost:3000",
  baseURL: "https://vehicle-management-system-vms.onrender.com", // Backend on Render
  withCredentials: false,
  timeout: import.meta.env.PROD ? 60000 : 15000, // 60s in prod, 15s in dev
});

axiosInstance.interceptors.request.use((config) => {
  const auth = localStorage.getItem("auth");
  const token = auth ? JSON.parse(auth).token : null;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default axiosInstance;
