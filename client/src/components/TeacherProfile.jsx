// src/components/TeacherProfile.js
import React, { useEffect, useState } from 'react';
import { getTeacherProfile, createTeacherProfile, updateTeacherProfile } from '../api';

const TeacherProfile = ({ teacherId }) => {
    const [teacher, setTeacher] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        gender: '',
        contactNo: '',
        salary: '',
        dateOfBirth: '',
        address: '',
        email: '',
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getTeacherProfile(teacherId);
                setTeacher(response.data);
                setFormData({
                    name: response.data.name,
                    gender: response.data.gender,
                    contactNo: response.data.contactNo,
                    salary: response.data.salary,
                    dateOfBirth: response.data.dateOfBirth,
                    address: response.data.address,
                    email: response.data.email,
                });
            } catch (error) {
                console.error('Error fetching teacher profile:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [teacherId]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (teacher) {
                // Update existing profile
                const response = await updateTeacherProfile(teacherId, formData);
                setTeacher(response.data);
            } else {
                // Create new profile
                const response = await createTeacherProfile(formData);
                setTeacher(response.data);
            }
            setIsEditing(false); // Close the form
        } catch (error) {
            console.error('Error saving teacher profile:', error);
        }
    };

    if (loading) return <p>Loading...</p>;

    return (
        <div className="p-4">
            <h1 className="text-xl font-bold">Teacher Profile</h1>
            {isEditing ? (
                <form onSubmit={handleSubmit}>
                    <input
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Name"
                        required
                        className="border p-2 mt-2"
                    />
                    <select
                        name="gender"
                        value={formData.gender}
                        onChange={handleChange}
                        className="border p-2 mt-2"
                    >
                        <option value="" disabled>Select Gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                    </select>
                    <input
                        name="contactNo"
                        value={formData.contactNo}
                        onChange={handleChange}
                        placeholder="Contact No"
                        required
                        className="border p-2 mt-2"
                    />
                    <input
                        name="salary"
                        value={formData.salary}
                        onChange={handleChange}
                        placeholder="Salary"
                        required
                        className="border p-2 mt-2"
                    />
                    <input
                        name="dateOfBirth"
                        type="date"
                        value={formData.dateOfBirth}
                        onChange={handleChange}
                        className="border p-2 mt-2"
                    />
                    <input
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        placeholder="Address"
                        className="border p-2 mt-2"
                    />
                    <input
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Email"
                        required
                        type="email"
                        className="border p-2 mt-2"
                    />
                    <button type="submit" className="bg-blue-500 text-white p-2 mt-4">
                        Save Profile
                    </button>
                </form>
            ) : (
                <>
                    {teacher ? (
                        <div className="mt-4">
                            <p><strong>Name:</strong> {teacher.name}</p>
                            <p><strong>Gender:</strong> {teacher.gender}</p>
                            <p><strong>Contact No:</strong> {teacher.contactNo}</p>
                            <p><strong>Salary:</strong> {teacher.salary}</p>
                            <p><strong>Date of Birth:</strong> {new Date(teacher.dateOfBirth).toLocaleDateString()}</p>
                            <p><strong>Address:</strong> {teacher.address}</p>
                            <p><strong>Email:</strong> {teacher.email}</p>
                            <button onClick={() => setIsEditing(true)} className="bg-yellow-500 text-white p-2 mt-4">
                                Edit Profile
                            </button>
                        </div>
                    ) : (
                        <div>
                            <p>No profile found. Please create a profile.</p>
                            <button onClick={() => setIsEditing(true)} className="bg-green-500 text-white p-2 mt-4">
                                Create Profile
                            </button>
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

export default TeacherProfile;
