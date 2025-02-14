"use client";
import { useState } from "react";
import { Navbar } from "../components/navbar";

export default function MatchFound() {
  const [isChecked, setIsChecked] = useState(false);
  const [imageCount, setImageCount] = useState(0);
  const [additionalDetails, setAdditionalDetails] = useState("");

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  const handleImageUpload = (event) => {
    setImageCount(event.target.files.length);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    alert("Grievance details submitted successfully!");
  };

  return (
    <><Navbar/>
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-[#d0f4f9] to-[#f1f8f3] px-4">
      <div className="w-full max-w-lg md:max-w-2xl h-[85vh] overflow-y-auto p-6 rounded-xl bg-white shadow-lg">
        <div className="p-6 rounded-xl bg-[#fafafa] border-l-8 border-[#84c9b8] animate-fadeIn">
          <h2 className="text-2xl font-bold text-[#4f6367] flex items-center mb-4">
            <span className="text-[#84c9b8] text-3xl mr-2">✔</span>
            Grievance Match Found
          </h2>

          {/* Matched Grievance Details */}
          <div className="bg-[#e0f7fa] p-4 rounded-lg mb-4 border-l-6 border-[#4db6ac]">
            <h3 className="text-lg text-[#00796b] font-semibold mb-2">
              Existing Grievance Details
            </h3>
            <p>
              <strong>Category:</strong> Infrastructure
            </p>
            <p>
              <strong>Description:</strong> Pothole on Main Street causing traffic disruption
            </p>
            <p>
              <strong>Reported On:</strong> 2024-01-15
            </p>
          </div>

          {/* Confirmation Checkbox */}
          <div className="flex items-center mb-4">
            <input
              type="checkbox"
              checked={isChecked}
              onChange={handleCheckboxChange}
              className="mr-3 w-5 h-5 cursor-pointer"
            />
            <label className="font-semibold text-gray-700">
              This matches my grievance
            </label>
          </div>

          {/* Additional Details Form */}
          {isChecked && (
            <form
              onSubmit={handleSubmit}
              className="flex flex-col bg-[#fafafa] p-5 rounded-lg border-l-6 border-[#84c9b8]"
            >
              <label className="font-semibold">📍 Location</label>
              <input
                type="text"
                placeholder="Enter specific location"
                required
                className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#84c9b8]"
              />

              <label className="mt-4 font-semibold">🏠 Address</label>
              <textarea
                placeholder="Enter full address"
                required
                className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#84c9b8] h-24 resize-none"
              ></textarea>

              {/* Additional Details */}
              <label className="mt-4 font-semibold">📝 Additional Details</label>
              <textarea
                placeholder="Enter additional details about the grievance..."
                value={additionalDetails}
                onChange={(e) => setAdditionalDetails(e.target.value)}
                className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#84c9b8] h-24 resize-none"
              ></textarea>

              <label className="mt-4 font-semibold">📸 Upload Images</label>
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleImageUpload}
                className="mt-2"
              />
              <p className="text-sm text-gray-500 mt-1">
                {imageCount > 0 ? `${imageCount} image(s) selected` : ""}
              </p>

              <button
                type="submit"
                className="bg-[#84c9b8] hover:bg-[#66b0a0] text-white font-semibold py-3 px-4 rounded-md mt-5 transition-all duration-300 transform hover:scale-105"
              >
                Confirm and Submit
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
    </>
  );
}