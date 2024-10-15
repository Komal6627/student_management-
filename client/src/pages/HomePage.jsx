import React from 'react';
import { Link } from 'react-router-dom';
import Student from '../assets/student.png';

const Homepage = () => {
    return (
        <div className="flex justify-center items-center py-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <img src={Student} alt="students" className="w-full" />
                </div>
                <div className="p-2 px-5 h-full flex flex-col items-center justify-center">
                    <h1 className="text-5xl font-bold text-gray-800">
                        Welcome to  School
                       <br/>
                        Management  System
                        <br/>
                       
                    </h1>
                    <p className="mt-8 mb-8 text-gray-700">
                        Streamline school management, class organization, and add students and faculty.
                        Seamlessly track attendance, assess performance, and provide feedback.
                        Access records, view marks, and communicate effortlessly.
                    </p>
                    <div className="flex flex-col items-center gap-4 ">
                         <Link to="/portal" className="w-full">
                            <button className="bg-purple-500 text-white py-2 px-4 w-50% rounded">
                                Go to Portal
                            </button>
                        </Link>
                        
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Homepage;
