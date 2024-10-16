import bcrypt from 'bcrypt';
import Teacher from '../models/teacherModel.js'; 
import jwt from 'jsonwebtoken';


export const registerTeacher = async (req, res) => {
  const { name, gender, dateOfBirth, address, contactNo, email, password, salary } = req.body;

  try {

    const existingTeacher = await Teacher.findOne({ email });
    if (existingTeacher) {
      return res.status(400).json({ message: 'Teacher already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const teacher = new Teacher({
      name,
      gender,
      dateOfBirth,
      address,
      contactNo,
      email,
      password: hashedPassword,
      salary
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
