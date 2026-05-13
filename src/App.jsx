import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Patient from "./pages/Patient";
import Physician from "./pages/Physician";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/patient" element={<Patient />} />
        <Route path="/physician" element={<Physician />} />
      </Routes>
    </Router>
  );
}

export default App;