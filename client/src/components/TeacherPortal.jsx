import React, { useState } from 'react';
import { useAuth } from '../context/TestAuthC';
import axios from 'axios';
import { toast } from 'react-toastify';

const TeacherPortal = () => {
    const { userInfo } = useAuth();
    const [teacher, setTeacher] = useState({
        name: userInfo?.teacher?.name || '',
        email: userInfo?.teacher?.email || '',
        gender: userInfo?.teacher?.gender || '',
        year: userInfo?.teacher?.year || '',
        dateOfBirth: userInfo?.teacher?.dateOfBirth || '',
        address: userInfo?.teacher?.address || '',
        contactNo: userInfo?.teacher?.contactNo || '',
    });
    const [isEditing, setIsEditing] = useState(false);

    const toastOptions = {
        position: 'bottom-right',
        autoClose: 5000,
        pauseOnHover: true,
        draggable: true,
        theme: 'dark',
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setTeacher((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const userId = JSON.parse(localStorage.getItem('user')).id; // Get the user ID
        console.log("teacher ID for update:", userId);
        
        if (userId) {
            try {
                const response = await axios.put(`http://localhost:5000/api/teacher/${userId}`, {
                    name: teacher.name,
                    email: teacher.email,
                    gender: teacher.gender,
                    year: teacher.year,
                    dateOfBirth: teacher.dateOfBirth,
                    address: teacher.address,
                    contactNo: teacher.contactNo,
                });

                if (response.data.success) {
                    toast.success('teacher information updated successfully', toastOptions);
                    setTeacher((prev) => ({ ...prev, ...response.data.teacher }));
                } else {
                    toast.error('Failed to update teacher information', toastOptions);
                }
            } catch (error) {
                console.error('Error updating teacher info:', error);
                toast.error('Error updating teacher information', toastOptions);
            }
        } else {
            console.error('No user ID found for update');
            toast.error('User ID not found', toastOptions);
        }
    };

    const handleDelete = async () => {
        const userId = JSON.parse(localStorage.getItem('user')).id; // Get the user ID
        
        if (userId) {
            const confirmDelete = window.confirm('Are you sure you want to delete your account? This action cannot be undone.');

            if (confirmDelete) {
                try {
                    const response = await axios.delete(`http://localhost:5000/api/teacher/${userId}`);

                    if (response.data.success) {
                        toast.success('teacher account deleted successfully', toastOptions);
                        // Optionally redirect to login or home page after deletion
                        // window.location.href = '/login'; // Uncomment to redirect to login
                    } else {
                        toast.error('Failed to delete teacher account', toastOptions);
                    }
                } catch (error) {
                    console.error('Error deleting teacher account:', error);
                    toast.error('Error deleting teacher account', toastOptions);
                }
            }
        } else {
            console.error('No user ID found for deletion');
            toast.error('User ID not found', toastOptions);
        }
    };

    return (
        <div className="flex flex-col items-center p-4">
            <h1 className="text-2xl font-bold text-blue-600 text-center">
                Welcome, {teacher.name || 'teacher'}
            </h1>
            {teacher ? (
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
                                            value={teacher.name}
                                            onChange={handleChange}
                                            className="border border-gray-400 rounded p-1"
                                        />
                                    ) : (
                                        teacher.name
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
                                            value={teacher.email}
                                            onChange={handleChange}
                                            className="border border-gray-400 rounded p-1"
                                        />
                                    ) : (
                                        teacher.email
                                    )}
                                </td>
                            </tr>
                            <tr>
                                <td className="border border-gray-300 p-2">Gender</td>
                                <td className="border border-gray-300 p-2">
                                    {isEditing ? (
                                        <select
                                            name="gender"
                                            value={teacher.gender}
                                            onChange={handleChange}
                                            className="border border-gray-400 rounded p-1"
                                        >
                                            <option value="" disabled>Select Gender</option>
                                            <option value="Male">Male</option>
                                            <option value="Female">Female</option>
                                            <option value="Other">Other</option>
                                        </select>
                                    ) : (
                                        teacher.gender
                                    )}
                                </td>
                            </tr>
                            <tr>
                                <td className="border border-gray-300 p-2">Year</td>
                                <td className="border border-gray-300 p-2">
                                    {isEditing ? (
                                        <input
                                            type="text"
                                            name="year"
                                            value={teacher.year}
                                            onChange={handleChange}
                                            className="border border-gray-400 rounded p-1"
                                        />
                                    ) : (
                                        teacher.year
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
                                            value={teacher.dateOfBirth ? teacher.dateOfBirth.split('T')[0] : ''}
                                            onChange={handleChange}
                                            className="border border-gray-400 rounded p-1"
                                        />
                                    ) : (
                                        teacher.dateOfBirth || 'N/A'
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
                                            value={teacher.address}
                                            onChange={handleChange}
                                            className="border border-gray-400 rounded p-1"
                                        />
                                    ) : (
                                        teacher.address
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
                                            value={teacher.contactNo}
                                            onChange={handleChange}
                                            className="border border-gray-400 rounded p-1"
                                        />
                                    ) : (
                                        teacher.contactNo
                                    )}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <div className="mt-4 flex justify-center space-x-2">
                        <button
                            type="button"
                            onClick={() => setIsEditing((prev) => !prev)}
                            className="bg-blue-500 text-white py-2 px-4 rounded"
                        >
                            {isEditing ? "Cancel" : "Edit"}
                        </button>
                        {isEditing && (
                            <button
                                type="submit"
                                className="bg-green-500 text-white py-2 px-4 rounded"
                            >
                                Save
                            </button>
                        )}
                    </div>
                </form>
            ) : (
                <p>No teacher data available.</p>
            )}
            <button
                onClick={handleDelete}
                className="mt-4 bg-red-500 text-white py-2 px-4 rounded"
            >
                Delete Account
            </button>
        </div>
    );
};

export default TeacherPortal;
