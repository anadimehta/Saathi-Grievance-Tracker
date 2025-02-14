"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion"; // Import animation library

// Sample UP districts - add more as needed
const districts = ["Agra", "Lucknow", "Kanpur", "Varanasi", "Prayagraj"];

// Animated Counter Component
const Counter = ({ value }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const duration = 1500; // Animation duration in ms
    const increment = value / (duration / 16); // Frames per second

    const timer = setInterval(() => {
      start += increment;
      if (start >= value) {
        start = value;
        clearInterval(timer);
      }
      setCount(Math.floor(start));
    }, 16);

    return () => clearInterval(timer);
  }, [value]);

  return <span>{count.toLocaleString()}+</span>;
};

export default function Dashboard() {
  const router = useRouter();
  const [selectedDistrict, setSelectedDistrict] = useState("");

  const handleGo = () => {
    if (selectedDistrict) {
      router.push(`/district/${selectedDistrict}`);
    }
  };

  

  return (
    <div className="space-y-8 px-6 md:px-12 lg:px-20 py-8 bg-[#f0f7ff] min-h-screen">
      {/* Tagline with Enhanced Animation */}
      <motion.div
        className="text-4xl md:text-5xl font-extrabold text-[#7f1d1d] drop-shadow-lg flex justify-center"
      >
        {"Shikaayat se Samadhaan Tak".split(" ").map((word, index) => (
          <motion.span
            key={index}
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: index * 0.3, duration: 0.6 }}
            className="mx-2"
          >
            {word}
          </motion.span>
        ))}
      </motion.div>

      {/* Cards Section */}
      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-4">
        {[
          { title: "Total Grievances", count: 1234, color: "bg-blue-100" },
          { title: "Pending", count: 423, color: "bg-yellow-100" },
          { title: "In Progress", count: 342, color: "bg-orange-100" },
          { title: "Resolved", count: 469, color: "bg-green-100" },
        ].map((item, index) => (
          <Card key={index} className={`shadow-lg ${item.color}`}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-semibold text-gray-700">
                {item.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl md:text-3xl font-bold text-gray-900">
                <Counter value={item.count} />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* District Selection */}
      <Card className="mt-8 w-full max-w-sm mx-auto shadow-lg bg-blue-100 border border-gray-300">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-gray-800 text-center">
            Select Your District
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col items-center gap-4">
          <Select value={selectedDistrict} onValueChange={setSelectedDistrict}>
            <SelectTrigger className="w-[270px] border-gray-400 shadow-md text-gray-700 bg-white rounded-lg focus:ring-2 focus:ring-blue-500">
              <SelectValue placeholder="Select district" />
            </SelectTrigger>
            <SelectContent className="bg-white shadow-lg rounded-lg">
              {districts.map((district) => (
                <SelectItem
                  key={district}
                  value={district}
                  className="px-4 py-2 hover:bg-blue-200"
                >
                  {district}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Button
            onClick={handleGo}
            disabled={!selectedDistrict}
            className={`w-full max-w-[270px] px-4 py-2 text-white font-semibold rounded-lg shadow-md transition duration-300 
                        ${selectedDistrict ? "bg-gradient-to-r from-[#7f1d1d] to-[#991b1b] hover:shadow-xl" : "bg-gray-400 cursor-not-allowed"}`}
          >
            Proceed
          </Button>
        </CardContent>
      </Card>

      {/* Uttar Pradesh Map Image - Wider View */}
      <div className="flex justify-center">
        <Image
          src="/UP1.png" // Change this to the correct path of your UP map image
          alt="Uttar Pradesh Map"
          width={800}
          height={400}
        />
      </div>
    </div>
  );
}
