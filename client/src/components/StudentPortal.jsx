import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext.js';
import axios from 'axios';
import { toast } from 'react-toastify';

const StudentPortal = () => {
    const { userInfo } = useAuth();

    console.log("UserInfo",userInfo);
    
    // Initialize state unconditionally
    const [student, setStudent] = useState({
        name: userInfo?.name || '',
        email: '',
        gender: '',
        year: '',
        dateOfBirth: '',
        address: '',
        contactNo: '',
    });

    console.log(userInfo?.name);
    
    
    const [isEditing, setIsEditing] = useState(false);

    const toastOptions = {
        position: 'bottom-right',
        autoClose: 5000,
        pauseOnHover: true,
        draggable: true,
        theme: 'dark',
    };

    // Update student state when userInfo changes
    useEffect(() => {
        if (userInfo) {
            setStudent({
                name: userInfo.name || '',
                email: userInfo.email || '',
                gender: userInfo.gender || '',
                year: userInfo.year || '',
                dateOfBirth: userInfo.dateOfBirth || '',
                address: userInfo.address || '',
                contactNo: userInfo.contactNo || '',
            });
        }
    }, [userInfo]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setStudent((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const userId = JSON.parse(localStorage.getItem('user'))?.id;
        console.log("User ID:", userId); // Log userId
    
        if (userId) {
            try {
                const response = await axios.put(`hhttps://student-management-he5k.onrender.com/api/student/${userId}`, {
                    name: student.name,
                    email: student.email,
                    gender: student.gender,
                    dateOfBirth: student.dateOfBirth,
                    address: student.address,
                    contactNo: student.contactNo,
                });
    
                if (response.data.success) {
                    toast.success('Student information updated successfully', toastOptions);
                    setStudent((prev) => ({ ...prev, ...response.data.student }));
                } else {
                    toast.error('Failed to update student information', toastOptions);
                }
            } catch (error) {
                console.error('Error updating student info:', error.response?.data || error.message);
                toast.error(`Error updating student information: ${error.response?.data?.message || error.message}`, toastOptions);
            }
        } else {
            console.error('No user ID found for update');
            toast.error('User ID not found', toastOptions);
        }
    };
    

    const handleDelete = async () => {
        const userId = JSON.parse(localStorage.getItem('user')).id;

        if (userId) {
            const confirmDelete = window.confirm('Are you sure you want to delete your account? This action cannot be undone.');

            if (confirmDelete) {
                try {
                    const response = await axios.delete(`hhttps://student-management-he5k.onrender.com/api/student/${userId}`);

                    if (response.data.success) {
                        toast.success('Student account deleted successfully', toastOptions);
                        // Redirect or perform any other action after successful deletion
                        window.location.href = '/login'; // Uncomment to redirect to login
                    } else {
                        toast.error('Failed to delete student account', toastOptions);
                    }
                } catch (error) {
                    console.error('Error deleting student account:', error);
                    toast.error('Error deleting student account', toastOptions);
                }
            }
        } else {
            console.error('No user ID found for deletion');
            toast.error('User ID not found', toastOptions);
        }
    };

    if (!userInfo) {
        return <div>Loading...</div>;
    }

    return (
        <div className="flex flex-col items-center p-4">
            <h1 className="text-2xl font-bold text-blue-600 text-center">
                Welcome, {student.name || 'Student'}
            </h1>
            {student ? (
                <form onSubmit={handleSubmit}>
                    <table className="mt-4 border border-collapse border-gray-300 w-full max-w-2xl text-left">
                        <thead>
                            <tr>
                                <th className="border border-gray-300 p-2">Attribute</th>
                                <th className="border border-gray-300 p-2">Value</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className="border border-gray-300 p-2">Name</td>
                                <td className="border border-gray-300 p-2">
                                    {isEditing ? (
                                        <input
                                            type="text"
                                            name="name"
                                            value={student.name}
                                            onChange={handleChange}
                                            className="border border-gray-400 rounded p-1"
                                        />
                                    ) : (
                                        student.name
                                    )}
                                </td>
                            </tr>
                            <tr>
                                <td className="border border-gray-300 p-2">Email</td>
                                <td className="border border-gray-300 p-2">
                                    {isEditing ? (
                                        <input
                                            type="email"
                                            name="email"
                                            value={student.email}
                                            onChange={handleChange}
                                            className="border border-gray-400 rounded p-1"
                                        />
                                    ) : (
                                        student.email
                                    )}
                                </td>
                            </tr>
                            <tr>
                                <td className="border border-gray-300 p-2">Gender</td>
                                <td className="border border-gray-300 p-2">
                                    {isEditing ? (
                                        <select
                                            name="gender"
                                            value={student.gender}
                                            onChange={handleChange}
                                            className="border border-gray-400 rounded p-1"
                                        >
                                            <option value="" disabled>Select Gender</option>
                                            <option value="Male">Male</option>
                                            <option value="Female">Female</option>
                                            <option value="Other">Other</option>
                                        </select>
                                    ) : (
                                        student.gender
                                    )}
                                </td>
                            </tr>
                            <tr>
                                <td className="border border-gray-300 p-2">Date of Birth</td>
                                <td className="border border-gray-300 p-2">
                                    {isEditing ? (
                                        <input
                                            type="date"
                                            name="dateOfBirth"
                                            value={student.dateOfBirth ? student.dateOfBirth.split('T')[0] : ''}
                                            onChange={handleChange}
                                            className="border border-gray-400 rounded p-1"
                                        />
                                    ) : (
                                        student.dateOfBirth || 'N/A'
                                    )}
                                </td>
                            </tr>
                            <tr>
                                <td className="border border-gray-300 p-2">Address</td>
                                <td className="border border-gray-300 p-2">
                                    {isEditing ? (
                                        <input
                                            type="text"
                                            name="address"
                                            value={student.address}
                                            onChange={handleChange}
                                            className="border border-gray-400 rounded p-1"
                                        />
                                    ) : (
                                        student.address
                                    )}
                                </td>
                            </tr>
                            <tr>
                                <td className="border border-gray-300 p-2">Contact No</td>
                                <td className="border border-gray-300 p-2">
                                    {isEditing ? (
                                        <input
                                            type="text"
                                            name="contactNo"
                                            value={student.contactNo}
                                            onChange={handleChange}
                                            className="border border-gray-400 rounded p-1"
                                        />
                                    ) : (
                                        student.contactNo
                                    )}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <div className="mt-4 flex justify-center space-x-2">
                        <button
                            type="button"
                            onClick={() => setIsEditing((prev) => !prev)}
                            className="bg-blue-500 text-white rounded p-2"
                        >
                            {isEditing ? 'Cancel' : 'Edit'}
                        </button>
                        {isEditing && (
                            <button
                                type="submit"
                                className="bg-green-500 text-white rounded p-2"
                            >
                                Save
                            </button>
                        )}
                        <button
                            type="button"
                            onClick={handleDelete}
                            className="bg-red-500 text-white rounded p-2"
                        >
                            Delete Account
                        </button>
                    </div>
                </form>
            ) : (
                <p>No student data found.</p>
            )}
        </div>
    );
};

export default StudentPortal;
