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



// Create a new teacher
export const createTeacher = async (req, res) => {
    try {
        const newTeacher = new Teacher(req.body);
        await newTeacher.save();
        res.status(201).json(newTeacher);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Get all teachers
export const getTeachers = async (req, res) => {
    try {
        const teachers = await Teacher.find().populate('assignedClass');
        res.status(200).json(teachers);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Get a teacher by ID
export const getTeacherById = async (req, res) => {
    try {
        const teacher = await Teacher.findById(req.params.id).populate('assignedClass');
        if (!teacher) return res.status(404).json({ error: 'Teacher not found' });
        res.status(200).json(teacher);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Update a teacher
export const updateTeacher = async (req, res) => {
    try {
        const updatedTeacher = await Teacher.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedTeacher) return res.status(404).json({ error: 'Teacher not found' });
        res.status(200).json(updatedTeacher);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Delete a teacher
export const deleteTeacher = async (req, res) => {
    try {
        const deletedTeacher = await Teacher.findByIdAndDelete(req.params.id);
        if (!deletedTeacher) return res.status(404).json({ error: 'Teacher not found' });
        res.status(200).json({ message: 'Teacher deleted successfully' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const assignClassToTeacher = async (req, res) => {
  const { classId } = req.body; 
  try {
      const teacher = await Teacher.findByIdAndUpdate(
          req.params.id,
          { assignedClass: classId },
          { new: true } 
      ).populate('assignedClass');

      if (!teacher) return res.status(404).json({ error: 'Teacher not found' });

      res.status(200).json(teacher);
  } catch (error) {
      res.status(400).json({ error: error.message });
  }
};

