import React from 'react';
import { useAuth } from '../context/TestAuthC';

const MyComponent = () => {
    const { userInfo } = useAuth();
    
    // Check if userInfo and userInfo.student exist
    const student = userInfo?.student;

    return (
        <div>
            <h1>Welcome, {student ? student.name : 'Admin'}</h1>
            {student && (
                <div>
                    <p>Email: {student.email}</p>
                    <p>Fees Paid: {student.feesPaid ? 'Yes' : 'No'}</p>
                    {/* Add additional fields as necessary */}
                </div>
            )}
        </div>
    );
};

export default MyComponent;
