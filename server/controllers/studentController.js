import bcrypt from 'bcrypt';
import Student from '../models/studentModel.js'; 
import jwt from 'jsonwebtoken';


// Register Student
export const registerStudent = async (req, res) => {
  const { name, contactNo, email, gender, dateOfBirth,address, password } = req.body;

  try {
    const existingStudent = await Student.findOne({ email });
    if (existingStudent) {
      return res.status(400).json({ message: 'Student already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const student = new Student({name, contactNo, email,gender, dateOfBirth, address,
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

        // Include student data in the response
        res.status(200).json({
            message: 'Login successful',
            token, // Use the token generated
            user: {
                id: student._id, // Include student ID
                email: student.email,
                type: student.type, // Ensure this field exists
                name : student.name,
                contactNo : student.contactNo,
                 gender: student.gender,
                dateOfBirth: student.dateOfBirth,
                address : student.address
            },
        });
    } catch (error) {
        console.error('Error during login:', error, { email }); // Log with context
        res.status(500).json({ message: 'Server error', error });
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

export const deleteStudentByName = async (req, res) => {
    try {
        const name = req.params.name.trim();
        console.log("Deleting student(s) with name:", name);

        // Explicitly search by the name field, not _id
        const deletedStudents = await Student.deleteMany({ name: name });

        // Check if any students were deleted
        if (deletedStudents.deletedCount === 0) {
            return res.status(404).json({ success: false, message: 'Student not found' });
        }

        // Successfully deleted
        res.status(200).json({
            success: true,
            message: `${deletedStudents.deletedCount} student(s) deleted successfully`
        });
    } catch (error) {
        // Log the error and return
        console.error('Error deleting student by name:', error);
        res.status(400).json({ success: false, message: error.message });
    }
};
