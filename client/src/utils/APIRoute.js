import axios from "axios";

const host = "http://localhost:5000";
export const  registerTeacherRoute = `${host}/api/teacher/register`;
export const loginTeacherRoute = `${host}/api/teacher/login`;
export const  registerStudentRoute = `${host}/api/student/register`;
export const loginStudentRoute = `${host}/api/student/login`;
export const  registerAdminRoute = `${host}/api/class/register`
export const  loginAdminRoute = `${host}/"/api/class"/login`
export const getStudentProfileRoute = `${host}/api/student/:id`;
export const updateStudentProfileRoute = `${host}/api/student/:id`;
export const getTeacherProfileRoute = `${host}/api/teacher/:id`;
export const updateTeacherProfileRoute = `${host}/api/teacher/:id`;




