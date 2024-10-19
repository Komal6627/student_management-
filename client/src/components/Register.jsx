import React, { useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import { registerStudentRoute, registerTeacherRoute, registerAdminRoute } from '../utils/APIRoute';
import 'react-toastify/ReactToastify.css';
import { Link, useNavigate } from 'react-router-dom';

const RegistrationForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    gender: '',
    dateOfBirth: '',
    address: '',
    contactNo: '',
    password: '',
  });
  const [model, setModel] = useState('Student'); // Default model

  const toastOptions = {
    position: 'bottom-right',
    autoClose: 5000,
    pauseOnHover: true,
    draggable: true,
    theme: 'dark',
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleModelChange = (e) => {
    setModel(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const isValid = handleValidation();
    if (isValid) {
      await handleFormSubmit(formData, model);
      navigate("/login"); // Navigate after form submission
    }
  };

  const handleValidation = () => {
    const { password, name, email, gender, year, dateOfBirth, address, contactNo } = formData;
    if (!name || name.length < 3) {
      toast.error('Name should be at least 3 characters long', toastOptions);
      return false;
    }
    if (!email) {
      toast.error('Email is required', toastOptions);
      return false;
    }
    if (!gender) {
      toast.error('Gender is required', toastOptions);
      return false;
    }
   
    if (!dateOfBirth) {
      toast.error('Date of Birth is required', toastOptions);
      return false;
    }
    if (!address) {
      toast.error('Address is required', toastOptions);
      return false;
    }
    if (!contactNo || contactNo.length < 10) {
      toast.error('Contact Number should be at least 10 digits', toastOptions);
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
      <div className="flex h-screen justify-center items-center overflow-hidden p-4">
        <form
          onSubmit={handleSubmit}
          className="bg-opacity-75 rounded-2xl p-8 flex flex-col gap-4 w-full max-w-md max-h-[90vh] overflow-y-auto"
        >
          <h1 className="text-black text-2xl font-bold uppercase text-center">{model} Registration</h1>

          {/* Model Selection Dropdown */}
          <select
            value={model}
            onChange={handleModelChange}
            className="bg-transparent border border-[#4e0eff] rounded-md p-4"
          >
            <option value="Student">Student</option>
            <option value="Teacher">Teacher</option>
            <option value="Admin">Admin</option>
          </select>

          <input
            type="text"
            name="name"
            placeholder={`${model} Name`}
            onChange={handleChange}
            className="bg-transparent border border-[#4e0eff] rounded-md p-4"
            required
          />
          <input
            type="email"
            name="email"
            placeholder={`${model} Email`}
            onChange={handleChange}
            className="bg-transparent border border-[#4e0eff] rounded-md p-4"
            required
          />

          {/* Gender Dropdown */}
          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            className="bg-transparent border border-[#4e0eff] rounded-md p-4"
            required
          >
            <option value="" disabled>Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>

          {/* Additional Fields */}
         
          <input
            type="date"
            name="dateOfBirth"
            onChange={handleChange}
            className="bg-transparent border border-[#4e0eff] rounded-md p-4"
            required
          />
          <input
            type="text"
            name="address"
            placeholder="Address"
            onChange={handleChange}
            className="bg-transparent border border-[#4e0eff] rounded-md p-4"
            required
          />
          <input
            type="text"
            name="contactNo"
            placeholder="Contact Number"
            onChange={handleChange}
            className="bg-transparent border border-[#4e0eff] rounded-md p-4"
            required
          />

          {/* Move Password to Last */}
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
