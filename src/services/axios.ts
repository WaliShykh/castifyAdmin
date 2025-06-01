import axios from "axios";

const API_URL = "http://localhost:5174/api";

// Create axios instance
const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Clear auth data
      localStorage.removeItem("user");
      localStorage.removeItem("isAuthenticated");
      localStorage.removeItem("token");
      localStorage.clear();

      // Only redirect if not already on auth pages
      const isAuthPage =
        window.location.pathname === "/signin" ||
        window.location.pathname === "/forgot-password";
      if (!isAuthPage) {
        window.location.replace("/signin");
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
