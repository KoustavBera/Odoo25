import { Route, Routes } from "react-router-dom";
import "./App.css";
import StackItHomepage from "./StackItHomepage.jsx";
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<StackItHomepage />} />
      </Routes>
    </>
  );
}

export default App;
