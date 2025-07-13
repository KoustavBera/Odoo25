import { Route, Routes } from "react-router-dom";
import "./App.css";
import StackItHomepage from "./StackItHomepage.jsx";
import AuthPages from "./pages/AuthPages.jsx";
import Navbar from "../components/Navbar.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import AddQuestion from "./pages/AddQuestion.jsx";
import QuestionDetail from "./pages/QuestionDetail.jsx"; // Add this import
import { useAuth } from "../context/AuthContext.jsx";
import AIChatbot from "../components/AIChatbot.jsx";

function App() {
  const { user } = useAuth();
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<StackItHomepage />} />
        <Route path="/auth" element={<AuthPages />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/ask" element={<AddQuestion />} />
        {/* Add this new route for individual questions */}
        <Route path="/questions/:id" element={<QuestionDetail />} />
      </Routes>
      {user && <AIChatbot />}
    </>
  );
}

export default App;
