import Admin from "../models/adminModel.js"
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import Class from "../models/classModel.js";

// Register 
export const registerAdmin = async (req, res) => {
  const { name, contactNo, email, password } = req.body;

  try {
    
    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      return res.status(400).json({ message: 'Admin already exists' });
    }

 
    const hashedPassword = await bcrypt.hash(password, 10);

  

    const admin = new Admin({
      name,
      contactNo,
      email,
      password: hashedPassword,
    });

    
    await admin.save();

    
    const token = jwt.sign({ id: admin._id, email: admin.email }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    res.status(201).json({ message: 'Admin registered successfully', token });
  } catch (error) {
    console.error('Registration Error:', error);
    res.status(500).json({ message: 'Server error', error });
  }
};

// Login Admin
export const loginAdmin = async (req, res) => {
  const { email, password } = req.body;

  try {
    
    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(404).json({ message: 'Admin not found' });
    }

  
    const isPasswordCorrect = await bcrypt.compare(password, admin.password);
    if (!isPasswordCorrect) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }


    const token = jwt.sign({ id: admin._id, email: admin.email }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    res.status(200).json({ message: 'Login successful', token });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};



// Create a new class
export const createClass = async (req, res) => {
  const { className, year, teacher, studentFees, studentList } = req.body;
  try {
    const newClass = new Class({
      className,
      year,
      teacher,
      studentFees,
      studentList
    });
    const savedClass = await newClass.save();
    res.status(201).json(savedClass);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// READ all classes
export const getClasses = async (req, res) => {
  try {
    const classes = await Class.find().populate('teacher').populate('studentList');
    res.status(200).json(classes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// READ a single class by ID
export const getClassById = async (req, res) => {
  const { id } = req.params;
  try {
    const classData = await Class.findById(id).populate('teacher').populate('studentList');
    if (!classData) {
      return res.status(404).json({ message: 'Class not found' });
    }
    res.status(200).json(classData);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// UPDATE an existing class by ID
export const updateClass = async (req, res) => {
  const { id } = req.params;
  const { className, year, teacher, studentFees, studentList } = req.body;

  try {
    const updatedClass = await Class.findByIdAndUpdate(
      id,
      { className, year, teacher, studentFees, studentList },
      { new: true, runValidators: true }
    );

    if (!updatedClass) {
      return res.status(404).json({ message: 'Class not found' });
    }

    res.status(200).json(updatedClass);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// DELETE a class by ID
export const deleteClass = async (req, res) => {
  const { id } = req.params;
  
  try {
    const deletedClass = await Class.findByIdAndDelete(id);
    if (!deletedClass) {
      return res.status(404).json({ message: 'Class not found' });
    }
    res.status(200).json({ message: 'Class deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
