"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";

export default function Chatbot({ setShowDashboard }) {
  const [preferredLanguage, setPreferredLanguage] = useState("en-US");
  const router = useRouter();
  // Ref to prevent duplicate processing of the disabled answer.
  const disabledAnsweredRef = useRef(false);

  // ------------------------------
  // Helper: Speak text using SpeechSynthesis.
  const speak = (text, lang) => {
    return new Promise((resolve) => {
      console.log("Attempting to speak:", text);
      if (typeof window !== "undefined" && window.speechSynthesis) {
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = lang || preferredLanguage || "en-US";
        utterance.onend = () => {
          console.log("Finished speaking:", text);
          setTimeout(resolve, 500);
        };
        window.speechSynthesis.speak(utterance);
      } else {
        console.error("Speech Synthesis API not supported.");
        resolve();
      }
    });
  };

  // ------------------------------
  // Helper: Listen for a single speech response.
  const listenForSpeech = (lang) => {
    return new Promise((resolve, reject) => {
      const SpeechRecognition =
        window.SpeechRecognition || window.webkitSpeechRecognition;
      if (!SpeechRecognition) {
        reject(new Error("Speech Recognition API not supported"));
        return;
      }
      const recognition = new SpeechRecognition();
      recognition.lang = lang || preferredLanguage || "en-US";
      recognition.interimResults = false;
      recognition.continuous = false;
      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript.trim();
        console.log("Recognized speech:", transcript);
        resolve(transcript);
      };
      recognition.onerror = (error) => {
        console.error("Speech recognition error:", error);
        reject(error);
      };
      try {
        recognition.start();
        console.log("Speech recognition started for lang:", recognition.lang);
      } catch (error) {
        console.error("Error starting recognition:", error);
        reject(error);
      }
    });
  };

  // ------------------------------
  // Grievance submission flow.
  // (For "submit", we navigate to /submission.)
  const startGrievanceSubmission = async (lang) => {
    try {
      await speak("Please say your full name.", lang);
      const name = await listenForSpeech(lang);

      await speak(`You said your name is ${name}. Now, please say your address.`, lang);
      const address = await listenForSpeech(lang);

      await speak(`You said your address is ${address}. Now, please describe your complaint.`, lang);
      const complaint = await listenForSpeech(lang);

      const data = { name, address, complaint };
      console.log("Collected grievance data:", data);

      try {
        const res = await fetch("/api/storeGrievance", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        });
        const responseData = await res.json();
        await speak("Your grievance has been recorded successfully.", lang);
        console.log("Grievance stored:", responseData);
      } catch (apiError) {
        console.error("Error storing grievance:", apiError);
        await speak("There was an error recording your grievance. Please try again later.", lang);
      }
    } catch (error) {
      console.error("Error in grievance submission flow:", error);
      await speak("There was an error processing your information. Please try again later.", lang);
    }
  };

  // ------------------------------
  // Update flow: Navigate to tracker page and speak status.
  const startUpdateFlow = async (lang) => {
    try {
      router.push("/tracker");
      await speak("Please wait while I fetch your grievance status.", lang);
      await speak("The current status of your grievance is pending .", lang);
    } catch (error) {
      console.error("Error in update flow:", error);
      await speak("There was an error fetching your grievance status. Please try again later.", lang);
    }
  };

  // ------------------------------
  // Helper: Repeatedly ask for a valid command.
  const askForCommand = async (lang) => {
    while (true) {
      await speak(
        "What do you want? For grievance submission, say 'submit'. For checking the update of your grievance, say 'update'.",
        lang
      );
      await new Promise((resolve) => setTimeout(resolve, 1000));
      let command;
      try {
        command = await listenForSpeech(lang);
      } catch (error) {
        console.error("Error listening for command:", error);
        continue;
      }
      console.log("Assistance mode command:", command);
      const lowerCommand = command.toLowerCase().trim();
      if (lowerCommand.includes("update")) {
        return "update";
      } else if (lowerCommand.includes("submit") || lowerCommand.includes("sub")) {
        return "submit";
      }
      await speak("I did not understand your command. Please repeat your command.", lang);
    }
  };

  // ------------------------------
  // Assistance mode: After a "yes" response, ask what the user wants.
  const startAssistanceMode = async (lang) => {
    try {
      await speak("From now on, I will help you.", lang);
      await new Promise((resolve) => setTimeout(resolve, 2000));
      const command = await askForCommand(lang);
      console.log("Assistance mode valid command:", command);
      if (command === "update") {
        await startUpdateFlow(lang);
      } else if (command === "submit") {
        await speak("Now we will start to fill the submission form.", lang);
        await new Promise((resolve) => setTimeout(resolve, 2000));
        router.push("/submission?isDisabled=true");

      }
    } catch (error) {
      console.error("Error in assistance mode:", error);
      await speak("There was an error processing your command. Please try again later.", lang);
    }
  };

  // ------------------------------
  // Language selection flow.
  const startRecognitionForLanguage = () => {
    console.log("Starting recognition for language...");
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      console.error("Speech Recognition API not supported");
      return;
    }
    const recognition = new SpeechRecognition();
    recognition.lang = "en-US";
    recognition.interimResults = false;
    recognition.continuous = false;
    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript.toLowerCase().trim();
      console.log("Language recognition transcript:", transcript);
      if (transcript.includes("hindi")) {
        const lang = "hi-IN";
        setPreferredLanguage(lang);
        speak("आपने हिंदी चुनी है।", lang).then(() => {
          askIfDisabled(lang);
        });
      } else if (transcript.includes("english")) {
        const lang = "en-US";
        setPreferredLanguage(lang);
        speak("You have selected English.", lang).then(() => {
          askIfDisabled(lang);
        });
      } else {
        const lang = "en-US";
        setPreferredLanguage(lang);
        speak("I did not understand clearly. Defaulting to English.", lang).then(() => {
          askIfDisabled(lang);
        });
      }
    };
    recognition.onerror = (error) => {
      console.error("Speech recognition error (language):", error);
      speak("I encountered an error. Please say your preferred language again.", "en-US").then(() => {
        startRecognitionForLanguage();
      });
    };
    try {
      recognition.start();
    } catch (error) {
      console.error("Error starting language recognition:", error);
    }
  };

  // ------------------------------
  // Ask if the user is disabled.
  const askIfDisabled = (lang) => {
    const prompt =
      lang === "hi-IN"
        ? "क्या आप विकलांग हैं? कृपया हाँ या नहीं कहें।"
        : "Are you disabled? Please say yes or no.";
    speak(prompt, lang).then(() => {
      // Increased delay to ensure the prompt is finished before starting recognition
      setTimeout(() => {
        // Reset the flag each time we ask.
        disabledAnsweredRef.current = false;
        startRecognitionForDisabled(lang);
      }, 1500);
    });
  };

  // ------------------------------
  // Recognize response for disabled question.
  // ------------------------------
// Recognize response for disabled question.
const startRecognitionForDisabled = (lang) => {
  console.log("Starting recognition for disabled question...");
  const SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!SpeechRecognition) {
    console.error("Speech Recognition API not supported");
    return;
  }
  // (Optional) Remove or comment out this check if needed:
  // if (disabledAnsweredRef.current) return;

  const recognition = new SpeechRecognition();
  recognition.lang = lang || preferredLanguage || "en-US";
  recognition.interimResults = false;
  recognition.continuous = true; // Allow more time for input

  recognition.onresult = (event) => {
    const transcript = event.results[0][0].transcript.toLowerCase().trim();
    console.log("Disabled recognition transcript:", transcript);
    recognition.stop(); // Stop further listening once we get a result

    if (lang === "hi-IN") {
      if (
        transcript.includes("हाँ") ||
        transcript.includes("हां") ||
        transcript.includes("yes")
      ) {
        disabledAnsweredRef.current = true;
        startAssistanceMode(lang);
      } else if (
        transcript.includes("नहीं") ||
        transcript.includes("no")
      ) {
        disabledAnsweredRef.current = true;
        speak("आपका डैशबोर्ड में स्वागत है।", lang).then(() => {
          setShowDashboard(true);
        });
      } else {
        speak("I did not understand. Please say yes or no.", lang).then(() => {
          startRecognitionForDisabled(lang);
        });
      }
    } else {
      if (
        transcript.includes("yes") ||
        transcript.includes("yeah") ||
        transcript.includes("yep") ||
        transcript === "y"
      ) {
        disabledAnsweredRef.current = true;
        startAssistanceMode(lang);
      } else if (
        transcript.includes("no") ||
        transcript === "n"
      ) {
        disabledAnsweredRef.current = true;
        speak("Welcome to your dashboard.", lang).then(() => {
          setShowDashboard(true);
        });
      } else {
        speak("I did not understand. Please say yes or no.", lang).then(() => {
          startRecognitionForDisabled(lang);
        });
      }
    }
  };

  recognition.onerror = (error) => {
    console.error("Speech recognition error (disabled):", error);
    disabledAnsweredRef.current = false; // reset flag so we can try again
    speak("I encountered an error. Please say yes or no again.", lang).then(() => {
      startRecognitionForDisabled(lang);
    });
  };

  recognition.onend = () => {
    console.log("Disabled recognition ended.");
  };

  try {
    recognition.start();
    console.log("Disabled recognition started for lang:", recognition.lang);
  } catch (error) {
    console.error("Error starting disabled recognition:", error);
  }
};


  // ------------------------------
  // On mount: Wait for a user gesture to allow microphone access.
  useEffect(() => {
    console.log("Chatbot mounted. Waiting for user gesture...");
    const handleUserGesture = () => {
      console.log("User gesture detected. Starting voice interaction.");
      window.removeEventListener("keydown", handleUserGesture);
      speak("Hello, I am your saathi to this website.", "en-US").then(() => {
        startRecognitionForLanguage();
      });
    };

    window.addEventListener("keydown", handleUserGesture);
    const fallbackTimer = setTimeout(() => {
      console.log("Fallback timer triggered.");
      speak("Please say your preferred language.", "en-US").then(() => {
        startRecognitionForLanguage();
      });
    }, 5000);

    return () => {
      window.removeEventListener("keydown", handleUserGesture);
      clearTimeout(fallbackTimer);
    };
  }, []);

  // ------------------------------
  // Render the Chatbot UI (a centered circular button with a robot icon).
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#f5f5f5",
        zIndex: 1000,
      }}
    >
      <div
        style={{
          backgroundColor: "#4CAF50",
          borderRadius: "50%",
          width: "60px",
          height: "60px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "0 2px 5px rgba(0,0,0,0.3)",
        }}
      >
        <img
          src="https://img.icons8.com/ios-filled/50/ffffff/robot.png"
          alt="Chatbot"
          style={{ width: "40px", height: "40px" }}
        />
      </div>
    </div>
  );
}
