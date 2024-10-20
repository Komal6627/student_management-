import React from 'react';
import { useAuth } from '../context/AuthContext.js';

const StudentPortal = () => {
    const { userInfo, isAuthenticated } = useAuth();

    return (
        <div>
            {isAuthenticated ? (
                <div>
                    <h1>Welcome, {userInfo?.email}</h1>
                    {/* Render additional user details */}
                    <h1>Welcome, {userInfo?.name}</h1>
                    {/* Render additional user details */}
                </div>
            ) : (
                <h1>Please log in</h1>
            )}
        </div>
    );
};

export default StudentPortal;
