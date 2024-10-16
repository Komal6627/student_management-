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
