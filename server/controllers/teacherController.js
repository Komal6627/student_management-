import bcrypt from 'bcrypt';
import Teacher from '../models/teacherModel.js'; 
import jwt from 'jsonwebtoken';

//Register
export const registerTeacher = async (req, res) => {
  const { name, contactNo, email, password } = req.body;

  try {

    const existingTeacher = await Teacher.findOne({ email });
    if (existingTeacher) {
      return res.status(400).json({ message: 'Teacher already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const teacher = new Teacher({
      name,
      contactNo,
      email,
      password: hashedPassword,
    });


    await teacher.save();

    const token = jwt.sign({ id: teacher._id, email: teacher.email }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    res.status(201).json({ message: 'Teacher registered successfully', token });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// Login 
export const loginTeacher = async (req, res) => {
  const { email, password } = req.body;

  try {
   
    const teacher = await Teacher.findOne({ email });
    if (!teacher) {
      return res.status(404).json({ message: 'Teacher not found' });
    }

    const isPasswordCorrect = await bcrypt.compare(password, teacher.password);
    if (!isPasswordCorrect) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: teacher._id, email: teacher.email }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    res.status(200).json({ message: 'Login successful', token });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

