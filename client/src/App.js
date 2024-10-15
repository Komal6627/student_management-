import {BrowserRouter, Route, Routes} from "react-router-dom";
import Portals from "./pages/Portals";




function App() {
  return (
    <BrowserRouter>
      <Routes>
      <Route path="/" element={<Portals/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
