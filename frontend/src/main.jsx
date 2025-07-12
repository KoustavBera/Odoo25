import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { AuthProvider } from "../context/AuthContext.jsx";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast"; // ✅ Don't forget this import!

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <AuthProvider>
      <Toaster position="top-center" reverseOrder={false} />{" "}
      {/* ✅ Toast rendered once here */}
      <App />
    </AuthProvider>
  </BrowserRouter>
);
