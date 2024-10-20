import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext.js'; // Assuming this handles authentication
import axios from 'axios';
import { toast } from 'react-toastify';

const TeacherPortal = () => {
    const { userInfo } = useAuth();

    console.log("UserInfo", userInfo);

    const [teacher, setTeacher] = useState({
        name:  '',
        email: '',
        gender: '',
        subjects: '', // Teacher-specific field for subjects
        dateOfBirth: '',
        address: '',
        contactNo: '',
    });

    const [isEditing, setIsEditing] = useState(false);

    const toastOptions = {
        position: 'bottom-right',
        autoClose: 5000,
        pauseOnHover: true,
        draggable: true,
        theme: 'dark',
    };

    useEffect(() => {
        if (userInfo) {
            setTeacher({
                name: userInfo.name || '',
                email: userInfo.email || '',
                gender: userInfo.gender || '',
                subjects: userInfo.subjects || '', // Pre-populate with teacher's subjects
                dateOfBirth: userInfo.dateOfBirth || '',
                address: userInfo.address || '',
                contactNo: userInfo.contactNo || '',
            });
        }
    }, [userInfo]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setTeacher((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const userId = JSON.parse(localStorage.getItem('user'))?.id;

        if (userId) {
            try {
                const response = await axios.put(`http://localhost:5000/api/teacher/${userId}`, {
                    name: teacher.name,
                    email: teacher.email,
                    gender: teacher.gender,
                    subjects: teacher.subjects, // Include subjects in update
                    dateOfBirth: teacher.dateOfBirth,
                    address: teacher.address,
                    contactNo: teacher.contactNo,
                });

                if (response.data.success) {
                    toast.success('Teacher information updated successfully', toastOptions);
                    setTeacher((prev) => ({ ...prev, ...response.data.teacher }));
                } else {
                    toast.error('Failed to update teacher information', toastOptions);
                }
            } catch (error) {
                console.error('Error updating teacher info:', error.response?.data || error.message);
                toast.error(`Error updating teacher information: ${error.response?.data?.message || error.message}`, toastOptions);
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
                    const response = await axios.delete(`http://localhost:5000/api/teacher/${userId}`);

                    if (response.data.success) {
                        toast.success('Teacher account deleted successfully', toastOptions);
                        window.location.href = '/login'; // Redirect to login after deletion
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

    if (!userInfo) {
        return <div>Loading...</div>;
    }

    return (
        <div className="flex flex-col items-center p-4">
            <h1 className="text-2xl font-bold text-blue-600 text-center">
                Welcome, {teacher.name || 'Teacher'}
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
                            <tr>
                                <td className="border border-gray-300 p-2">Subjects</td>
                                <td className="border border-gray-300 p-2">
                                    {isEditing ? (
                                        <input
                                            type="text"
                                            name="subjects"
                                            value={teacher.subjects}
                                            onChange={handleChange}
                                            className="border border-gray-400 rounded p-1"
                                        />
                                    ) : (
                                        teacher.subjects || 'N/A'
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
                <p>No teacher data found.</p>
            )}
        </div>
    );
};

export default TeacherPortal;
