import React from 'react'
import { Link } from 'react-router-dom'

const ClassPortal = () => {
  return (
    <div>
       <Link to="/class-analytics"> Class Analytics</Link>
       <Link to='/class-management'> Class Management</Link>
    </div>
  )
}

export default ClassPortal
