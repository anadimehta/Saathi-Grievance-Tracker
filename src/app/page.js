// app/page.js
"use client";

import { useState } from "react";
import Navbar from "./components/navbar";
import Chatbot from "./components/Chatbot";
import Dashboard from "./components/dashboard";

export default function HomePage() {
  const [showDashboard, setShowDashboard] = useState(false);

  return (
    <div>
      <Navbar />
      {showDashboard ? (
        <Dashboard />
      ) : (
        <Chatbot setShowDashboard={setShowDashboard} />
      )}
    </div>
  );
}
