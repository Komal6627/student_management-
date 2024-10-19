import React, { useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import { loginStudentRoute, loginTeacherRoute, loginAdminRoute } from '../utils/APIRoute';
import 'react-toastify/ReactToastify.css';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/TestAuthC'; // Ensure this path is correct

const LoginForm = () => {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [model, setModel] = useState('Student'); // Default model
    const navigate = useNavigate(); // Hook to navigate
    const { login, fetchUserProfile, extractUserIdFromToken } = useAuth(); 

    const toastOptions = {
        position: 'bottom-right',
        autoClose: 5000,
        pauseOnHover: true,
        draggable: true,
        theme: 'dark',
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleModelChange = (e) => {
        setModel(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (handleValidation()) {
            await handleLogin(formData, model);
        }
    };

    const handleValidation = () => {
        const { email, password } = formData;
        if (!email) {
            toast.error('Email is required', toastOptions);
            return false;
        }
        if (!password || password.length < 8) {
            toast.error('Password should be at least 8 characters long', toastOptions);
            return false;
        }
        return true;
    };

    const handleLogin = async (data, model) => {
      try {
          const endpoint = getLoginEndpoint(model);
          const response = await axios.post(endpoint, data);
          console.log('API response:', response.data); // Log the full response to debug
  
          if (response.data && response.data.token) {
              const { token } = response.data; // Extract token directly
              const student = response.data.student || response.data.user; // Ensure correct extraction of student info
  
              // Store token and user info in local storage
              localStorage.setItem('token', token);
              localStorage.setItem('user', JSON.stringify(student));
  
              // Existing logic...
              await login({ ...data, token });
              console.log("User info after login:", student); // Log the student info
              
              const userId = extractUserIdFromToken(token);
              if (userId) {
                  await fetchUserProfile(userId, token);
              }
  
              console.log("Login successful");
              toast.success(response.data.message || 'Login successful!', toastOptions);
              navigate(`/${model.toLowerCase()}-portal`);
          } else {
              toast.error('Invalid login response', toastOptions);
          }
      } catch (error) {
          console.error('Error during login:', error);
          const errorMessage = error.response?.status === 401 
              ? 'Invalid email or password' 
              : 'Error logging in';
          toast.error(errorMessage, toastOptions);
      }
  };
  

    const getLoginEndpoint = (model) => {
        switch (model) {
            case 'Teacher':
                return loginTeacherRoute;
            case 'Student':
                return loginStudentRoute;
            case 'Admin':
                return loginAdminRoute;
            default:
                throw new Error('Unknown model');
        }
    };

    return (
        <>
            <div className="flex h-screen justify-center items-center">
                <form onSubmit={handleSubmit} className="bg-opacity-75 rounded-2xl p-12 flex flex-col gap-8 w-full max-w-sm">
                    <h1 className="text-black mx-10 text-2xl font-bold uppercase">{model} Login</h1>

                    {/* Model Selection */}
                    <select value={model} onChange={handleModelChange} className="bg-transparent border border-[#4e0eff] rounded-md p-4">
                        <option value="Student">Student</option>
                        <option value="Teacher">Teacher</option>
                        <option value="Admin">Admin</option>
                    </select>

                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        onChange={handleChange}
                        className="bg-transparent border border-[#4e0eff] rounded-md p-4"
                        required
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        onChange={handleChange}
                        className="bg-transparent border border-[#4e0eff] rounded-md p-4"
                        required
                    />
                    <button
                        type="submit"
                        className="bg-[#997af0] text-white py-4 rounded-md font-bold text-lg transition duration-500 hover:bg-[#4e0eff]"
                    >
                        Login
                    </button>
                    <span className="text-black text-center">
                        If account does not exist <Link to="/register" className="text-[#4e0eff] font-bold">Register</Link>
                    </span>
                </form>
            </div>
            <ToastContainer />
        </>
    );
};

export default LoginForm;
