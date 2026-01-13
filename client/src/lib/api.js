

import axios from 'axios';

// Get API URL from environment variable (must start with VITE_)
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';


// Create axios instance with default configuration
const api = axios.create({
  
  baseURL: `${API_URL}/api`,
  withCredentials: true, // Important: This sends cookies (JWT tokens) with every request
  headers: {
    'Content-Type': 'application/json',
  },
});


// Request interceptor - runs before every request
api.interceptors.request.use(
  (config) => {
    // You can add auth tokens here if needed (but we're using cookies)
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);


// Response interceptor - runs after every response
api.interceptors.response.use(

  (response) => {
    // If request is successful, just return the data
    return response;
  },

  // Handle errors globally
  (error) => {

    if (error.response?.status === 401) {
      // Unauthorized - user not logged in or token expired
      // Redirect to login page
      if (window.location.pathname !== '/login' && window.location.pathname !== '/register') {
        window.location.href = '/login';
      }
    }

    return Promise.reject(error);
  }
);


export default api;

