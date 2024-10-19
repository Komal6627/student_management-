import React, { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [userInfo, setUserInfo] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Function to log in the user
  const login = async (credentials) => {
    try {
      const response = await axios.post('/api/login', credentials);
      const { user, token } = response.data;

      setUserInfo({ ...user, token });
      setIsAuthenticated(true);
      localStorage.setItem('authToken', token); // Persist token
    } catch (error) {
      console.error('Login failed:', error);
      throw error; // Allow error handling in the component
    }
  };

  // Function to log out the user
  const logout = () => {
    setUserInfo(null);
    setIsAuthenticated(false);
    localStorage.removeItem('authToken'); // Clear the token
  };

  // Function to fetch user profile
  const fetchUserProfile = async () => {
    const token = localStorage.getItem('authToken');
    if (token) {
      try {
        const response = await axios.get('/api/student/:id', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUserInfo({ ...response.data, token });
        setIsAuthenticated(true);
      } catch (error) {
        console.error('Failed to fetch user profile:', error);
        setIsAuthenticated(false);
      }
    }
  };

  // Effect to check for existing token on initial load
  useEffect(() => {
    fetchUserProfile(); // Fetch user profile on initial load
  }, []);

  return (
    <AuthContext.Provider value={{ userInfo, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
