

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
    // If data is FormData, remove Content-Type header to let browser set it with boundary
    if (config.data instanceof FormData) {
      delete config.headers['Content-Type'];
    }
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
      // Do NOT force a global redirect here. Let the app handle protected
      // routes and show login/register when appropriate. This avoids
      // unexpected navigation (e.g. landing page briefly showing then redirecting).
      // We simply pass the error through.
      console.warn('API 401 Unauthorized');
    }

    return Promise.reject(error);
  }
);


export default api;

