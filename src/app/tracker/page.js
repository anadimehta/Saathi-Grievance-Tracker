"use client";
import { useState } from "react";
import  Navbar  from "../components/navbar";

const Tracker = () => {
  const [grievances] = useState([
    {
      id: 1,
      title: "Infrastructure Issue at ABC Park",
      category: "Infrastructure",
      description: "The road near ABC park is damaged and needs urgent repairs.",
      location: "ABC Park, City Center",
      address: "ABC Park, 123 Main Street, City Center",
      date: "2025-02-01",
      status: "pending",
    },
    {
      id: 2,
      title: "Streetlight Not Working on XYZ Street",
      category: "Public Services",
      description:
        "The streetlight on XYZ Street has been out for the last week, creating a safety hazard.",
      location: "XYZ Street, Downtown",
      address: "XYZ Street, 456 Elm Road, Downtown",
      date: "2025-02-03",
      status: "under-review",
    },
    {
      id: 3,
      title: "Water Leakage in Building 12",
      category: "Utilities",
      description:
        "There has been a continuous water leakage in Building 12 affecting multiple floors.",
      location: "Building 12, West Wing",
      address: "Building 12, West Wing, 789 Oak Avenue",
      date: "2025-01-30",
      status: "resolved",
    },
  ]);

  return (
    <>
    <Navbar/>
    <div className="flex justify-center items-center min-h-screen bg-blue-50 px-4">
      <div className="bg-white shadow-xl rounded-xl p-6 w-full max-w-3xl max-h-[85vh] overflow-y-auto">
        <ul className="space-y-4">
          {grievances.map((grievance) => (
            <li
              key={grievance.id}
              className="bg-gray-100 p-4 rounded-lg shadow-md transition-transform duration-300 hover:scale-[1.02] md:p-6"
            >
              <h3 className="text-lg font-semibold text-gray-800">{grievance.title}</h3>
              <p className="text-sm text-gray-600">
                <strong>Category:</strong> {grievance.category}
              </p>
              <p className="text-sm text-gray-600">
                <strong>Description:</strong> {grievance.description}
              </p>
              <p className="text-sm text-gray-600">
                <strong>Location:</strong> {grievance.location}
              </p>
              <p className="text-sm text-gray-600">
                <strong>Address:</strong> {grievance.address}
              </p>
              <p className="text-xs text-gray-500 mt-2">Submitted on: {grievance.date}</p>

              <span
                className={`inline-block mt-2 px-3 py-1 text-xs font-semibold text-white rounded-full ${
                  grievance.status === "pending"
                    ? "bg-yellow-500"
                    : grievance.status === "under-review"
                    ? "bg-orange-500"
                    : "bg-green-600"
                }`}
              >
                {grievance.status.replace("-", " ")}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
    </>
  );
};

export default Tracker;