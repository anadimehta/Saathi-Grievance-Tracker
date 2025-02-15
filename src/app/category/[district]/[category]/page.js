// "use client";

// import { useState, useEffect } from "react";
// import { useRouter } from "next/navigation";
// import { Navbar } from "@/app/components/navbar";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// // Sample grievance data
// const grievances = [
//   {
//     id: 1,
//     name: "Water Leakage",
//     description: "Continuous water leakage in Sector 12.",
//     location: "Lucknow, UP",
//     username: "user123",
//   },
//   {
//     id: 2,
//     name: "Power Outage",
//     description: "Frequent power cuts in the residential area.",
//     location: "Kanpur, UP",
//     username: "user456",
//   },
//   {
//     id: 3,
//     name: "Potholes on Road",
//     description: "Main road is filled with potholes causing accidents.",
//     location: "Agra, UP",
//     username: "user789",
//   },
// ];

// export default function CategoryPage({ params }) {
//   const router = useRouter();
//   const { category } = params;

//   return (
//     <div>
//       <Navbar />
//       <div className="mt-24 px-6 md:px-12 lg:px-20 py-8 bg-[#f0f7ff] min-h-screen">
//         {/* Category Title */}
//         <h1 className="text-4xl font-extrabold text-center text-[#7f1d1d]">
//           {category} Grievances
//         </h1>

//         {/* Grievance List */}
//         <div className="mt-8 space-y-6">
//           {grievances.map((grievance) => (
//             <Card key={grievance.id} className="shadow-lg bg-white border border-gray-300">
//               <CardHeader>
//                 <CardTitle className="text-lg font-semibold text-gray-800">
//                   {grievance.name}
//                 </CardTitle>
//               </CardHeader>
//               <CardContent>
//                 <p className="text-gray-700"><strong>Description:</strong> {grievance.description}</p>
//                 <p className="text-gray-600"><strong>Location:</strong> {grievance.location}</p>
//                 <p className="text-gray-500"><strong>Reported by:</strong> {grievance.username}</p>
//               </CardContent>
//             </Card>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import  Navbar  from "@/app/components/navbar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// Sample grievance data
const grievancesData = {
  "Water Supply": [
    { id: 1, name: "Water Leakage", description: "Continuous water leakage in Sector 12.", location: "Lucknow, UP", username: "user123" },
  ],
  "Electricity": [
    { id: 2, name: "Power Outage", description: "Frequent power cuts in the residential area.", location: "Kanpur, UP", username: "user456" },
  ],
  "Road Maintenance": [
    { id: 3, name: "Potholes on Road", description: "Main road is filled with potholes causing accidents.", location: "Agra, UP", username: "user789" },
  ],
  "Sanitation": [
    { id: 4, name: "Garbage Dump", description: "Overflowing garbage dump near school.", location: "Varanasi, UP", username: "user111" },
  ],
  "Public Transport": [
    { id: 5, name: "Bus Shortage", description: "Very few buses running on peak hours.", location: "Meerut, UP", username: "user222" },
  ],
};

export default function CategoryPage({ params }) {
  const { category } = params;
  const grievances = grievancesData[category] || [];

  return (
    <div>
      <Navbar />
      <div className="mt-24 px-6 md:px-12 lg:px-20 py-8 bg-[#f0f7ff] min-h-screen">
        {/* Category Title */}
        <h1 className="text-4xl font-extrabold text-center text-[#7f1d1d]">
          {category} Grievances
        </h1>

        {/* Grievance List */}
        {grievances.length > 0 ? (
          <div className="mt-8 space-y-6">
            {grievances.map((grievance) => (
              <Card key={grievance.id} className="shadow-lg bg-white border border-gray-300">
                <CardHeader>
                  <CardTitle className="text-lg font-semibold text-gray-800">
                    {grievance.name}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700"><strong>Description:</strong> {grievance.description}</p>
                  <p className="text-gray-600"><strong>Location:</strong> {grievance.location}</p>
                  <p className="text-gray-500"><strong>Reported by:</strong> {grievance.username}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-600 mt-8">No grievances found for this category.</p>
        )}
      </div>
    </div>
  );
}
