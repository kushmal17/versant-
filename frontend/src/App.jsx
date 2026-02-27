import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Overview from "./pages/Overview";
import SpeakingTips from "./pages/SpeakingTips";
import Sample from "./pages/Sample";

import PartAIntro from "./pages/PartAIntro";
import PartA from "./pages/PartA";

import PartBIntro from "./pages/PartBIntro";
import PartB from "./pages/PartB";

import PartCIntro from "./pages/PartCIntro";
import PartC from "./pages/PartC";

import PartDIntro from "./pages/PartDIntro";
import PartD from "./pages/PartD";

import PartEIntro from "./pages/PartEIntro";
import PartE from "./pages/PartE";

import PartFIntro from "./pages/PartFIntro";
import PartF from "./pages/PartF";

import Complete from "./pages/Complete";

function App() {
  return (
    <BrowserRouter>
      <div className="app-container">

        <Navbar />

        <div className="page-content">
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/overview" element={<Overview />} />
            <Route path="/speaking-tips" element={<SpeakingTips />} />
            <Route path="/sample" element={<Sample />} />

            <Route path="/part-A-intro" element={<PartAIntro />} />
            <Route path="/part-a" element={<PartA />} />

            <Route path="/part-B-intro" element={<PartBIntro />} />
            <Route path="/part-b" element={<PartB />} />

            <Route path="/part-C-intro" element={<PartCIntro />} />
            <Route path="/part-c" element={<PartC />} />

            <Route path="/part-D-intro" element={<PartDIntro />} />
            <Route path="/part-d" element={<PartD />} />

            <Route path="/part-E-intro" element={<PartEIntro />} />
            <Route path="/part-e" element={<PartE />} />

            <Route path="/part-F-intro" element={<PartFIntro />} />
            <Route path="/part-f" element={<PartF />} />
            
            <Route path="/completion-page" element={<Complete />} />

          </Routes>
        </div>

        <Footer />

      </div>
    </BrowserRouter>
  );
}

export default App;
