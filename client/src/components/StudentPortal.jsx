import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import { useAuth } from '../context/AuthContext';
import { getStudentProfileRoute } from '../utils/APIRoute';
import { Link } from 'react-router-dom';

const StudentPortal = () => {
  const { userInfo, isAuthenticated } = useAuth();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      if (isAuthenticated && userInfo?.id) {
        try {
          const response = await axios.get(`${getStudentProfileRoute}/${userInfo.id}`);
          console.log('Profile Response:', response.data); // Log API response
          setProfile(response.data);
        } catch (error) {
          toast.error('Error fetching student profile');
          console.error(error);
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [isAuthenticated, userInfo?.id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!profile) {
    return (
      <div className="p-4 text-center">
        <h1 className="text-2xl font-bold">No Profile Found</h1>
        <p className="my-4">It seems you haven't created a profile yet.</p>
        <Link
          to="/student-profile" // Adjust to your actual create profile route
          className="text-[#4e0eff] underline hover:text-blue-700"
        >
          Click here to create your profile.
        </Link>
      </div>
    );
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Student Profile</h1>
      <div className="border p-4 my-4 rounded-md">
        <h2 className="text-lg font-semibold">{profile.name}</h2>
        <p><strong>Gender:</strong> {profile.gender}</p>
        <p><strong>Year:</strong> {profile.year}</p>
        <p><strong>Date of Birth:</strong> {profile.dateOfBirth}</p>
        <p><strong>Address:</strong> {profile.address}</p>
        <p><strong>Email:</strong> {profile.email}</p>
        <p><strong>Contact Number:</strong> {profile.contactNo}</p>
        <p><strong>Fees Paid:</strong> {profile.feesPaid ? 'Yes' : 'No'}</p>
      </div>
      <ToastContainer />
    </div>
  );
};

export default StudentPortal;
