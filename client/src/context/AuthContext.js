import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode'; // Ensure jwt-decode is installed
import { toast } from 'react-toastify'; // Ensure react-toastify is installed

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [userInfo, setUserInfo] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    // Unified login function for students, teachers, and admins
    const login = async (credentials, userType) => {
        let loginRoute;

        switch (userType) {
            case 'student':
                loginRoute = '/api/student/login';
                break;
            case 'teacher':
                loginRoute = '/api/teacher/login';
                break;
            case 'admin':
                loginRoute = '/api/admin/login';
                break;
            default:
                throw new Error('Invalid user type');
        }

        try {
            const response = await axios.post(`http://localhost:5000${loginRoute}`, credentials);
            const { token, user } = response.data;

            // Set user info and authentication status
            setUserInfo({ ...user, token });
            console.log('User Info after login:', { ...user, token });

            setIsAuthenticated(true);
            localStorage.setItem('authToken', token); // Persist token
        } catch (error) {
            console.error('Login failed:', error);
            toast.error('Login failed. Please try again.'); // Notify user
            throw error; // Propagate error to the component
        }
    };

    // Fetch user profile function
    const fetchUserProfile = async (userId, token, userType) => {
        let profileRoute;

        switch (userType) {
            case 'student':
                profileRoute = `/api/student/${userId}`;
                break;
            case 'teacher':
                profileRoute = `/api/teacher/${userId}`;
                break;
            case 'admin':
                profileRoute = `/api/admin/${userId}`;
                break;
            default:
                throw new Error('Invalid user type');
        }

        try {
            const response = await axios.get(`http://localhost:5000${profileRoute}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setUserInfo({ ...response.data, token }); // Update user info
            console.log('User Info after fetching:', { ...response.data, token });
            setIsAuthenticated(true);
        } catch (error) {
            console.error('Failed to fetch user profile:', error);
            setIsAuthenticated(false);
            setUserInfo(null); 
            toast.error('Failed to fetch user profile.');
        }
    };

    // Token extraction
    const extractUserIdFromToken = (token) => {
        const decodedToken = jwtDecode(token);
        return decodedToken.id; // Adjust based on your token structure
    };

    // Initial load check for existing token
    useEffect(() => {
        const token = localStorage.getItem('authToken');
        if (token) {
            const userId = extractUserIdFromToken(token);
            const userType = token.includes('admin') ? 'admin' : (token.includes('student') ? 'student' : 'teacher'); // Adjust based on token
            fetchUserProfile(userId, token, userType); // Fetch user profile on initial load
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
