import React, { useState } from 'react'
import RegistrationForm from '../components/RegistrationForm'

const Admin = () => {
    const [model, setModel] = useState('Admin');
    
  return (
    <div>
      <RegistrationForm model="Admin"/>
    </div>
  )
}

export default Admin
