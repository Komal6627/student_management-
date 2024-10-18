import React, { useState } from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Portals from "./pages/Portals";
import HomePage from "./pages/HomePage";
import Student from "./pages/Student";
import Teacher from "./pages/Teacher";
import Admin from "./pages/Admin";
import RegistrationForm from "./components/RegistrationForm";
import LoginForm from "./components/LoginForm";
import StudentPortal from "./components/StudentPortal";
import ClassPortal from "./components/ClassPortal";
import TeacherPortal from "./components/TeacherPortal";
import StudentsProfile from "./components/StudentsProfile"; // Ensure the correct import
import MyComponent from './components/MyComponent';
import { toast, ToastContainer } from 'react-toastify';

function App() {
    const [studentData, setStudentData] = useState(null); // Initialize student data state

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/portal" element={<Portals />} />
                <Route path="/student-portal" element={<StudentPortal />} />
                <Route path="/teacher-portal" element={<TeacherPortal />} />
                <Route path="/admin-portal" element={<ClassPortal />} />
                <Route
                    path="/student-profile"
                    element={
                        <StudentsProfile/>
                    }
                />
                <Route path="/student" element={<Student />} />
                <Route path="/teacher" element={<Teacher />} />
                <Route path="/admin" element={<Admin />} />
                <Route path="/register" element={<RegistrationForm />} />
                <Route path="/login" element={<LoginForm />} />
            </Routes>
        </BrowserRouter>
        
    );
}

export default App;
