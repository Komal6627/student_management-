import jwt from 'jsonwebtoken';
import Student from '../models/studentModel.js'; // Ensure this imports your Student model

const authMiddleware = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1]; // Extract token from Authorization header
        if (!token) {
            return res.status(401).json({ success: false, message: 'No token provided' });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET); // Replace with your JWT secret
        req.user = await Student.findById(decoded.id); // Get student data from the database
        next();
    } catch (error) {
        res.status(401).json({ success: false, message: 'Invalid token' });
    }
};

export default authMiddleware;
