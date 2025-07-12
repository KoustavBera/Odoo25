import { Route, Routes } from "react-router-dom";
import "./App.css";
import StackItHomepage from "./StackItHomepage.jsx";
import AuthPages from "./pages/AuthPages.jsx";
import Navbar from "../components/Navbar.jsx";
function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<StackItHomepage />} />
        <Route path="/auth" element={<AuthPages />} />
      </Routes>
    </>
  );
}

export default App;
