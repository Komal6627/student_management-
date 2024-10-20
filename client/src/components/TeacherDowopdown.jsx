import React, { useEffect, useState } from 'react';
import axios from 'axios';

const TeacherDropdown = ({ onSelectTeacher }) => {
  const [teachers, setTeachers] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        const response = await axios.get('hhttps://student-management-he5k.onrender.com/api/teacher');
        setTeachers(response.data);
      } catch (error) {
        setError('Error fetching teachers. Please try again later.');
      }
    };

    fetchTeachers();
  }, []);

  return (
    <div>
      <label htmlFor="teacher-select">Assign Teacher:</label>
      <select
        id="teacher-select"
        onChange={(e) => onSelectTeacher(e.target.value)}
        className="border px-2 py-1 w-full"
        required
      >
        <option value="">Select Teacher</option>
        {teachers.length > 0 ? (
          teachers.map(teacher => (
            <option key={teacher._id} value={teacher._id}>
              {teacher.name}
            </option>
          ))
        ) : (
          <option disabled>No teachers available</option>
        )}
      </select>
      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
};

export default TeacherDropdown;
