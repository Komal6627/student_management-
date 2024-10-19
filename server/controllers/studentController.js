import bcrypt from 'bcrypt';
import Student from '../models/studentModel.js'; 
import jwt from 'jsonwebtoken';


// Register Student
export const registerStudent = async (req, res) => {
  const { name, contactNo, email, password } = req.body;

  try {
    const existingStudent = await Student.findOne({ email });
    if (existingStudent) {
      return res.status(400).json({ message: 'Student already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const student = new Student({
      name,
      contactNo,
      email,
      password: hashedPassword,
    });

    await student.save();

    const token = jwt.sign({ id: student._id, email: student.email }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    res.status(201).json({ message: 'Student registered successfully', token });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// Login Student
export const loginStudent = async (req, res) => {
  const { email, password } = req.body;

  try {
    const student = await Student.findOne({ email });
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }

    const isPasswordCorrect = await bcrypt.compare(password, student.password);
    if (!isPasswordCorrect) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: student._id, email: student.email }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    res.status(200).json({ message: 'Login successful', token });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};


// Create a new student
// export const createStudent = async (req, res) => {
//     try {
//         const newStudent = new Student(req.body);
//         await newStudent.save();
//         res.status(201).json({ success: true, student: newStudent });
//     } catch (error) {
//         res.status(400).json({ success: false, message: error.message });
//     }
// };

export const createStudentProfile = async (req, res) => {
  try {
      // Use req.user from the auth middleware to ensure it's the logged-in student
      if (!req.user) {
          return res.status(403).json({ success: false, message: 'You are not authorized to create a profile.' });
      }

      const profileData = {
          name: req.body.name,
          gender: req.body.gender,
          year: req.body.year,
          dateOfBirth: req.body.dateOfBirth,
          address: req.body.address,
          email: req.body.email,
          contactNo: req.body.contactNo,
          feesPaid: req.body.feesPaid,
          studentId: req.user._id, // Link the profile to the logged-in student
      };

      const newStudentProfile = new Student(profileData);
      await newStudentProfile.save();
      res.status(201).json({ success: true, studentProfile: newStudentProfile });
  } catch (error) {
      res.status(400).json({ success: false, message: error.message });
  }
};


// Get all students
export const getAllStudents = async (req, res) => {
    try {
        const students = await Student.find();
        res.status(200).json({ success: true, students });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

// Get a student by ID
export const getStudentById = async (req, res) => {
    try {
        const studentData = await Student.findById(req.params.id);
        if (!studentData) return res.status(404).json({ success: false, message: 'Student not found' });
        res.status(200).json({ success: true, student: studentData });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

// Update a student
export const updateStudent = async (req, res) => {
    try {
        const updatedStudent = await Student.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedStudent) return res.status(404).json({ success: false, message: 'Student not found' });
        res.status(200).json({ success: true, student: updatedStudent });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

// Delete a student
export const deleteStudent = async (req, res) => {
    try {
        const deletedStudent = await Student.findByIdAndDelete(req.params.id);
        if (!deletedStudent) return res.status(404).json({ success: false, message: 'Student not found' });
        res.status(200).json({ success: true, message: 'Student deleted successfully' });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};
