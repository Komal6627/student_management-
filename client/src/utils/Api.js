import axios from "axios";
import { getStudentProfileRoute, createStudentProfileRoute, updateStudentProfileRoute} from "./APIRoute";

export const getStudentProfile = async (studentId) => {
    try {
        const response = await axios.get(`${getStudentProfileRoute}${studentId}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const createStudentProfile = async (formData) => {
    try {
        const response = await axios.post(createStudentProfileRoute, formData);
        return response.data;
    } catch (error) {
        throw error;
    }
};

// Function to update an existing student profile
export const updateStudentProfile = async (studentId, formData) => {
    try {
        const response = await axios.put(`${updateStudentProfileRoute.replace(':id', studentId)}`, formData);
        return response.data;
    } catch (error) {
        throw error;
    }
};