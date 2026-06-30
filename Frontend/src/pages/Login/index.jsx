// src/pages/Login/index.jsx
import React, { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import FaceAuth from "@/features/auth/components/FaceAuth";
import RegAuth from "@/features/auth/components/RegAuth";

export default function LoginPage() {
  const navigate = useNavigate();
  // 'face' | 'manual'
  const [authMethod, setAuthMethod] = useState("face"); 
  const [failedAttempts, setFailedAttempts] = useState(0);

  const handleFaceFailure = () => {
    const newAttempts = failedAttempts + 1;
    setFailedAttempts(newAttempts);
    if (newAttempts >= 2) {
      setAuthMethod("manual");
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 -mx-5 px-5">
      {/* Back Navigation */}
      <header className="py-6">
        <button 
          onClick={() => navigate("/")}
          className="flex items-center text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-1" />
          Back
        </button>
      </header>

      <div className="flex-1 flex flex-col pt-4">
        {authMethod === "face" ? (
          <FaceAuth 
            onFailure={handleFaceFailure} 
            onSwitchToManual={() => setAuthMethod("manual")} 
          />
        ) : (
          <RegAuth onSwitchToFace={() => {
            setAuthMethod("face");
            setFailedAttempts(0);
          }} />
        )}
      </div>
    </div>
  );
}