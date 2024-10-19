import React, { createContext, useContext, useState, useEffect } from 'react';

// Create a Context for Authentication
const AuthContext = createContext();

// Create a Provider Component
export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userInfo, setUserInfo] = useState({}); // Store user info
  const [userToken, setUserToken] = useState(null);

  const login = (token, user) => {
    setIsAuthenticated(true);
    // setUserInfo(user); // Store user info
    // Optionally, you can store the user's info in local storage or session storage
    localStorage.setItem('token', token);
    // localStorage.setItem('userInfo', JSON.stringify(user));
    localStorage['userInfo'] = JSON.stringify(user);
  };




  const logout = () => {
    setIsAuthenticated(false);
    setUserInfo(null); // Clear user info
    localStorage.removeItem('token');
    // localStorage.removeItem('userInfo');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout , userInfo}}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the AuthContext
export const useAuth = () => {
  return useContext(AuthContext);
};
