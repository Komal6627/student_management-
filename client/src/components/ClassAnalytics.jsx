import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const ClassAnalytics = () => {
  const { classId } = useParams(); // Get classId from URL params
  const [classData, setClassData] = useState(null); // Initialize as null
  const [students, setStudents] = useState([]); // Initialize as empty array
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchClassAnalytics = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/class/${classId}`);
        console.log('Fetched class data:', response.data); // Log for debugging

        if (response.data.success) {
          console.log('Setting class data:', response.data.class);
          setClassData(response.data.class);
          console.log('Setting students data:', response.data.students);
          setStudents(response.data.students || []);
        } else {
          setError('No class data found.');
        }
      } catch (error) {
        setError('Error fetching class analytics. Please try again later.');
        console.error('Error fetching class analytics:', error);
      }
    };

    fetchClassAnalytics();
  }, [classId]);

  const maleCount = students.filter(student => student.gender === 'Male').length;
  const femaleCount = students.filter(student => student.gender === 'Female').length;

  if (!classData) {
    return (
      <div className="container mx-auto p-4">
        {error ? (
          <div className="text-red-500 mb-4">{error}</div>
        ) : (
          <div>Loading class analytics...</div>
        )}
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-semibold">Class Analytics</h2>

      <div className="bg-gray-100 p-4 rounded-lg mb-4">
        <h3 className="text-xl font-semibold">Class Details</h3>
        <p><strong>Class Name:</strong> {classData.className || 'Not Assigned'}</p>
        <p><strong>Year:</strong> {classData.year || 'Not Assigned'}</p>
        <p><strong>Teacher:</strong> {classData.teacher ? classData.teacher.name : 'Not Assigned'}</p>
        <p><strong>Student Fees:</strong> Rs {classData.studentFees || 0}</p>
        <p><strong>Total Students:</strong> {students.length || 0}</p>
        <p><strong>Male vs Female Students:</strong> {maleCount} Male, {femaleCount} Female</p>
      </div>

      <div className="bg-gray-100 p-4 rounded-lg">
        <h3 className="text-xl font-semibold">Students</h3>
        {students.length > 0 ? (
          <ul className="list-disc pl-5">
            {students.map((student) => (
              <li key={student._id}>
                {student.name} - {student.gender || 'Not Specified'}
              </li>
            ))}
          </ul>
        ) : (
          <p>No students found for this class.</p>
        )}
      </div>
    </div>
  );
};

export default ClassAnalytics;
