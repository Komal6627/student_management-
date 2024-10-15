import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
// import { useDispatch, useSelector } from 'react-redux';
import { FaUserTie, FaUserGraduate, FaChalkboardTeacher } from 'react-icons/fa';
// import { loginUser } from '../redux/userRelated/userHandle';
// import Popup from '../components/Popup';

const Portals = () => {
  const [loader, setLoader] = useState(false);
  const navigate = useNavigate();
  

  return (
    <div className="bg-gradient-to-b from-purple-900 to-blue-900 h-full min-h-screen flex justify-center items-center p-8">
      <div className="container mx-auto mt-0">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Admin Card */}
          <div className="p-4 bg-gray-800 text-white text-center rounded-lg cursor-pointer transform hover:bg-gray-700 hover:scale-105 transition duration-300 ease-in-out">
            <div className="mb-4 text-5xl">
              <FaUserTie />
            </div>
            <h2 className="text-2xl font-bold mb-2">Admin</h2>
            <p>Login as an administrator to access the dashboard to manage app data.</p>
          </div>
          {/* Student Card */}
          <div onClick={() => navigate("/student")} className="p-6 bg-gray-800 text-white text-center rounded-lg cursor-pointer transform hover:bg-gray-700 hover:scale-105 transition duration-300 ease-in-out">
            <div className="mb-4 text-5xl">
              <FaUserGraduate />
            </div>
            <h2 className="text-2xl font-bold mb-2">Student</h2>
            <p>Login as a student to explore course materials and assignments.</p>
          </div>
          {/* Teacher Card */}
          <div onClick={() => navigate("/teacher")} className="p-6 bg-gray-800 text-white text-center rounded-lg cursor-pointer transform hover:bg-gray-700 hover:scale-105 transition duration-300 ease-in-out">
            <div className="mb-4 text-5xl">
              <FaChalkboardTeacher />
            </div>
            <h2 className="text-2xl font-bold mb-2">Teacher</h2>
            <p>Login as a teacher to create courses, assignments, and track student progress.</p>
          </div>
        </div>
      </div>

      {/* Loader Backdrop */}
      {loader && (
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="text-white text-xl">Please Wait...</div>
        </div>
      )}

      {/* Error Popup */}
    
    </div>
  );
};


export default Portals