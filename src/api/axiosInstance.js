// src/api/axiosInstance.js
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://dummyjson.com", // API fake
  headers: { "Content-Type": "application/json" },
});

export default axiosInstance;
 