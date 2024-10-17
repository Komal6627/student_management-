import {BrowserRouter, Route, Routes} from "react-router-dom";
import Portals from "./pages/Portals";
import HomePage from "./pages/HomePage";
import Student from "./pages/Student";
import Register from "./components/Register";
import RegisterForm from "./components/RegistrationForm";
import Teacher from "./pages/Teacher";
import Admin from "./pages/Admin";
import RegistrationForm from "./components/RegistrationForm";
import LoginForm from "./components/LoginForm";
import StudentPortal from "./components/StudentPortal";


function App() {
  return (
    <BrowserRouter>
      <Routes>
      <Route path="/" element = {<HomePage/>}/>
      <Route path="/portal" element={<Portals/>}/>
      <Route path="/student" element={<Student/>}/>
      <Route path="/student-portal" element={<StudentPortal/>}/>
      <Route path="/teacher" element={<Teacher/>}/>
      <Route path="/admin" element={<Admin/>}/>
      <Route path="/register" element={<RegistrationForm/>}/>
      <Route path="/login" element={<LoginForm/>}/>
      
      </Routes>
    </BrowserRouter>
  );
}
      

export default App;
