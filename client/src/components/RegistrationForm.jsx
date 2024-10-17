import React, { useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import { registerStudentRoute, registerTeacherRoute, registerAdminRoute } from '../utils/APIRoute';
import 'react-toastify/ReactToastify.css';
import { Link, useNavigate } from 'react-router-dom';

const RegistrationForm = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [model, setModel] = useState('Student'); // Default model

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
      await handleFormSubmit(formData, model);
    }
    navigate("/login")
  };

  const handleValidation = () => {
    const { password, name, email } = formData;
    if (!name || name.length < 3) {
      toast.error('Name should be at least 3 characters long', toastOptions);
      return false;
    }
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

  const handleFormSubmit = async (data, model) => {
    try {
      let endpoint = '';
      if (model === 'Teacher') endpoint = registerTeacherRoute;
      if (model === 'Student') endpoint = registerStudentRoute;
      if (model === 'Admin') endpoint = registerAdminRoute;

      const response = await axios.post(endpoint, data);
      toast.success('Data submitted successfully!', toastOptions);
    } catch (error) {
      toast.error('Error submitting form', toastOptions);
      console.error(error);
    }
  };

  return (
    <>
      <div className="flex h-screen justify-center items-center">
        <form onSubmit={handleSubmit} className="bg-opacity-75 rounded-2xl p-12 flex flex-col gap-8 w-full max-w-sm">
          <h1 className="text-black text-2xl font-bold uppercase">{model} Registration</h1>

          {/* Model Selection Dropdown */}
          <select value={model} onChange={handleModelChange} className="bg-transparent border border-[#4e0eff] rounded-md p-4 ">
            <option value="Student">Student</option>
            <option value="Teacher">Teacher</option>
            <option value="Admin">Admin</option>
          </select>

          <input
            type="text"
            name="name"
            placeholder={`${model} Name`}
            onChange={handleChange}
            className="bg-transparent border border-[#4e0eff] rounded-md p-4 "
          />
          <input
            type="email"
            name="email"
            placeholder={`${model} Email`}
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
            Submit
          </button>
          <span className="text-black text-center">
            Already have an account? <Link to="/login" className="text-[#4e0eff] font-bold">Login</Link>
          </span>
        </form>
      </div>
      <ToastContainer />
    </>
  );
};

export default RegistrationForm;
