import { RoundaboutLeftSharp } from "@mui/icons-material";
import Home from "./MainLayout/Home/Home";
import Mission from "./MainLayout/Abouts_us/OurMission/Mission";
import Program from "./MainLayout/Programs/Program";
import { Router, Routes, Route } from "react-router-dom";
import Navbar from "./MainLayout/Navbar/Navbar";
import Footer from "./MainLayout/footer/Footer";
import About from "./MainLayout/Abouts_us/About_Us/About";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/mission" element={<Mission />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </div>
  );
}

export default App;
