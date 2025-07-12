// components/Navbar.jsx
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";

export default function Navbar() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    try {
      logout();
      toast.success("Logged out successfully");
      navigate("/");
    } catch (err) {
      toast.error("Logout failed");
      console.error(err);
    }
  };

  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <div className="flex items-center" onClick={() => navigate("/")}>
            <div className="w-2 h-2 bg-black rounded-full mr-2"></div>
            <span className="text-lg font-semibold text-gray-900">StackIt</span>
          </div>

          {/* Navigation Links */}
          <nav className="hidden md:flex space-x-8">
            <Link
              to={"/dashboard"}
              className="text-gray-700 hover:text-gray-900"
            >
              Home
            </Link>
            <Link href="#" className="text-gray-700 hover:text-gray-900">
              About
            </Link>
            <Link href="#" className="text-gray-700 hover:text-gray-900">
              Contact
            </Link>
          </nav>

          {/* Auth Buttons */}
          <div className="flex items-center space-x-4">
            {!user ? (
              <button
                className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700"
                onClick={() => navigate("/auth")}
              >
                Log In
              </button>
            ) : (
              <>
                <span className="text-sm text-gray-800 font-medium">
                  {user?.name.split(" ")[0]}
                </span>
                <button
                  className="bg-red-500 text-white px-3 py-1.5 rounded-md text-sm font-medium hover:bg-red-600 transition-colors"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
