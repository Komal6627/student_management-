import {BrowserRouter, Route, Routes} from "react-router-dom";
import Portals from "./pages/Portals";
import HomePage from "./pages/HomePage";
import Student from "./pages/Student";


function App() {
  return (
    <BrowserRouter>
      <Routes>
      <Route path="/" element = {<HomePage/>}/>
      <Route path="/portal" element={<Portals/>}/>
      <Route path="/student" element={<Student/>}/>
      </Routes>
    </BrowserRouter>
  );
}
      

export default App;
