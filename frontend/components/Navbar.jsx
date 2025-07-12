// components/Navbar.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
export default function Navbar() {
  const navigate = useNavigate();

  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <div className="flex items-center">
            <div className="w-2 h-2 bg-black rounded-full mr-2"></div>
            <span className="text-lg font-semibold text-gray-900">StackIt</span>
          </div>

          {/* Navigation Links */}
          <nav className="hidden md:flex space-x-8">
            <a href="#" className="text-gray-700 hover:text-gray-900">
              Home
            </a>
            <a href="#" className="text-gray-700 hover:text-gray-900">
              About
            </a>
            <a href="#" className="text-gray-700 hover:text-gray-900">
              Contact
            </a>
          </nav>

          {/* Buttons */}
          <div className="flex space-x-4">
            <button
              className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700"
              onClick={() => navigate("/auth")}
            >
              Log in
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
