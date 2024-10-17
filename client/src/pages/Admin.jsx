import React, { useState } from 'react'
import LoginForm from '../components/LoginForm'
import ClassPortal from '../components/ClassPortal';
import { useAuth } from '../context/AuthContext';

const Admin = () => {
  const { isAuthenticated } = useAuth(); // Get authentication state

  return (
    <div>
      {isAuthenticated ? <ClassPortal /> : <LoginForm />}
    </div>
  );
}

export default Admin
