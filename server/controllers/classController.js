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


export const createClass = async (req, res) => {
    try {
        const newClass = new Class(req.body);
        await newClass.save();
        res.status(201).json({ success: true, class: newClass });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

// Get all classes
export const getAllClasses = async (req, res) => {
  try {
      const classes = await Class.find().populate('teacher').populate('studentList');
      res.status(200).json({ success: true, classes });
  } catch (error) {
      res.status(400).json({ success: false, message: error.message });
  }
};

// Get a class by ID
export const getClassById = async (req, res) => {
  try {
      const classData = await Class.findById(req.params.id).populate('teacher').populate('studentList');
      if (!classData) return res.status(404).json({ success: false, message: 'Class not found' });
      res.status(200).json({ success: true, class: classData });
  } catch (error) {
      res.status(400).json({ success: false, message: error.message });
  }
};

// Update a class
export const updateClass = async (req, res) => {
  try {
      const updatedClass = await Class.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!updatedClass) return res.status(404).json({ success: false, message: 'Class not found' });
      res.status(200).json({ success: true, class: updatedClass });
  } catch (error) {
      res.status(400).json({ success: false, message: error.message });
  }
};

// Delete a class
export const deleteClass = async (req, res) => {
  try {
      const deletedClass = await Class.findByIdAndDelete(req.params.id);
      if (!deletedClass) return res.status(404).json({ success: false, message: 'Class not found' });
      res.status(200).json({ success: true, message: 'Class deleted successfully' });
  } catch (error) {
      res.status(400).json({ success: false, message: error.message });
  }
};
