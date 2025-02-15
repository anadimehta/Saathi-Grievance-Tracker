"use client";

import { useState } from "react";
import { useRouter } from "next/navigation"; 
import Link from "next/link";
import { Menu, X } from "lucide-react"; 

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter(); 

  const handleGo = () => {
    router.push("/login"); 
  };
  const handleGoo = () => {
    router.push("/signup"); 
  };
  const tracking = () => {
    router.push("/tracker"); 
  };
  const newcom = () => {
    router.push("/submission"); 
  };
  const home = () => {
    router.push("/"); 
  };

  return (
    <nav className="border-b bg-[#fef2f2] py-4 shadow-md">
      <div className="flex h-20 items-center justify-between px-6 md:px-10">
        {/* Logo and Tagline */}
        <div className="flex flex-col items-start">
          <Link
            href="/"
            className="text-[2.8rem] font-extrabold text-[#7f1d1d] tracking-wide transition-all duration-300 hover:tracking-widest"
          >
            SAATHI
          </Link>
          <span className="text-md text-gray-600 italic">Shikayat se Samadhan tak</span>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          <button
            onClick={home}
            className="relative text-lg font-bold text-red-600 transition duration-300 px-4 py-2 rounded-lg 
                         before:absolute before:bottom-0 before:left-1/2 before:w-0 before:h-[3px] before:bg-red-600 
                         before:transition-all before:duration-300 before:ease-in-out before:-translate-x-1/2 
                         hover:text-red-600 hover:before:w-full hover:shadow-md"
          >
            Home
          </button>

          <button
            onClick={tracking}
            className="relative text-lg font-bold text-red-600 transition duration-300 px-4 py-2 rounded-lg 
                         before:absolute before:bottom-0 before:left-1/2 before:w-0 before:h-[3px] before:bg-red-600 
                         before:transition-all before:duration-300 before:ease-in-out before:-translate-x-1/2 
                         hover:text-red-600 hover:before:w-full hover:shadow-md"
          >
            Status
          </button>

          <button
            onClick={newcom}
            className="relative text-lg font-bold text-red-600 transition duration-300 px-4 py-2 rounded-lg 
                         before:absolute before:bottom-0 before:left-1/2 before:w-0 before:h-[3px] before:bg-red-600 
                         before:transition-all before:duration-300 before:ease-in-out before:-translate-x-1/2 
                         hover:text-red-600 hover:before:w-full hover:shadow-md"
          >
            Shikaayat
          </button>

          {/* Buttons */}
          <button
            onClick={handleGo}
            className="px-6 py-2 text-white bg-[#7f1d1d] rounded-lg shadow-md 
                             transition duration-300 transform hover:bg-[#991b1b] 
                             hover:shadow-xl hover:-translate-y-1 hover:scale-105"
          >
            Login
          </button>
          <button 
            onClick={handleGoo}
            className="px-6 py-2 text-white bg-[#7f1d1d] rounded-lg shadow-md 
                             transition duration-300 transform hover:bg-[#991b1b] 
                             hover:shadow-xl hover:-translate-y-1 hover:scale-105">
            Sign Up
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-black focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden flex flex-col items-center space-y-4 pb-4">
          <button
            onClick={() => {
              home();
              setIsOpen(false);
            }}
            className="text-lg font-medium text-gray-700 transition duration-300 hover:text-red-500 hover:bg-gray-100 px-4 py-2 rounded-lg w-full text-center"
          >
            Home
          </button>

          <button
            onClick={() => {
              tracking();
              setIsOpen(false);
            }}
            className="text-lg font-medium text-gray-700 transition duration-300 hover:text-red-500 hover:bg-gray-100 px-4 py-2 rounded-lg w-full text-center"
          >
            Status
          </button>

          <button
            onClick={() => {
              newcom();
              setIsOpen(false);
            }}
            className="text-lg font-medium text-gray-700 transition duration-300 hover:text-red-500 hover:bg-gray-100 px-4 py-2 rounded-lg w-full text-center"
          >
            Shikaayat
          </button>

          <button onClick={handleGo} className="px-6 py-2 text-red-800 font-bold">LOGIN</button>
          <button onClick={handleGoo} className="px-6 py-2 text-red-800 font-bold">SIGN UP</button>
        </div>
      )}
    </nav>
  );
}
