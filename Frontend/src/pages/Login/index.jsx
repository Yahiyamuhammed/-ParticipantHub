// src/pages/Login/index.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import FaceAuth from "@/features/auth/components/FaceAuth";

export default function LoginPage() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col min-h-screen bg-brand-cream">
      {/* NATIVE-STYLE TOP BAR */}
      <header className="px-5 py-4 flex items-center justify-between sticky top-0 z-20 bg-brand-cream/90 backdrop-blur-md border-b border-black/5">
        <button
          onClick={() => navigate("/")}
          className="flex items-center justify-center w-10 h-10 bg-brand-card border border-black/5 rounded-full shadow-sm hover:shadow-md active:scale-95 transition-all"
          aria-label="Go back"
        >
          <ArrowLeft className="w-5 h-5 text-brand-textDark" />
        </button>

        {/* Updated text back to Secure Login */}
        <span className="text-[12px] font-black uppercase tracking-[0.25em] text-brand-textDark/80">
          Secure Login
        </span>

        <div className="w-10"></div>
      </header>

      <div className="flex-1 flex flex-col items-center px-5 pt-8 pb-12">
        <div className="w-full max-w-md">
          <FaceAuth />
        </div>
      </div>
    </div>
  );
}
