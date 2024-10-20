import React, { useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.js';
import 'react-toastify/ReactToastify.css';

const LoginForm = () => {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [model, setModel] = useState('Student'); // Default model
    const navigate = useNavigate();
    const { login } = useAuth();

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

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (handleValidation()) {
            console.log('Form Data before login:', formData);
            await handleLogin(formData, model);
        }
    };

    const handleLogin = async (data, model) => {
      try {
          const normalizedModel = model.toLowerCase();
          const endpoint = getLoginEndpoint(normalizedModel);
          const response = await axios.post(endpoint, data);
          
          console.log('Login Response:', response.data);
  
          const { token, user } = response.data; // Extract user data directly
  
          if (token && user) {
              console.log('User:', user);
              // Store the user data along with the token
              localStorage.setItem('authToken', JSON.stringify({ token, user }));
              await login({ ...data, token, user }, normalizedModel); // Pass user data
              navigate(`/${normalizedModel}-portal`);
              toast.success('Login successful!', toastOptions);
          } else {
              toast.error('Invalid login response', toastOptions);
          }
      } catch (error) {
          console.error('Login error:', error);
          const errorMessage = error.response?.status === 401 
              ? 'Invalid email or password' 
              : 'Error logging in';
          toast.error(errorMessage, toastOptions);
      }
  };
  
    const getLoginEndpoint = (model) => {
        switch (model) {
            case 'student':
                return 'hhttps://student-management-he5k.onrender.com/api/student/login';
            case 'teacher':
                return 'hhttps://student-management-he5k.onrender.com/api/teacher/login';
            case 'admin':
                return 'hhttps://student-management-he5k.onrender.com/api/class/login';
            default:
                throw new Error('Unknown model');
        }
    };

    return (
        <>
            <div className="flex h-screen justify-center items-center">
                <form onSubmit={handleSubmit} className="bg-opacity-75 rounded-2xl p-12 flex flex-col gap-8 w-full max-w-sm">
                    <h1 className="text-black mx-10 text-2xl font-bold uppercase">{model} Login</h1>

                    <select value={model} onChange={handleModelChange} className="bg-transparent border border-[#4e0eff] rounded-md p-4">
                        <option value="Student">Student</option>
                        <option value="Teacher">Teacher</option>
                        <option value="Admin">Admin</option>
                    </select>

                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleChange}
                        className="bg-transparent border border-[#4e0eff] rounded-md p-4"
                        required
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={formData.password}
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
