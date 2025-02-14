"use client"; // Because form handling needs client-side interactivity

import React from "react";
import { Navbar } from "../components/navbar";

export default function LoginPage() {
  return (
    <><Navbar/>
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      {/* Main Container */}
      <div className="flex flex-col md:flex-row bg-white shadow-xl rounded-lg overflow-hidden w-full max-w-3xl">
        
        {/* Left Side (Animation & Design) */}
        <div className="md:w-1/2 w-full bg-gradient-to-br from-[#a03636] to-[#7f1d1d] flex items-center justify-center py-10 md:py-0">
          <h2 className="text-white text-3xl font-bold animate-pulse">Samadhan Paaye !</h2>
        </div>

        {/* Right Side (Login Form) */}
        <div className="md:w-1/2 w-full p-8 flex flex-col justify-center">
          <h2 className="text-3xl text-center text-[#7f1d1d] font-semibold mb-6">Login</h2>

          <form className="space-y-5">
            {/* Email Address */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Email Address</label>
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="w-full border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-[#CC2B2B]" 
                required 
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Password</label>
              <input 
                type="password" 
                placeholder="Enter your password" 
                className="w-full border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-[#CC2B2B]" 
                required 
              />
            </div>

            {/* Forgot Password */}
            <div className="text-right">
              <a href="#" className="text-[#CC2B2B] hover:underline text-sm">Forgot Password?</a>
            </div>

            {/* Submit Button */}
            <button 
              type="submit" 
              className="w-full bg-[#CC2B2B] hover:bg-[#b22424] text-white font-medium py-3 px-4 rounded-md transition-all duration-300 transform hover:scale-105"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
    </>
  );
}