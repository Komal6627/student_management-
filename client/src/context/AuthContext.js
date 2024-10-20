import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import {jwtDecode} from 'jwt-decode'; // Ensure this is imported correctly
import { toast } from 'react-toastify';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [userInfo, setUserInfo] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const login = async (credentials, userType) => {
        let loginRoute;
        console.log('User Type to Login:', userType);

        switch (userType) {
            case 'student':
                loginRoute = '/api/student/login';
                break;
            case 'teacher':
                loginRoute = '/api/teacher/login';
                break;
            case 'admin':
                loginRoute = '/api/class/login';
                break;
            default:
                throw new Error('Invalid user type');
        }

        try {
            const response = await axios.post(`hhttps://student-management-he5k.onrender.com${loginRoute}`, credentials);
            const { token, user } = response.data;

            // Set user info and authentication state
            // setUserInfo({ ...user, token });
            setUserInfo({ ...user, token, userType });

            setIsAuthenticated(true);
            localStorage.setItem('authToken', token);
        } catch (error) {
            console.error('Login failed:', error);
            toast.error('Login failed. Please try again.');
            throw error;
        }
    };

    const fetchUserProfile = async (userId, token) => {
        let profileRoute;
    
        // Check the user type from userInfo or another state/context
        console.log('User Type during profile fetch:', userInfo?.type);
    
        const userType = userInfo?.type; // Make sure this is being set correctly
        switch (userType) {
            case 'student':
                profileRoute = `hhttps://student-management-he5k.onrender.com/api/student/${userId}`;
                console.log('Fetching student profile...');
                break;
            case 'teacher':
                profileRoute = `hhttps://student-management-he5k.onrender.com/api/teacher/${userId}`;
                console.log('Fetching teacher profile...');
                break;
            case 'admin':
                profileRoute = `hhttps://student-management-he5k.onrender.com/api/class/${userId}`;
                console.log('Fetching admin profile...');
                break;
            default:
                console.error('Unknown user type:', userType);
                return;
        }
    
        // Log the API route being used
        console.log('Profile route:', profileRoute);
    
        try {
            const response = await axios.get(profileRoute, {
                headers: { Authorization: `Bearer ${token}` },
            });
            console.log('User Profile Fetched:', response.data);
            setUserInfo({ ...response.data, token });
            setIsAuthenticated(true);
        } catch (error) {
            console.error('Failed to fetch user profile:', error);
            setIsAuthenticated(false);
            setUserInfo(null);
            localStorage.removeItem('authToken');
            toast.error('Failed to fetch user profile. Please log in again.');
        }
    };
    
    const extractUserIdFromToken = (token) => {
        try {
            const decodedToken = jwtDecode(token);
            return decodedToken.id;
        } catch (error) {
            console.error('Failed to decode token:', error);
            return null;
        }
    };

    useEffect(() => {
        const token = localStorage.getItem('authToken');
        if (token) {
            const userId = extractUserIdFromToken(token);
            if (userId) {
                fetchUserProfile(userId, token);
            } else {
                toast.error('Invalid token. Please log in again.');
                localStorage.removeItem('authToken');
            }
        }
    }, []);

    return (
        <AuthContext.Provider value={{ userInfo, isAuthenticated, login, fetchUserProfile, extractUserIdFromToken}}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};
