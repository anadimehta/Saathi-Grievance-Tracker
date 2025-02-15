"use client";
import { useState } from "react";
import  Navbar  from "../components/navbar";

export default function SignupPage() {
  const [formData, setFormData] = useState({
    fullName: "",
    aadhaarNumber: "",
    mobileNumber: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data Submitted:", formData);
  };

  return (
    <>
    <Navbar/>
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="w-full max-w-lg bg-white shadow-lg rounded-lg overflow-hidden border">
        {/* Card Header */}
        <div className="bg-[#f8f9ff] p-5 border-b">
          <h2 className="text-2xl text-center text-[#7f1d1d] font-semibold">Sign Up</h2>
        </div>

        {/* Card Content */}
        <div className="p-6">
          <form className="space-y-5" onSubmit={handleSubmit}>
            {/* Full Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Full Name</label>
              <input
                type="text"
                name="fullName"
                placeholder="Enter your full name"
                className="w-full border border-gray-300 p-3 rounded-md focus:ring focus:ring-blue-200"
                required
                value={formData.fullName}
                onChange={handleChange}
              />
            </div>

            {/* Aadhaar Number */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Aadhaar Number</label>
              <input
                type="text"
                name="aadhaarNumber"
                placeholder="Enter 12-digit Aadhaar number"
                maxLength="12"
                className="w-full border border-gray-300 p-3 rounded-md focus:ring focus:ring-blue-200"
                required
                value={formData.aadhaarNumber}
                onChange={handleChange}
              />
            </div>

            {/* Mobile Number */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Mobile Number</label>
              <input
                type="text"
                name="mobileNumber"
                placeholder="Enter your mobile number"
                className="w-full border border-gray-300 p-3 rounded-md focus:ring focus:ring-blue-200"
                required
                value={formData.mobileNumber}
                onChange={handleChange}
              />
            </div>

            {/* Email Address */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Email Address</label>
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                className="w-full border border-gray-300 p-3 rounded-md focus:ring focus:ring-blue-200"
                required
                value={formData.email}
                onChange={handleChange}
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Password</label>
              <input
                type="password"
                name="password"
                placeholder="Enter your password"
                className="w-full border border-gray-300 p-3 rounded-md focus:ring focus:ring-blue-200"
                required
                value={formData.password}
                onChange={handleChange}
              />
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Confirm Password</label>
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm your password"
                className="w-full border border-gray-300 p-3 rounded-md focus:ring focus:ring-blue-200"
                required
                value={formData.confirmPassword}
                onChange={handleChange}
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-[#CC2B2B] hover:bg-[#b22424] text-white font-medium py-3 px-4 rounded-md transition-colors"
            >
              Sign Up
            </button>
          </form>
        </div>
      </div>

      {/* Responsive Styling */}
      <style jsx>{`
        @media (max-width: 768px) {
          .w-full {
            max-width: 90%;
          }
          .p-6 {
            padding: 20px;
          }
          .p-3 {
            padding: 10px;
          }
          .text-2xl {
            font-size: 22px;
          }
        }

        @media (max-width: 480px) {
          .w-full {
            max-width: 95%;
          }
          .p-6 {
            padding: 15px;
          }
          .p-3 {
            padding: 8px;
          }
          .text-2xl {
            font-size: 20px;
          }
        }
      `}</style>
    </div>
    </>
  );
}