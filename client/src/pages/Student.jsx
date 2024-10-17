// src/pages/Student.js
import React from 'react';
import LoginForm from '../components/LoginForm';
import StudentPortal from '../components/StudentPortal';
import { useAuth } from '../context/AuthContext'; // Import useAuth

const Student = () => {
  const { isAuthenticated } = useAuth(); // Get authentication state

  return (
    <div>
      {isAuthenticated ? <StudentPortal /> : <LoginForm />}
    </div>
  );
};

export default Student;
