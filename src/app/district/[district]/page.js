"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import Navbar from "@/app/components/navbar";

const categories = [
  { name: "Water Supply", value: 25 },
  { name: "Electricity", value: 20 },
  { name: "Road Maintenance", value: 15 },
  { name: "Sanitation", value: 25 },
  { name: "Public Transport", value: 15 },
];

const COLORS = ["#FF6384", "#36A2EB", "#FFCE56", "#4CAF50", "#FF9800"];

export default function DistrictPage() {
  const params = useParams();
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState("");
  const [district, setDistrict] = useState("");

  // Ensure params.district is available before rendering
  useEffect(() => {
    if (params?.district) {
      setDistrict(params.district);
    }
  }, [params]);

  const handleGo = () => {
    if (selectedCategory) {
      router.push(`/category/${district}/${selectedCategory}`);
    }
  };

  return (
    <>
      <Navbar />
      <div className="space-y-8 px-6 md:px-12 lg:px-20 py-8 bg-[#f0f7ff] min-h-screen">
        {/* District Title */}
        <h1 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-red-500 to-yellow-500 text-transparent bg-clip-text drop-shadow-lg text-center">
          {district ? `${district} District Overview` : "Loading..."}
        </h1>

        {/* Grievance Category Distribution */}
        <Card className="shadow-lg bg-white border border-gray-300">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-gray-800">Grievance Category Distribution</CardTitle>
          </CardHeader>
          <CardContent className="h-[400px] flex justify-center items-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categories}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={150}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {categories.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Category Selection */}
        <Card className="w-full max-w-md mx-auto shadow-lg bg-blue-100 border border-gray-300">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-gray-800 text-center">Select Grievance Category</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center gap-4">
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-[270px] border-gray-400 shadow-md text-gray-700 bg-white rounded-lg focus:ring-2 focus:ring-blue-500">
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent className="bg-white shadow-lg rounded-lg">
                {categories.map((category) => (
                  <SelectItem key={category.name} value={category.name} className="px-4 py-2 hover:bg-blue-200">
                    {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Button
              onClick={handleGo}
              disabled={!selectedCategory}
              className={`w-full max-w-[270px] px-4 py-2 text-white font-semibold rounded-lg shadow-md transition duration-300 
                          ${selectedCategory ? "bg-gradient-to-r from-[#7f1d1d] to-[#991b1b] hover:shadow-xl" : "bg-gray-400 cursor-not-allowed"}`}
            >
              Proceed
            </Button>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
