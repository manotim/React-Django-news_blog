// src/services/api.js
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { refreshAccessToken } from "../utils/auth";

const api = axios.create({
  baseURL: "http://127.0.0.1:8000/api/",
  withCredentials: true,
});

api.interceptors.request.use(async (config) => {
  const token = localStorage.getItem("token");

  if (token) {
    try {
      const { exp } = jwtDecode(token);
      const isExpired = Date.now() >= exp * 1000;

      if (isExpired) {
        const newToken = await refreshAccessToken();
        if (newToken) {
          config.headers.Authorization = `Bearer ${newToken}`;
        }
      } else {
        config.headers.Authorization = `Bearer ${token}`;
      }
    } catch (e) {
      console.warn("Token decode failed", e);
      localStorage.removeItem("token");
      localStorage.removeItem("refresh");
    }
  }

  return config;
}, (error) => {
  return Promise.reject(error);
});

export default api;
