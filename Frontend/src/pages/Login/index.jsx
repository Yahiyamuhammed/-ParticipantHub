// src/pages/Login/index.jsx
import React from "react";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import FaceAuth from "@/features/auth/components/FaceAuth";

export default function LoginPage() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 -mx-5 px-5">
      {/* Back Navigation */}
      <header className="py-6">
        <button 
          onClick={() => navigate("/")}
          className="flex items-center text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-1" />
          Cancel
        </button>
      </header>

      <div className="flex-1 flex flex-col pt-4">
        {/* We no longer need the RegAuth fallback here, it's on the landing page */}
        <FaceAuth 
          onFailure={() => { /* Handled inside FaceAuth now */ }} 
          onSwitchToManual={() => navigate("/")} 
        />
      </div>
    </div>
  );
}