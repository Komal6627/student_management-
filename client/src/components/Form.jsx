import React, { useState } from 'react';
import axios from 'axios';
import { registerStudentRoute, registerTeacherRoute } from '../utils/APIRoute';

const DynamicForm = ({ model }) => {
    const [formData, setFormData] = useState({});

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await handleFormSubmit(formData, model);
    };

    const handleFormSubmit = async (formData, model) => {
        try {
            let endpoint = '';
            // if (model === 'Class') endpoint = '/api/classes';
            if (model === 'Teacher') endpoint = registerTeacherRoute;
            if (model === 'Student') endpoint = registerStudentRoute;

            const response = await axios.post(endpoint, formData);
            console.log('Data submitted successfully:', response.data);
        } catch (error) {
            console.error('Error submitting form:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            {model === 'Class' && (
                <>
                    <input
                        name="className"
                        placeholder="Class Name"
                        onChange={handleChange}
                    />
                    <input
                        name="year"
                        placeholder="Year"
                        onChange={handleChange}
                    />
                </>
            )}

            {model === 'Teacher' && (
                <>
                    <input
                        name="teacherName"
                        placeholder="Teacher Name"
                        onChange={handleChange}
                    />
                    <input
                        name="contactDetails"
                        placeholder="Contact Details"
                        onChange={handleChange}
                    />
                </>
            )}

            {model === 'Student' && (
                <>
                    <input
                        name="studentName"
                        placeholder="Student Name"
                        onChange={handleChange}
                    />
                    <input
                        name="feesPaid"
                        placeholder="Fees Paid"
                        onChange={handleChange}
                    />
                </>
            )}

            <button type="submit">Submit</button>
        </form>
    );
};

export default DynamicForm;









//env

// PORT=5000

// MONGO_URL= mongodb+srv://kmongo321:wXGHycb1kXm4O3zZ@cluster0.nxyqu.mongodb.net/school_db?retryWrites=true&w=majority&appName=Cluster0

// JWT_SECRET=  86e0ead75b470edbd122ebb6e42341715fc0a856cad4a23e0bee2a0022ed7318