import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/ReactToastify.css';
import { useAuth } from '../context/AuthContext';
import { createStudentProfileRoute, updateStudentProfileRoute, getStudentProfileRoute } from '../utils/APIRoute';
import { useNavigate } from 'react-router-dom';

const StudentsProfile = () => {
  const { userInfo, isAuthenticated } = useAuth();
  const [formData, setFormData] = useState({
    name: '',
    gender: '',
    year: '',
    dateOfBirth: '',
    address: '',
    email: '',
    contactNo: '',
    feesPaid: false,
  });

  const toastOptions = {
    position: 'bottom-right',
    autoClose: 5000,
    pauseOnHover: true,
    draggable: true,
    theme: 'dark',
  };

  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserProfile = async () => {
      if (isAuthenticated && userInfo?.id) {
        try {
          const response = await axios.get(`${getStudentProfileRoute}/${userInfo.id}`);
          setFormData(response.data);
        } catch (error) {
          toast.error('Error fetching profile data', toastOptions);
          console.error(error);
        }
      }
    };

    fetchUserProfile();
  }, [isAuthenticated, userInfo?.id]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (userInfo?.id) {
        await axios.put(`${updateStudentProfileRoute}/${userInfo.id}`, formData);
        toast.success('Profile updated successfully!', toastOptions);
      } else {
        await axios.post(createStudentProfileRoute, formData);
        toast.success('Profile created successfully!', toastOptions);
        navigate("/student-portal");
      }
    } catch (error) {
      toast.error('Error submitting profile', toastOptions);
      console.error(error);
    }
  };

  return (
    <>
      <div className="flex h-screen justify-center items-center bg-white">
        <form
          onSubmit={handleSubmit}
          className="bg-opacity-75 rounded-2xl p-8 flex flex-col gap-6 w-full max-w-lg overflow-auto" // Adjusted width and added overflow
          style={{ maxHeight: '90vh' }} // Set max height to 90% of the viewport height
        >
          <h1 className="text-black text-2xl font-bold uppercase mb-4">Create Student Profile</h1>

          {/* Form Inputs */}
          <input
            type="text"
            name="name"
            placeholder="Student Name"
            value={formData.name}
            onChange={handleChange}
            className="bg-transparent border border-[#4e0eff] rounded-md p-4 focus:outline-none focus:ring-2 focus:ring-[#4e0eff]"
            required
          />
          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            className="bg-transparent border border-[#4e0eff] rounded-md p-4 focus:outline-none focus:ring-2 focus:ring-[#4e0eff]"
            required
          >
            <option value="" disabled>Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
          <input
            type="text"
            name="year"
            placeholder="Year"
            value={formData.year}
            onChange={handleChange}
            className="bg-transparent border border-[#4e0eff] rounded-md p-4 focus:outline-none focus:ring-2 focus:ring-[#4e0eff]"
            required
          />
          <input
            type="date"
            name="dateOfBirth"
            value={formData.dateOfBirth}
            onChange={handleChange}
            className="bg-transparent border border-[#4e0eff] rounded-md p-4 focus:outline-none focus:ring-2 focus:ring-[#4e0eff]"
            required
          />
          <input
            type="text"
            name="address"
            placeholder="Address"
            value={formData.address}
            onChange={handleChange}
            className="bg-transparent border border-[#4e0eff] rounded-md p-4 focus:outline-none focus:ring-2 focus:ring-[#4e0eff]"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="bg-transparent border border-[#4e0eff] rounded-md p-4 focus:outline-none focus:ring-2 focus:ring-[#4e0eff]"
            required
          />
          <input
            type="text"
            name="contactNo"
            placeholder="Contact Number"
            value={formData.contactNo}
            onChange={handleChange}
            className="bg-transparent border border-[#4e0eff] rounded-md p-4 focus:outline-none focus:ring-2 focus:ring-[#4e0eff]"
            required
          />
          <label className="flex items-center">
            <input
              type="checkbox"
              name="feesPaid"
              checked={formData.feesPaid}
              onChange={handleChange}
              className="mr-2"
            />
            Fees Paid
          </label>
          <button
            type="submit"
            className="bg-[#997af0] text-white py-4 rounded-md font-bold text-lg transition duration-500 hover:bg-[#4e0eff]"
          >
            {userInfo?.id ? 'Update Profile' : 'Create Profile'}
          </button>
        </form>
      </div>
      <ToastContainer />
    </>
  );
};

export default StudentsProfile;
