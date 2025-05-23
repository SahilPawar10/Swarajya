import { RoundaboutLeftSharp } from "@mui/icons-material";
import Home from "./MainLayout/Home/Home";
import Mission from "./MainLayout/Abouts_us/OurMission/Mission";
import Program from "./MainLayout/Programs/Program";
import { Routes, Route } from "react-router-dom";
import About from "./MainLayout/Abouts_us/About_Us/About";
import Team from "./MainLayout/Abouts_us/Our_Team/Team";
import Belief from "./MainLayout/Abouts_us/Our_Belief/Belief";
import Jayanti from "./MainLayout/Our_Work/ShivJayanti/Jayanti";
import Health from "./MainLayout/Our_Work/Health/Health";
import Work from "./MainLayout/Our_Work/Work/Work";
import Get_Involved from "./MainLayout/Get_Involved/Get_Involved";
import Contribution from "./MainLayout/Pages/Contribution";
import Support from "./MainLayout/Pages/Support";
import Donation from "./MainLayout/Pages/Donation";
import FoundingStory from "./MainLayout/Pages/FoundingStory";
import Register from "./MainLayout/screens/Register/Register";
import Login from "./MainLayout/screens/Login/Login";
import AdminHome from "./AdminLayout/adminHome/AdminHome";
import Visitors from "./AdminLayout/Visitors/Visitors";
import Accounts from "./AdminLayout/Accounts/Accounts";
import Profile from "./AdminLayout/Profile/Profile";
import Forgot_Password from "./MainLayout/screens/Password_Reset/Forgot_Password";
import Reset_Password from "./MainLayout/screens/Password_Reset/Reset_Password";
import SendMai from "./MainLayout/Pages/SendMai";
import MyContacts from "./chat/MyContacts";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/mission" element={<Mission />} />
        <Route path="/about" element={<About />} />
        <Route path="/team" element={<Team />} />
        <Route path="/belief" element={<Belief />} />
        <Route path="/jayanti" element={<Jayanti />} />
        <Route path="/health" element={<Health />} />
        <Route path="/work" element={<Work />} />
        <Route path="/involve" element={<Get_Involved />} />
        <Route path="/highvalue" element={<Contribution />} />
        <Route path="/support" element={<Support />} />
        <Route path="/donation" element={<Donation />} />
        <Route path="/founding" element={<FoundingStory />} />
        <Route path="/sign-in" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin" element={<AdminHome />} />
        <Route path="/visitors" element={<Visitors />} />
        <Route path="/accounts" element={<Accounts />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/mail" element={<SendMai />} />
        <Route path="/mycontacts" element={<MyContacts />} />
        <Route path="/forgot_password" element={<Forgot_Password />} />
        <Route path="/reset_password/:token" element={<Reset_Password />} />
      </Routes>
    </div>
  );
}

export default App;
