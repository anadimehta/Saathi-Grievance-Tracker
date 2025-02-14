"use client";
import { useState } from "react";
import { Navbar } from "../components/navbar";

const SubmissionForm = () => {
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Grievance Submitted:", { category, description });
    alert("Grievance Submitted Successfully!");
  };

  return (
    <>
    <Navbar/>
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4 sm:px-6 lg:px-8">
      {/* Main Container */}
      <div className="w-full max-w-lg bg-white shadow-xl rounded-xl p-6 transform transition-all duration-500 hover:scale-105 animate-slide-in border-t-4 border-[#7f1d1d]">
        {/* Title */}
        <h2 className="text-3xl font-semibold text-center text-[#7f1d1d] mb-4">
          Shikaayat
        </h2>
        <p className="text-center text-gray-600 mb-6">
          Help us improve by reporting issues in your locality.
        </p>

        {/* Form */}
        <form className="space-y-6" onSubmit={handleSubmit}>
          {/* Grievance Category */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Select Grievance Category
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full border border-gray-300 p-3 rounded-md focus:ring-2 focus:ring-[#6AC47E] transition-all duration-300 hover:scale-105"
            >
              <option value="" disabled>Choose a Category</option>
              {["Health", "Roads", "Education", "Water Supply", "Electricity", "Public Transport", "Sanitation"].map((option) => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
          </div>

          {/* Problem Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Problem Description
            </label>
            <textarea
              placeholder="Briefly describe your problem"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full border border-gray-300 p-3 rounded-md min-h-[120px] focus:ring-2 focus:ring-[#6AC47E] transition-all duration-300 hover:scale-105"
            ></textarea>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-[#7f1d1d] hover:bg-[#d55858] text-white font-medium py-3 rounded-md transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg"
          >
            Submit Grievance
          </button>
        </form>
      </div>

      {/* Tailwind Animation Styles */}
      <style>
        {`
          @keyframes slideIn {
            from { opacity: 0; transform: translateY(-20px); }
            to { opacity: 1; transform: translateY(0); }
          }
          .animate-slide-in {
            animation: slideIn 0.8s ease-out;
          }
        `}
      </style>
    </div>
    </>
  );
};

export default SubmissionForm;