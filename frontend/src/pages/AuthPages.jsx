import React, { useState } from "react";
import { Eye, EyeOff, User, Mail, Lock, CircleChevronLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useAuth } from "../../context/AuthContext";

export default function AuthPages() {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    name: "",
  });
  const { login, signup } = useAuth();
  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isLogin) {
      // 🔄 Use toast.promise for login
      await toast.promise(login(formData.email, formData.password), {
        loading: "Logging in...",
        success: "Logged in successfully!",
        error: "Login failed. Please check your credentials.",
      });
      navigate("/dashboard");
    } else {
      if (formData.password !== formData.confirmPassword) {
        return toast.error("Passwords do not match. Please try again.");
      }

      try {
        await toast.promise(
          signup({
            name: formData.name,
            email: formData.email,
            password: formData.password,
          }),
          {
            loading: "Creating your account...",
            success: "Account created! Redirecting...",
            error: "Signup failed. Please try again.",
          }
        );
        navigate("/dashboard");
      } catch (err) {
        // Already handled by toast.promise
      }
    }
  };
  const handleGuestAccess = () => {
    console.log("Continuing as guest");
  };

  const toggleAuthMode = () => {
    setIsLogin(!isLogin);
    setFormData({
      email: "",
      password: "",
      confirmPassword: "",
      name: "",
    });
  };

  const navigate = useNavigate();

  return (
    <>
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4 relative">
        <div className="w-full max-w-md">
          <CircleChevronLeft
            className="ml-[10em] mt-[1em] absolute top-1 left-1"
            size={60}
            onClick={() => navigate("/")}
          />
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
            {/* Header */}
            <div className="text-center mb-8">
              <h1 className="text-2xl font-semibold text-gray-900">
                {isLogin ? "Welcome back" : "Create account"}
              </h1>
              <p className="text-gray-600 mt-2">
                {isLogin ? "Sign in to your account" : "Sign up to get started"}
              </p>
            </div>

            {/* Form */}
            <div className="space-y-4">
              {!isLogin && (
                <div className="relative">
                  <User className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    name="name"
                    placeholder="Full name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>
              )}

              <div className="relative">
                <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <input
                  type="email"
                  name="email"
                  placeholder="Email address"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>

              <div className="relative">
                <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>

              {!isLogin && (
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <input
                    type={showPassword ? "text" : "password"}
                    name="confirmPassword"
                    placeholder="Confirm password"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>
              )}

              {/* Forgot Password Link (Login only) */}
              {isLogin && (
                <div className="text-right">
                  <a
                    href="#"
                    className="text-sm text-blue-600 hover:text-blue-700"
                  >
                    Forgot password?
                  </a>
                </div>
              )}

              {/* Submit Button */}
              <button
                onClick={handleSubmit}
                className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
              >
                {isLogin ? "Sign in" : "Create account"}
              </button>
            </div>

            {/* Divider */}
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">or</span>
              </div>
            </div>

            {/* Continue as Guest */}
            <button
              onClick={handleGuestAccess}
              className="w-full bg-gray-100 text-gray-700 py-3 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors"
            >
              Continue as Guest
            </button>

            {/* Toggle Auth Mode */}
            <div className="text-center mt-6">
              <p className="text-gray-600">
                {isLogin
                  ? "Don't have an account?"
                  : "Already have an account?"}{" "}
                <button
                  onClick={toggleAuthMode}
                  className="text-blue-600 hover:text-blue-700 font-medium"
                >
                  {isLogin ? "Sign up" : "Sign in"}
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
