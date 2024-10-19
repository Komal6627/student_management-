import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import {jwtDecode} from 'jwt-decode'; // Don't forget to install this if you haven't
import { toast } from 'react-toastify'; // If you're using toast for notifications
import { loginStudentRoute } from '../utils/APIRoute';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [userInfo, setUserInfo] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    // Function to log in the user
    const login = async (credentials) => {
      try {
          const response = await axios.post(loginStudentRoute, credentials);
          const { token, user } = response.data;
  
          // Extract user ID from the token
          const userId = extractUserIdFromToken(token);
  
          // Fetch user profile
          await fetchUserProfile(userId, token); // Fetch profile
  
          setUserInfo({ ...user, token }); // Save user data and token separately
          setIsAuthenticated(true);
          localStorage.setItem('authToken', token); // Persist token
      } catch (error) {
          console.error('Login failed:', error);
          toast.error('Login failed. Please try again.'); // Provide feedback to the user
          throw error; // Allow error handling in the component
      }
  };
  
  const fetchUserProfile = async (userId, token) => {
      try {
          const response = await axios.get(`http://localhost:5000/api/student/${userId}`, {
              headers: { Authorization: `Bearer ${token}` },
          });
          setUserInfo({ ...response.data, token }); // Set user info based on the fetched data
          console.log('User Info after login:', { ...response.data, token });
          setIsAuthenticated(true);
      } catch (error) {
          console.error('Failed to fetch user profile:', error);
          setIsAuthenticated(false);
          toast.error('Failed to fetch user profile.'); // Provide feedback to the user
      }
  };
  

    // Function to extract user ID from token
    const extractUserIdFromToken = (token) => {
        const decodedToken = jwtDecode(token);
        return decodedToken.id; // Adjust based on your token structure
    };

    // Effect to check for existing token on initial load
    useEffect(() => {
        const token = localStorage.getItem('authToken');
        if (token) {
            const userId = extractUserIdFromToken(token);
            fetchUserProfile(userId, token); // Fetch user profile on initial load
        }
    }, []);

    return (
        <AuthContext.Provider value={{ userInfo, isAuthenticated, login, fetchUserProfile, extractUserIdFromToken }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};
