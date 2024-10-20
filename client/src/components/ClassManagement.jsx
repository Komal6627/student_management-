import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import TeacherDropdown from "./TeacherDowopdown"; // Correct import here

const ClassManagement = () => {
  const [teachers, setTeachers] = useState([]);
  const [classes, setClasses] = useState([]);
  const [className, setClassName] = useState("");
  const [year, setYear] = useState("");
  const [studentFees, setStudentFees] = useState("");
  const [teacherId, setTeacherId] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/teacher");
        console.log("Fetched teachers:", response.data); // Check API response
        setTeachers(response.data.teachers || []); // Ensure this matches your API response structure
      } catch (error) {
        setError("Error fetching teachers. Please try again later.");
        console.error("Error fetching teachers:", error);
      }
    };

    const fetchClasses = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/class");
        console.log("Fetched classes:", response.data); // Check API response
        setClasses(response.data.classes || []);
      } catch (error) {
        setError("Error fetching classes. Please try again later.");
        console.error("Error fetching classes:", error);
      }
    };

    fetchTeachers();
    fetchClasses();
  }, []);

  const handleAddClass = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/api/class/create",
        {
          className,
          year: Number(year),
          studentFees: Number(studentFees),
          teacher: teacherId,
        }
      );

      if (response.status === 201) {
        const newClass = response.data; // Assuming the newly created class is returned
        setClasses([...classes, newClass]);
        setClassName("");
        setYear("");
        setStudentFees("");
        setTeacherId(""); // Reset teacherId here
      } else {
        throw new Error("Failed to add class");
      }
    } catch (error) {
      setError("Error adding class. Please try again later.");
      console.error("Error adding class:", error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <header className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold">Class Management</h2>
        <Link to="/" className="bg-blue-500 text-white px-4 py-2 rounded">
          Home
        </Link>
      </header>

      {error && <div className="text-red-500 mb-4">{error}</div>}

      <form
        onSubmit={handleAddClass}
        className="mb-4 p-4 bg-gray-100 rounded-lg"
      >
        <h3 className="text-xl font-semibold mb-2">Add New Class</h3>
        <div className="mb-4">
          <label className="block mb-1">Class Name</label>
          <input
            type="text"
            value={className}
            onChange={(e) => setClassName(e.target.value)}
            required
            className="border px-2 py-1 w-full"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1">Year</label>
          <input
            type="number"
            value={year}
            onChange={(e) => setYear(e.target.value)}
            required
            className="border px-2 py-1 w-full"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1">Student Fees</label>
          <input
            type="number"
            value={studentFees}
            onChange={(e) => setStudentFees(e.target.value)}
            required
            className="border px-2 py-1 w-full"
          />
        </div>
        <div className="mb-4">
          <TeacherDropdown teachers={teachers} onSelectTeacher={setTeacherId} />
        </div>
        <button
          type="submit"
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          Add Class
        </button>
      </form>

      <div className="bg-gray-100 p-4 rounded-lg">
        <h3 className="text-xl font-semibold mb-2">Existing Classes</h3>
        <table className="min-w-full mt-2">
          <thead>
            <tr className="bg-gray-200">
              <th className="px-4 py-2">Class Name</th>
              <th className="px-4 py-2">Year</th>
              <th className="px-4 py-2">Student Fees</th>
              <th className="px-4 py-2">Teacher</th>
              <th className="px-4 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {classes.length > 0 ? (
              classes.map((classItem) => (
                <tr key={classItem._id}>
                  <td className="border px-4 py-2">{classItem.className}</td>
                  <td className="border px-4 py-2">{classItem.year}</td>
                  <td className="border px-4 py-2">
                    {classItem.studentFees} Rs
                  </td>

                  <td className="border px-4 py-2">
                    {(() => {
                      const foundTeacher = teachers.find(
                        (teacher) => teacher._id === classItem.teacher
                      );
                      console.log("Found Teacher:", foundTeacher); // Debug log to check what is being found
                      return foundTeacher ? foundTeacher.name : "N/A";
                    })()}
                  </td>

                  <td className="border px-4 py-2">
                    <Link
                      to={`/class-analytics/${classItem._id}`}
                      className="text-blue-500"
                    >
                      View Analytics
                    </Link>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="border px-4 py-2 text-center">
                  No classes available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ClassManagement;
