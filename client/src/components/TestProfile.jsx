import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/ReactToastify.css';
import { useAuth } from '../context/AuthContext';  // Ensure you have a working AuthContext
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
  const [loading, setLoading] = useState(true);

  const toastOptions = {
    position: 'bottom-right',
    autoClose: 5000,
    pauseOnHover: true,
    draggable: true,
    theme: 'dark',
  };

  const navigate = useNavigate();
  useEffect(() => {
    console.log("isAuthenticated:", isAuthenticated);
    console.log("userInfo:", userInfo);
    if (isAuthenticated && userInfo?.id) {
      const fetchUserProfile = async () => {
        try {
          const response = await axios.get(`${getStudentProfileRoute}/${userInfo.id}`, {
            headers: { Authorization: `Bearer ${userInfo.token}` },
          });
          setFormData(response.data);
          setLoading(false);
        } catch (error) {
          toast.error("Error fetching profile data", toastOptions);
          setLoading(false);
          console.error(error);
        }
      };
  
      fetchUserProfile();
    } else {
      setLoading(false); // Stop loading if not authenticated or user info is missing
    }
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
      const config = {
        headers: { Authorization: `Bearer ${userInfo.token}` }  // Include token in headers for authentication
      };
      if (userInfo?.id) {
        await axios.put(`${updateStudentProfileRoute}/${userInfo.id}`, formData, config);
        toast.success('Profile updated successfully!', toastOptions);
      } else {
        await axios.post(createStudentProfileRoute, formData, config);
        toast.success('Profile created successfully!', toastOptions);
      }
      navigate("/test");
    } catch (error) {
      toast.error('Error submitting profile', toastOptions);
      console.error(error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;  // Show a loading message while fetching data
  }

  return (
    <>
      <div className="flex h-screen justify-center items-center bg-white">
        <form
          onSubmit={handleSubmit}
          className="bg-opacity-75 rounded-2xl p-8 flex flex-col gap-6 w-full max-w-lg overflow-auto"
          style={{ maxHeight: '90vh' }}
        >
          <h1 className="text-black text-2xl font-bold uppercase mb-4">
            {userInfo?.id ? 'Update' : 'Create'} Student Profile
          </h1>

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
