import Admin from "../models/adminModel.js"
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

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
