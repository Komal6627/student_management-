import {BrowserRouter, Route, Routes} from "react-router-dom";
import Portals from "./pages/Portals";
import HomePage from "./pages/HomePage";
import Student from "./pages/Student";
import Register from "./components/Register";
import Regist from "./components/Dynamic";


function App() {
  return (
    <BrowserRouter>
      <Routes>
      <Route path="/" element = {<HomePage/>}/>
      <Route path="/portal" element={<Portals/>}/>
      <Route path="/student" element={<Student/>}/>
      <Route path="/register" element={<Register/>}/>
      <Route path="/form" element={<Regist/>}/>
      
      </Routes>
    </BrowserRouter>
  );
}
      

export default App;
