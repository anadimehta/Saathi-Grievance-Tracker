"use client";

import React from "react";
import { Navbar } from "../components/navbar";

const NoMatchFound = () => {
  return (
    <><Navbar/>
    <div className="container">
      <h2>New Grievance Submission</h2>
      <p className="info-text">
        No existing grievance matches your issue. Please provide detailed information to create a new grievance.
      </p>

      <form>
        {/* Category Dropdown */}
        <div>
          <label htmlFor="category">Grievance Category</label>
          <select id="category" name="category" required>
            <option value="">Select Category</option>
            <option value="Infrastructure">Infrastructure</option>
            <option value="Public Services">Public Services</option>
            <option value="Health">Health</option>
            <option value="Education">Education</option>
            <option value="Transportation">Transportation</option>
            <option value="Environment">Environment</option>
            <option value="Utilities">Utilities</option>
          </select>
        </div>

        {/* Description Input */}
        <div>
          <label htmlFor="description">Detailed Description</label>
          <textarea
            id="description"
            name="description"
            placeholder="Provide a detailed description of your grievance"
            required
          ></textarea>
        </div>

        {/* Location Input */}
        <div>
          <label htmlFor="location">📍 Location</label>
          <input type="text" id="location" name="location" placeholder="Enter specific location" />
        </div>

        {/* Address Input */}
        <div>
          <label htmlFor="address">Address</label>
          <textarea id="address" name="address" placeholder="Enter full address"></textarea>
        </div>

        {/* Image Upload */}
        <div>
          <label htmlFor="images">📸 Upload Images</label>
          <input type="file" id="images" name="images" accept="image/*" multiple />
          <div className="file-info">Max file size: 10MB | Accepts jpg, png, jpeg</div>
        </div>

        {/* Submit Button */}
        <button type="submit" className="button">Submit New Grievance</button>
      </form>

      {/* Responsive CSS */}
      <style jsx>{`
        * {
          box-sizing: border-box;
          margin: 0;
          padding: 0;
        }

        body {
          background: #f0f8ff;
          font-family: "Arial", sans-serif;
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: 100vh;
          margin: 0;
          padding: 10px;
        }

        .container {
          background-color: #ffffff;
          border-radius: 12px;
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
          width: 100%;
          max-width: 500px;
          padding: 30px;
          max-height: 90vh;
          overflow-y: auto;
        }

        h2 {
          font-size: 24px;
          font-weight: bold;
          color: #333;
          text-align: center;
          margin-bottom: 16px;
        }

        .info-text {
          font-size: 16px;
          color: #666;
          text-align: center;
          margin-bottom: 30px;
        }

        label {
          font-size: 14px;
          font-weight: 600;
          color: #444;
          margin-bottom: 8px;
          display: inline-block;
        }

        input, select, textarea {
          width: 100%;
          padding: 12px;
          border-radius: 8px;
          border: 1px solid #ddd;
          margin-bottom: 16px;
          font-size: 14px;
        }

        input:focus, select:focus, textarea:focus {
          border-color: #48C9B0;
          outline: none;
        }

        textarea {
          resize: vertical;
          height: 100px;
        }

        .button {
          background-color: #48C9B0;
          color: #fff;
          padding: 14px;
          font-size: 16px;
          border: none;
          border-radius: 8px;
          width: 100%;
          cursor: pointer;
          transition: background-color 0.3s ease;
        }

        .button:hover {
          background-color: #1D9A8F;
        }

        .file-info {
          font-size: 14px;
          color: #666;
        }

        /* ✅ Responsive Design */
        @media (max-width: 768px) {
          .container {
            width: 90%;
            padding: 20px;
          }

          h2 {
            font-size: 22px;
          }

          .info-text {
            font-size: 14px;
          }

          input, select, textarea {
            font-size: 13px;
            padding: 10px;
          }

          .button {
            font-size: 14px;
            padding: 12px;
          }
        }

        @media (max-width: 480px) {
          .container {
            width: 95%;
            padding: 15px;
          }

          h2 {
            font-size: 20px;
          }

          .info-text {
            font-size: 13px;
          }

          label {
            font-size: 13px;
          }

          input, select, textarea {
            font-size: 12px;
            padding: 8px;
          }

          .button {
            font-size: 13px;
            padding: 10px;
          }
        }
      `}</style>
    </div>
    </>
  );
};

export default NoMatchFound;