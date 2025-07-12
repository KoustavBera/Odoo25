// src/context/AuthContext.js
import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

// Create context
const AuthContext = createContext();

// Axios global config
axios.defaults.withCredentials = true;
axios.defaults.baseURL = "http://localhost:8000/api"; // adjust if needed

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // User info from backend
  const [loading, setLoading] = useState(true); // For initial auth check

  // 🧠 Auto-fetch user on app load
  const fetchUser = async () => {
    try {
      const res = await axios.get("/auth/me"); // You’ll create this route
      setUser(res.data.user);
    } catch (err) {
      setUser(null); // Not logged in
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  // 🚀 Login
  const login = async (email, password) => {
    const res = await axios.post("/auth/login", { email, password });
    setUser(res.data.result);
  };

  // 🆕 Signup
  const signup = async ({ name, email, password }) => {
    const res = await axios.post("/auth/signup", {
      name,
      email,
      password,
    });
    setUser(res.data.result);
  };

  // 🚪 Logout
  const logout = async () => {
    await axios.post("/auth/logout");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook to use AuthContext
export const useAuth = () => useContext(AuthContext);
