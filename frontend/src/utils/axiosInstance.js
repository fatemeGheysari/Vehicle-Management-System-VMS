// utils/axiosInstance.js
import axios from "axios";

const axiosInstance = axios.create({
  // baseURL: "http://localhost:3000",
  baseURL: "https://vehicle-management-system-vms.onrender.com", // Backend on Render
  withCredentials: false, // set to true only if backend sets cookies
  timeout: 15000,
});

// Add token to every request if it exists
axiosInstance.interceptors.request.use((config) => {
  const auth = localStorage.getItem("auth");
  const token = auth ? JSON.parse(auth).token : null;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default axiosInstance;
