import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/ReactToastify.css';
// import axios from 'axios';


const Register = () => {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    name: '',
    email: '',
    password: '',
  });

  const toastOptions = {
    position: 'bottom-right',
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: 'dark',
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    
  };

  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const handleValidation = () => {
    const { password, confirmPassword, username, email } = values;
    if (password !== confirmPassword) {
      toast.error('Password and confirm password should be the same.', toastOptions);
      return false;
    } else if (username.length < 3) {
      toast.error('Username should be greater than 3 characters', toastOptions);
      return false;
    } else if (password.length < 8) {
      toast.error('Password should be equal to or greater than 8 characters', toastOptions);
      return false;
    } else if (email === '') {
      toast.error('Email is required', toastOptions);
      return false;
    }
    return true;
  };

  return (
    <>
      <div className="flex h-screen justify-center items-center ">
        <form onSubmit={handleSubmit} className=" bg-opacity-75 rounded-2xl p-12 flex flex-col gap-8 w-full max-w-sm">
          <div className="flex justify-center items-center gap-2 mb-4">
        
            <h1 className="text-black text-2xl font-bold uppercase">Register</h1>
          </div>
          <input
            type="text"
            placeholder="StudentName"
            name="name"
            onChange={handleChange}
            className="bg-transparent border border-[#4e0eff] rounded-md p-4 text-white focus:border-[#997af0] transition"
          />
          <input
            type="email"
            placeholder="Email"
            name="email"
            onChange={handleChange}
            className="bg-transparent border border-[#4e0eff] rounded-md p-4 text-white focus:border-[#997af0] transition"
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            onChange={handleChange}
            className="bg-transparent border border-[#4e0eff] rounded-md p-4 text-white focus:border-[#997af0] transition"
          />
          <button type="submit" className="bg-[#997af0] text-white py-4 rounded-md font-bold text-lg transition duration-500 hover:bg-[#4e0eff]">
            Create User
          </button>
          <span className="text-white text-center">
            Already have an account? <Link to="/login" className="text-[#4e0eff] font-bold">Login</Link>
          </span>
        </form>
      </div>
      <ToastContainer />
    </>
  );
};

export default Register;
