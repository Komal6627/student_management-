import React from 'react'
import LoginForm from '../components/LoginForm'
import TeacherPortal from '../components/TeacherPortal';
import { useAuth } from '../context/AuthContext';

const Teacher = () => {
  const { isAuthenticated } = useAuth(); // Get authentication state

  return (
    <div>
      {isAuthenticated ? <TeacherPortal /> : <LoginForm />}
    </div>
  );
}

export default Teacher