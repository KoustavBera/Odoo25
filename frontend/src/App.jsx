import { Route, Routes } from "react-router-dom";
import "./App.css";
import StackItHomepage from "./StackItHomepage.jsx";
import AuthPages from "./pages/AuthPages.jsx";
import Navbar from "../components/Navbar.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import AddQuestion from "./pages/AddQuestion.jsx";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<StackItHomepage />} />
        <Route path="/auth" element={<AuthPages />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/ask" element={<AddQuestion />} />
      </Routes>
    </>
  );
}

export default App;
