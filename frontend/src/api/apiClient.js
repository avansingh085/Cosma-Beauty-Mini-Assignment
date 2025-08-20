// src/api/apiClient.js
import axios from "axios";

// Create axios instance
const apiClient = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL||'http://localhost:3000', 
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000, // optional: 10s timeout
});


export default apiClient;
