import React, { useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import { loginStudentRoute, loginTeacherRoute, loginAdminRoute } from '../utils/APIRoute';
import 'react-toastify/ReactToastify.css';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // Import your AuthContext

const LoginForm = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [model, setModel] = useState('Student'); // Default model
  const navigate = useNavigate(); // Hook to navigate
  const { login } = useAuth(); // Destructure the login function from AuthContext

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
    const isValid = handleValidation();
    if (isValid) {
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
        let endpoint = '';
        if (model === 'Teacher') endpoint = loginTeacherRoute;
        if (model === 'Student') endpoint = loginStudentRoute;
        if (model === 'Admin') endpoint = loginAdminRoute;

        const response = await axios.post(endpoint, data);
        
        // Log the response for debugging
        console.log("Response from login:", response.data);

        // Check if the API response has the correct structure
        if (response.data && response.data.token ) {
            const { token } = response.data; // Extract token and user
            login(token); // Call the login function with the token and user
            console.log("Full response:", response);

            toast.success('Login successful!', toastOptions);

            // Navigate to the respective portal based on the model
            navigate(`/${model.toLowerCase()}-portal`);
        } else {
            // Handle case when the response structure is not as expected
            toast.error('Invalid login response', toastOptions);
        }
    } catch (error) {
        // Check if the error response exists to determine if it's an invalid login
        if (error.response && error.response.data) {
            toast.error(error.response.data.message || 'Error logging in', toastOptions);
        } else {
            toast.error('Error logging in', toastOptions);
        }
        console.error(error);
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
            className="bg-transparent border border-[#4e0eff] rounded-md p-4 "
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            className="bg-transparent border border-[#4e0eff] rounded-md p-4 "
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
