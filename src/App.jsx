import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar.jsx";
import Home from "./pages/Home/Home.jsx";
import Problems from "./pages/Problems/Problems.jsx";
import Practice from "./pages/Practice/Practice.jsx";
import Profile from "./pages/Profile/Profile.jsx";
import LandingPage from "./pages/LandingPage/LandingPage.jsx";
import "./App.css";

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/problems" element={<Problems />} />
        <Route path="/practice" element={<Practice />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </BrowserRouter>
  );
}
