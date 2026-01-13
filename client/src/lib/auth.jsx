

import { createContext, useContext, useState, useEffect } from 'react';
import api from './api';


// Create Auth Context
const AuthContext = createContext();

// Custom hook to use auth context
export function useAuth() {

  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}

// Auth Provider Component
export function AuthProvider({ children }) {

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch user on mount and when needed
  const fetchUser = async () => {
    try {
      const response = await api.get('/getUser');
      setUser(response.data);
      return response.data;

    } catch (error) {
      setUser(null);
      return null;

    } finally {
      setLoading(false);
    }
  };

  // Check if user is admin
  const isAdmin = user?.email === import.meta.env.VITE_ADMIN_EMAIL;


  // Login function
  const login = async (email, password) => {
    try {
      const response = await api.post('/login', { email, password });
      
      if (response.data.success) {
        // Fetch user data after login
        const userData = await fetchUser();
        return { success: true, user: userData };
      }
      return { success: false, message: response.data.message };
  
    } catch (error) {
      return { 
        success: false, 
        message: error.response?.data?.message || 'Login failed' 
      };
    }
  };


  // Register function
  const register = async (fullName, email, password) => {
    try {
      const response = await api.post('/register', { fullName, email, password });
      
      if (response.data.success) {
        // Fetch user data after registration
        const userData = await fetchUser();
        return { success: true, user: userData };
      }
      return { success: false, message: response.data.message };
    
    } catch (error) {
      return { 
        success: false, 
        message: error.response?.data?.message || 'Registration failed' 
      };
    }
  };


  // Logout function
  const logout = async () => {
    try {
      
      await api.post('/logout');
      setUser(null);
      return { success: true };
    
    } catch (error) {
      console.error('Logout error:', error);
      // Even if logout fails, clear user state
      setUser(null);
      return { success: false };
    }
  };


  // Update user function
  const updateUser = (userData) => {
    setUser(userData);
  };


  // Fetch user on mount
  useEffect(() => {
    fetchUser();
  }, []);


  const value = {
    user,
    loading,
    isAdmin,
    login,
    register,
    logout,
    fetchUser,
    updateUser,
  };

  
  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

