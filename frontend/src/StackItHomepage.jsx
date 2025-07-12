import React from "react";
import { Search, Users, CheckCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function StackItHomepage() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-green-400 via-teal-500 to-green-600 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative">
            {/* Decorative elements */}
            <div className="absolute top-10 left-10 w-16 h-16 bg-orange-400 rounded-full opacity-80"></div>
            <div className="absolute top-32 right-20 w-8 h-8 bg-teal-300 rounded-full opacity-60"></div>
            <div className="absolute bottom-20 left-1/4 w-6 h-6 bg-yellow-400 rounded-full opacity-70"></div>

            {/* Laptop illustration */}
            <div className="flex justify-center mb-8">
              <div className="relative">
                <div className="w-80 h-52 bg-gray-300 rounded-lg shadow-2xl transform rotate-3">
                  <div className="w-full h-40 bg-gray-100 rounded-t-lg p-4">
                    <div className="w-full h-full bg-white rounded shadow-inner flex items-center justify-center">
                      <div className="text-center">
                        <div className="w-12 h-12 bg-orange-300 rounded-full mx-auto mb-2"></div>
                        <div className="w-16 h-16 bg-teal-400 rounded-full mx-auto mb-2 opacity-80"></div>
                        <div className="flex justify-center space-x-2">
                          <div className="w-6 h-8 bg-yellow-400 rounded"></div>
                          <div className="w-6 h-8 bg-orange-400 rounded"></div>
                          <div className="w-6 h-8 bg-green-400 rounded"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="w-full h-12 bg-gray-400 rounded-b-lg"></div>
                </div>
                {/* Person silhouette */}
                <div className="absolute -bottom-8 -left-8 w-20 h-24 bg-gray-800 rounded-full opacity-60"></div>
              </div>
            </div>

            {/* Hero text */}
            <div className="text-center text-white">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Collaborative Learning, Structured
                <br />
                Knowledge
              </h1>
              <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto opacity-90">
                StackIt is a Personal Q&A forum platform designed to
                collaborative learning and structured knowledge sharing. Join
                our community to ask questions, share insights, and learn
                together.
              </p>
              <button className="bg-blue-600 text-white px-8 py-3 rounded-md text-lg font-medium hover:bg-blue-700 transition-colors">
                Get Started
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Why Choose StackIt?
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              StackIt offers a unique approach to Q&A forums, focusing on
              simplicity and effectiveness. Here's why you'll love using our
              platform:
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-8 h-8 text-gray-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Efficient Search
              </h3>
              <p className="text-gray-600">
                Quickly find answers to your questions with our powerful search
                functionality.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-gray-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Community Collaboration
              </h3>
              <p className="text-gray-600">
                Connect with a vibrant community of learners and experts to get
                the best answers.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-gray-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Verified Answers
              </h3>
              <p className="text-gray-600">
                Ensure the quality of information with verified answers from
                trusted members.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Ready to Dive In?
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Join StackIt today and start your journey of collaborative learning
            and structured knowledge sharing.
          </p>
          <button className="bg-blue-600 text-white px-8 py-3 rounded-md text-lg font-medium hover:bg-blue-700 transition-colors">
            Explore StackIt
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex space-x-8 mb-4 md:mb-0">
              <a href="#" className="text-gray-600 hover:text-gray-900">
                Terms of Service
              </a>
              <a href="#" className="text-gray-600 hover:text-gray-900">
                Privacy Policy
              </a>
              <a href="#" className="text-gray-600 hover:text-gray-900">
                Contact Us
              </a>
            </div>
            <div className="text-gray-500 text-sm">
              © 2023 StackIt. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
