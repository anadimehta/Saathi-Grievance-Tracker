// // "use client";
// // import { useState, useEffect, useRef } from "react";
// // import { useSearchParams } from "next/navigation";
// // import Navbar from "../components/navbar";

// // const SubmissionForm = () => {
// //   const searchParams = useSearchParams();
// //   const isDisabled = searchParams.get("isDisabled") === "true";

// //   const [category, setCategory] = useState("");
// //   const [description, setDescription] = useState("");
// //   const [voiceFillCompleted, setVoiceFillCompleted] = useState(false);
// //   const preferredLanguage = "en-US";
// //   const recognitionRef = useRef(null);

// //   const allowedCategories = ["education", "roads", "transport", "health"];

// //   // Speech Synthesis Function
// //   const speak = (text) => {
// //     return new Promise((resolve) => {
// //       if (typeof window !== "undefined" && window.speechSynthesis) {
// //         const utterance = new SpeechSynthesisUtterance(text);
// //         utterance.lang = preferredLanguage;
// //         utterance.onend = () => setTimeout(resolve, 500);
// //         window.speechSynthesis.speak(utterance);
// //       } else {
// //         console.error("Speech Synthesis API not supported.");
// //         resolve();
// //       }
// //     });
// //   };

// //   // Speech Recognition Function
// //   const listenForSpeech = () => {
// //     return new Promise((resolve, reject) => {
// //       const SpeechRecognition =
// //         window.SpeechRecognition || window.webkitSpeechRecognition;
// //       if (!SpeechRecognition) {
// //         reject(new Error("Speech Recognition API not supported"));
// //         return;
// //       }

// //       // Cancel any ongoing speech synthesis to avoid interference.
// //       if (window.speechSynthesis) {
// //         window.speechSynthesis.cancel();
// //       }

// //       const recognition = new SpeechRecognition();
// //       recognition.lang = preferredLanguage;
// //       recognition.interimResults = false;
// //       recognition.continuous = false;

// //       recognition.onresult = (event) => {
// //         // Get the recognized transcript in lower-case.
// //         const transcript = event.results[0][0].transcript.trim().toLowerCase();
// //         console.log("Recognized:", transcript);

// //         // Check if any allowed category is mentioned.
// //         const matchedCategory = allowedCategories.find((cat) =>
// //           transcript.includes(cat)
// //         );

// //         // Return the matched category if found; otherwise, return the transcript.
// //         resolve(matchedCategory || transcript);
// //       };

// //       recognition.onerror = (error) => {
// //         console.error("Speech recognition error:", error);
// //         reject(error);
// //       };

// //       recognition.start();
// //       recognitionRef.current = recognition;
// //     });
// //   };

// //   // Function to handle form submission
// //   const submitGrievance = () => {
// //     console.log("Grievance Submitted:", { category, description });
// //     alert("Grievance Submitted Successfully!");
// //   };

// //   // Manual Form Submission
// //   const handleSubmit = (e) => {
// //     e.preventDefault();
// //     submitGrievance();
// //   };

// //   // Voice Input Handling
// //   const handleVoiceFill = async () => {
// //     try {
// //       if (voiceFillCompleted) return;

// //       // Give an initial instruction.
// //       await speak("Now you can address your problem.");
// //       await new Promise((resolve) => setTimeout(resolve, 500));

// //       // Ask for the category.
// //       await speak(
// //         "Please select your main category. Options are education, roads, transport, and health."
// //       );
// //       await new Promise((resolve) => setTimeout(resolve, 500));
// //       const categoryTranscript = await listenForSpeech();

// //       // Use the matched category if available; otherwise, fallback to "Other".
// //       if (allowedCategories.includes(categoryTranscript)) {
// //         setCategory(categoryTranscript);
// //       } else {
// //         setCategory("Other");
// //       }

// //       // Ask for the problem description.
// //       await speak("Now, please provide a brief description of your problem.");
// //       await new Promise((resolve) => setTimeout(resolve, 500));
// //       const descriptionTranscript = await listenForSpeech();
// //       setDescription(descriptionTranscript);

// //       await speak("Thank you, your responses have been recorded.");
// //       setVoiceFillCompleted(true);
// //     } catch (error) {
// //       console.error("Error during voice fill:", error);
// //       await speak("There was an error capturing your responses. Please try again.");
// //     }
// //   };

// //   // Auto-trigger voice-fill for disabled users.
// //   useEffect(() => {
// //     if (isDisabled) {
// //       handleVoiceFill();
// //     }
// //     return () => {
// //       if (recognitionRef.current) {
// //         recognitionRef.current.stop();
// //       }
// //     };
// //   }, [isDisabled]);

// //   // Auto-submit after voice fill.
// //   useEffect(() => {
// //     if (isDisabled && voiceFillCompleted) {
// //       setTimeout(submitGrievance, 1000);
// //     }
// //   }, [isDisabled, voiceFillCompleted]);

// //   return (
// //     <>
// //       <Navbar />
// //       <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4 sm:px-6 lg:px-8">
// //         <div className="w-full max-w-lg bg-white shadow-xl rounded-xl p-6 transform transition-all duration-500 hover:scale-105 animate-slide-in border-t-4 border-[#7f1d1d]">
// //           <h2 className="text-3xl font-semibold text-center text-[#7f1d1d] mb-4">
// //             Shikaayat
// //           </h2>
// //           <p className="text-center text-gray-600 mb-6">
// //             Help us improve by reporting issues in your locality.
// //           </p>

// //           {!isDisabled && (
// //             <div className="flex justify-center mb-4">
// //               <button
// //                 type="button"
// //                 onClick={handleVoiceFill}
// //                 className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg"
// //               >
// //                 Fill Form via Voice
// //               </button>
// //             </div>
// //           )}

// //           <form className="space-y-6" onSubmit={handleSubmit}>
// //             <div>
// //               <label className="block text-sm font-medium text-gray-700 mb-1">
// //                 Select Grievance Category
// //               </label>
// //               <select
// //                 value={category}
// //                 onChange={(e) => setCategory(e.target.value)}
// //                 className="w-full border border-gray-300 p-3 rounded-md focus:ring-2 focus:ring-[#6AC47E] transition-all duration-300"
// //               >
// //                 <option value="" disabled>
// //                   Choose a Category
// //                 </option>
// //                 {allowedCategories.map((option) => (
// //                   <option key={option} value={option}>
// //                     {option.charAt(0).toUpperCase() + option.slice(1)}
// //                   </option>
// //                 ))}
// //                 <option value="Other">Other</option>
// //               </select>
// //             </div>

// //             <div>
// //               <label className="block text-sm font-medium text-gray-700 mb-1">
// //                 Problem Description
// //               </label>
// //               <textarea
// //                 placeholder="Briefly describe your problem"
// //                 value={description}
// //                 onChange={(e) => setDescription(e.target.value)}
// //                 className="w-full border border-gray-300 p-3 rounded-md min-h-[120px] focus:ring-2 focus:ring-[#6AC47E] transition-all duration-300"
// //               ></textarea>
// //             </div>

// //             <button
// //               type="submit"
// //               disabled={isDisabled && !voiceFillCompleted}
// //               className={`w-full ${
// //                 isDisabled && !voiceFillCompleted
// //                   ? "bg-gray-400 cursor-not-allowed"
// //                   : "bg-[#7f1d1d] hover:bg-[#d55858]"
// //               } text-white font-medium py-3 rounded-md transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg`}
// //             >
// //               Submit Grievance
// //             </button>
// //           </form>
// //         </div>
// //       </div>
// //     </>
// //   );
// // };

// // export default SubmissionForm;

// // "use client";
// // import { useState } from "react";
// // import { Navbar } from "../components/navbar";

// // const SubmissionForm = () => {
// //   const [category, setCategory] = useState("");
// //   const [description, setDescription] = useState("");

// //   const handleSubmit = (e) => {
// //     e.preventDefault();
// //     console.log("Grievance Submitted:", { category, description });
// //     alert("Grievance Submitted Successfully!");
// //   };

// //   return (
// //     <>
// //     <Navbar/>
// //     <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4 sm:px-6 lg:px-8">
// //       {/* Main Container */}
// //       <div className="w-full max-w-lg bg-white shadow-xl rounded-xl p-6 transform transition-all duration-500 hover:scale-105 animate-slide-in border-t-4 border-[#7f1d1d]">
// //         {/* Title */}
// //         <h2 className="text-3xl font-semibold text-center text-[#7f1d1d] mb-4">
// //           Shikaayat
// //         </h2>
// //         <p className="text-center text-gray-600 mb-6">
// //           Help us improve by reporting issues in your locality.
// //         </p>

// //         {/* Form */}
// //         <form className="space-y-6" onSubmit={handleSubmit}>
// //           {/* Grievance Category */}
// //           <div>
// //             <label className="block text-sm font-medium text-gray-700 mb-1">
// //               Select Grievance Category
// //             </label>
// //             <select
// //               value={category}
// //               onChange={(e) => setCategory(e.target.value)}
// //               className="w-full border border-gray-300 p-3 rounded-md focus:ring-2 focus:ring-[#6AC47E] transition-all duration-300 hover:scale-105"
// //             >
// //               <option value="" disabled>Choose a Category</option>
// //               {["Health", "Roads", "Education", "Water Supply", "Electricity", "Public Transport", "Sanitation"].map((option) => (
// //                 <option key={option} value={option}>{option}</option>
// //               ))}
// //             </select>
// //           </div>

// //           {/* Problem Description */}
// //           <div>
// //             <label className="block text-sm font-medium text-gray-700 mb-1">
// //               Problem Description
// //             </label>
// //             <textarea
// //               placeholder="Briefly describe your problem"
// //               value={description}
// //               onChange={(e) => setDescription(e.target.value)}
// //               className="w-full border border-gray-300 p-3 rounded-md min-h-[120px] focus:ring-2 focus:ring-[#6AC47E] transition-all duration-300 hover:scale-105"
// //             ></textarea>
// //           </div>

// //           {/* Submit Button */}
// //           <button
// //             type="submit"
// //             className="w-full bg-[#7f1d1d] hover:bg-[#d55858] text-white font-medium py-3 rounded-md transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg"
// //           >
// //             Submit Grievance
// //           </button>
// //         </form>
// //       </div>

// //       {/* Tailwind Animation Styles */}
// //       <style>
// //         {`
// //           @keyframes slideIn {
// //             from { opacity: 0; transform: translateY(-20px); }
// //             to { opacity: 1; transform: translateY(0); }
// //           }
// //           .animate-slide-in {
// //             animation: slideIn 0.8s ease-out;
// //           }
// //         `}
// //       </style>
// //     </div>
// //     </>
// //   );
// // };

// // export default SubmissionForm;


// // "use client";
// // import { useState } from "react";
// // import { Navbar } from "../components/navbar";

// // const SubmissionForm = () => {
// //   const [category, setCategory] = useState("");
// //   const [description, setDescription] = useState("");
// //   const [results, setResults] = useState(null);
// //   const [loading, setLoading] = useState(false);
// //   const [error, setError] = useState("");

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();
// //     setLoading(true);
// //     setError("");
// //     try {
// //       // Replace the URL below with your backend API endpoint.
// //       const response = await fetch("http://127.0.0.1:5000/api/grievance", {
// //         method: "POST",
// //         headers: {
// //           "Content-Type": "application/json",
// //         },
// //         body: JSON.stringify({ grievance_text: description }),
// //       });

// //       if (!response.ok) {
// //         throw new Error("Failed to fetch data from the server");
// //       }

// //       const data = await response.json();
// //       console.log("Response from server:", data);
// //       setResults(data);
// //     } catch (err) {
// //       console.error("Error submitting grievance:", err);
// //       setError("Something went wrong. Please try again later.");
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   return (
// //     <>
// //       <Navbar />
// //       <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4 sm:px-6 lg:px-8">
// //         {/* Main Container */}
// //         <div className="w-full max-w-lg bg-white shadow-xl rounded-xl p-6 transform transition-all duration-500 hover:scale-105 animate-slide-in border-t-4 border-[#7f1d1d]">
// //           {/* Title */}
// //           <h2 className="text-3xl font-semibold text-center text-[#7f1d1d] mb-4">
// //             Shikaayat
// //           </h2>
// //           <p className="text-center text-gray-600 mb-6">
// //             Help us improve by reporting issues in your locality.
// //           </p>

// //           {/* Form */}
// //           <form className="space-y-6" onSubmit={handleSubmit}>
// //             {/* Grievance Category */}
// //             <div>
// //               <label className="block text-sm font-medium text-gray-700 mb-1">
// //                 Select Grievance Category
// //               </label>
// //               <select
// //                 value={category}
// //                 onChange={(e) => setCategory(e.target.value)}
// //                 className="w-full border border-gray-300 p-3 rounded-md focus:ring-2 focus:ring-[#6AC47E] transition-all duration-300 hover:scale-105"
// //               >
// //                 <option value="" disabled>
// //                   Choose a Category
// //                 </option>
// //                 {[
// //                   "Health",
// //                   "Roads",
// //                   "Education",
// //                   "Water Supply",
// //                   "Electricity",
// //                   "Public Transport",
// //                   "Sanitation",
// //                 ].map((option) => (
// //                   <option key={option} value={option}>
// //                     {option}
// //                   </option>
// //                 ))}
// //               </select>
// //             </div>

// //             {/* Problem Description */}
// //             <div>
// //               <label className="block text-sm font-medium text-gray-700 mb-1">
// //                 Problem Description
// //               </label>
// //               <textarea
// //                 placeholder="Briefly describe your problem"
// //                 value={description}
// //                 onChange={(e) => setDescription(e.target.value)}
// //                 className="w-full border border-gray-300 p-3 rounded-md min-h-[120px] focus:ring-2 focus:ring-[#6AC47E] transition-all duration-300 hover:scale-105"
// //               ></textarea>
// //             </div>

// //             {/* Submit Button */}
// //             <button
// //               type="submit"
// //               className="w-full bg-[#7f1d1d] hover:bg-[#d55858] text-white font-medium py-3 rounded-md transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg"
// //               disabled={loading}
// //             >
// //               {loading ? "Submitting..." : "Submit Grievance"}
// //             </button>
// //           </form>

// //           {/* Error Message */}
// //           {error && (
// //             <p className="mt-4 text-red-500 text-center">{error}</p>
// //           )}

// //           {/* Results Section */}
// //           {results && (
// //             <div className="mt-8">
// //               <h3 className="text-xl font-semibold mb-4">Results</h3>
// //               <p>
// //                 <strong>Your Grievance:</strong> {results.new_text}
// //               </p>
// //               {results.similar_grievances && results.similar_grievances.length > 0 ? (
// //                 <div>
// //                   <h4 className="mt-4 font-semibold">
// //                     Similar Grievances Found:
// //                   </h4>
// //                   <ul className="list-disc pl-5">
// //                     {results.similar_grievances.map((g, index) => (
// //                       <li key={index}>
// //                         <strong>{g.title}</strong>
// //                         <br />
// //                         {g.description}
// //                         <br />
// //                         <em>
// //                           Location: {g.location} | Category: {g.category}
// //                         </em>
// //                       </li>
// //                     ))}
// //                   </ul>
// //                 </div>
// //               ) : (
// //                 <p className="mt-4">
// //                   No similar grievances found. You may submit this as a new grievance.
// //                 </p>
// //               )}
// //             </div>
// //           )}
// //         </div>

// //         {/* Tailwind Animation Styles */}
// //         <style>
// //           {`
// //           @keyframes slideIn {
// //             from { opacity: 0; transform: translateY(-20px); }
// //             to { opacity: 1; transform: translateY(0); }
// //           }
// //           .animate-slide-in {
// //             animation: slideIn 0.8s ease-out;
// //           }
// //         `}
// //         </style>
// //       </div>
// //     </>
// //   );
// // };

// // export default SubmissionForm;



// "use client";
// import { useState } from "react";
// import { useRouter } from "next/navigation";
// import Navbar from "../components/navbar";

// const SubmissionForm = () => {
//   const [category, setCategory] = useState("");
//   const [description, setDescription] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");
//   const router = useRouter();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setError("");

//     try {
//       const response = await fetch("http://127.0.0.1:5000/api/grievance", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ grievance_text: description }),
//       });

//       if (!response.ok) {
//         throw new Error("Failed to fetch data from the server");
//       }

//       const data = await response.json();

//       if (data.similar_grievances && data.similar_grievances.length > 0) {
//         // Redirect to MatchFound page with data
//         router.push(`/matchfound?category=${category}&description=${description}&matchedData=${encodeURIComponent(JSON.stringify(data.similar_grievances))}`);
//       } else {
//         // Redirect to NoMatchFound page with data
//         router.push(`/nomatchfound?category=${category}&description=${description}`);
//       }
//     } catch (err) {
//       console.error("Error submitting grievance:", err);
//       setError("Something went wrong. Please try again later.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <>
//       <Navbar />
//       <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4 sm:px-6 lg:px-8">
//         <div className="w-full max-w-lg bg-white shadow-xl rounded-xl p-6 border-t-4 border-[#7f1d1d]">
//           <h2 className="text-3xl font-semibold text-center text-[#7f1d1d] mb-4">Shikaayat</h2>
//           <p className="text-center text-gray-600 mb-6">Help us improve by reporting issues in your locality.</p>

//           <form className="space-y-6" onSubmit={handleSubmit}>
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">Select Grievance Category</label>
//               <select
//                 value={category}
//                 onChange={(e) => setCategory(e.target.value)}
//                 className="w-full border border-gray-300 p-3 rounded-md"
//               >
//                 <option value="" disabled>Choose a Category</option>
//                 {["Health", "Roads", "Education", "Water Supply", "Electricity", "Public Transport", "Sanitation"].map((option) => (
//                   <option key={option} value={option}>{option}</option>
//                 ))}
//               </select>
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">Problem Description</label>
//               <textarea
//                 placeholder="Briefly describe your problem"
//                 value={description}
//                 onChange={(e) => setDescription(e.target.value)}
//                 className="w-full border border-gray-300 p-3 rounded-md min-h-[120px]"
//               ></textarea>
//             </div>

//             <button type="submit" className="w-full bg-[#7f1d1d] hover:bg-[#d55858] text-white py-3 rounded-md" disabled={loading}>
//               {loading ? "Submitting..." : "Submit Grievance"}
//             </button>
//           </form>

//           {error && <p className="mt-4 text-red-500 text-center">{error}</p>}
//         </div>
//       </div>
//     </>
//   );
// };

// export default SubmissionForm;
"use client";
import { useState, useRef, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Navbar from "../components/navbar";

export default function SubmissionForm() {
  const searchParams = useSearchParams();
  const isDisabled = searchParams.get("isDisabled") === "true";
  const router = useRouter();

  // State for initial form submission
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [results, setResults] = useState(null);

  // State for additional details form (for confirmed match)
  const [isChecked, setIsChecked] = useState(false);
  const [location, setLocation] = useState("");
  const [address, setAddress] = useState("");
  const [additionalDetails, setAdditionalDetails] = useState("");
  const [imageCount, setImageCount] = useState(0);

  const recognitionRef = useRef(null);
  const preferredLanguage = "en-US";
  const allowedCategories = [
    "health",
    "roads",
    "education",
    "water supply",
    "electricity",
    "public transport",
    "sanitation",
  ];

  // --- Voice Functions ---
  const speak = (text) => {
    return new Promise((resolve) => {
      if (typeof window !== "undefined" && window.speechSynthesis) {
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = preferredLanguage;
        utterance.onend = () => setTimeout(resolve, 500);
        window.speechSynthesis.speak(utterance);
      } else {
        console.error("Speech Synthesis API not supported.");
        resolve();
      }
    });
  };

  const listenForSpeech = () => {
    return new Promise((resolve, reject) => {
      const SpeechRecognition =
        window.SpeechRecognition || window.webkitSpeechRecognition;
      if (!SpeechRecognition) {
        reject(new Error("Speech Recognition API not supported"));
        return;
      }

      // Cancel any ongoing speech synthesis to avoid interference
      if (window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }

      const recognition = new SpeechRecognition();
      recognition.lang = preferredLanguage;
      recognition.interimResults = false;
      recognition.continuous = false;

      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript.trim().toLowerCase();
        console.log("Recognized:", transcript);
        resolve(transcript);
      };

      recognition.onerror = (error) => {
        console.error("Speech recognition error:", error);
        reject(error);
      };

      recognition.start();
      recognitionRef.current = recognition;
    });
  };

  // --- Voice Fill Handler ---
  const handleVoiceFill = async () => {
    try {
      await speak("Now you can address your problem.");
      await speak(
        "Please select your main category. Options are Health, Roads, Education, Water Supply, Electricity, Public Transport, and Sanitation."
      );
      const categoryTranscript = await listenForSpeech();
      console.log("Category Transcript:", categoryTranscript);
      const matched = allowedCategories.find((cat) =>
        categoryTranscript.includes(cat)
      );
      setCategory(
        matched ? matched.charAt(0).toUpperCase() + matched.slice(1) : "Other"
      );

      await speak("Now, please provide a brief description of your problem.");
      const descriptionTranscript = await listenForSpeech();
      setDescription(descriptionTranscript);

      await speak("Thank you, your responses have been recorded.");
    } catch (error) {
      console.error("Error during voice fill:", error);
      await speak("There was an error capturing your responses. Please try again.");
    }
  };

  // Auto-trigger voice-fill if the user is disabled (no button needed)
  useEffect(() => {
    if (isDisabled) {
      handleVoiceFill();
    }
  }, [isDisabled]);

  // --- Handle Initial Submission ---
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setResults(null);
    try {
      const response = await fetch("http://127.0.0.1:5000/api/grievance", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ grievance_text: description, category }),
      });
      if (!response.ok) {
        throw new Error("Failed to fetch data from the server");
      }
      const data = await response.json();
      console.log("Response from server:", data);
      setResults(data);
    } catch (err) {
      console.error("Error submitting grievance:", err);
      setError("Something went wrong. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  // --- Handle Final Confirmation Submission ---
  const handleConfirmSubmit = (e) => {
    e.preventDefault();
    const finalData = {
      category,
      description,
      location,
      address,
      additionalDetails,
      imageCount,
    };
    console.log("Final submission data:", finalData);
    alert("Grievance confirmed and submitted successfully!");
    // Optionally: router.push("/confirmation");
  };

  // --- Handle Image Upload ---
  const handleImageUpload = (event) => {
    setImageCount(event.target.files.length);
  };

  return (
    <>
      <Navbar />
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4 py-8">
        {/* Voice Input Section: Render button only if user is not disabled */}
        {!isDisabled && (
          <div className="w-full max-w-lg bg-white shadow-xl rounded-xl p-6 border-t-4 border-[#7f1d1d] mb-6">
            <h2 className="text-3xl font-semibold text-center text-[#7f1d1d] mb-4">
              Shikaayat - Voice Input
            </h2>
            <p className="text-center text-gray-600 mb-4">
              Click the button below to provide your grievance via voice.
            </p>
            <button
              onClick={handleVoiceFill}
              className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-md"
            >
              Fill Form via Voice
            </button>
          </div>
        )}

        {/* Manual Form (fields pre-populated if voice input was used) */}
        {!results && (
          <div className="w-full max-w-lg bg-white shadow-xl rounded-xl p-6 border-t-4 border-[#7f1d1d]">
            <h2 className="text-3xl font-semibold text-center text-[#7f1d1d] mb-4">
              Shikaayat
            </h2>
            <p className="text-center text-gray-600 mb-6">
              Help us improve by reporting issues in your locality.
            </p>
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Select Grievance Category
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full border border-gray-300 p-3 rounded-md"
                  required
                >
                  <option value="" disabled>
                    Choose a Category
                  </option>
                  {[
                    "Health",
                    "Roads",
                    "Education",
                    "Water Supply",
                    "Electricity",
                    "Public Transport",
                    "Sanitation",
                  ].map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                  <option value="Other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Problem Description
                </label>
                <textarea
                  placeholder="Briefly describe your problem"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full border border-gray-300 p-3 rounded-md min-h-[120px]"
                  required
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full bg-[#7f1d1d] hover:bg-[#d55858] text-white py-3 rounded-md"
                disabled={loading}
              >
                {loading ? "Submitting..." : "Submit Grievance"}
              </button>
            </form>
            {error && <p className="mt-4 text-red-500 text-center">{error}</p>}
          </div>
        )}

        {/* Results Section */}
        {results && (
          <div className="w-full max-w-lg bg-white shadow-xl rounded-xl p-6 transform transition-all duration-500 animate-slide-in mt-8">
            <h2 className="text-3xl font-semibold text-center text-[#7f1d1d] mb-4">
              Grievance Submission Result
            </h2>

            {/* Submitted Grievance Summary */}
            <div className="bg-[#e0f7fa] p-4 rounded-lg mb-4 border-l-4 border-[#4db6ac]">
              <h3 className="text-lg font-semibold mb-2">
                Your Submitted Grievance
              </h3>
              <p>
                <strong>Category:</strong> {category}
              </p>
              <p>
                <strong>Description:</strong> {description}
              </p>
            </div>

            {/* Similar Grievances List */}
            {results.similar_grievances &&
            results.similar_grievances.length > 0 ? (
              <div>
                <h3 className="text-xl font-semibold mb-4">
                  Similar Grievances Found
                </h3>
                <ul className="list-disc pl-5">
                  {results.similar_grievances.map((g, index) => (
                    <li key={index} className="mb-3">
                      <p>
                        <strong>{g.title || g.category}</strong>
                      </p>
                      <p>{g.description}</p>
                      <p className="italic">
                        Location: {g.location} | Category: {g.category}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            ) : (
              <p className="mb-4">
                No similar grievances found. You may submit this as a new grievance.
              </p>
            )}

            {/* Confirmation Checkbox */}
            <div className="flex items-center mb-4">
              <input
                type="checkbox"
                checked={isChecked}
                onChange={() => setIsChecked(!isChecked)}
                className="mr-3 w-5 h-5 cursor-pointer"
              />
              <label className="font-semibold text-gray-700">
                This matches my grievance
              </label>
            </div>

            {/* Additional Details Form */}
            {isChecked && (
              <form
                onSubmit={handleConfirmSubmit}
                className="flex flex-col bg-[#fafafa] p-5 rounded-lg border-l-4 border-[#84c9b8]"
              >
                <label className="font-semibold">📍 Location</label>
                <input
                  type="text"
                  placeholder="Enter specific location"
                  required
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#84c9b8]"
                />

                <label className="mt-4 font-semibold">🏠 Address</label>
                <textarea
                  placeholder="Enter full address"
                  required
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#84c9b8] h-24 resize-none"
                ></textarea>

                <label className="mt-4 font-semibold">
                  📝 Additional Details
                </label>
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
        )}
      </div>

      <style jsx>{`
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-slide-in {
          animation: slideIn 0.8s ease-out;
        }
      `}</style>
    </>
  );
}
