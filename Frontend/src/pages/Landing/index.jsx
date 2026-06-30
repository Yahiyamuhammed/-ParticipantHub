// src/pages/Landing/index.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ScanFace, ArrowRight, Sparkles, Compass } from "lucide-react";
import Leaderboard from "@/features/landing/components/Leaderboard";
import { useAuth } from "@/context/AuthContext";
import Button from "@/components/common/Button";
import Card from "@/components/common/Card";
import LiveTicker from "@/components/shared/LiveTicker";

export default function LandingPage() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [regNumber, setRegNumber] = useState("");

  const handleRegSubmit = (e) => {
    e.preventDefault();
    if (!regNumber.trim()) return;
    login({ id: "P-1023", name: "Yahiya Muhammed", reg: regNumber.toUpperCase(), district: "Nadapuram" });
    navigate("/dashboard");
  };

  // Dynamic updates - in a real app, this would come from an API
  const liveUpdates = [
    "🏆 Mapila Song results published!",
    "📍 Stage 4 relocated to Main Hall",
    "⏰ Essay writing starting in 15 mins",
    "🎤 Registration for open mic closes at 2 PM"
  ];

  return (
    <div className="flex flex-col min-h-screen bg-brand-cream pb-12">
      
      {/* 1. HERO & LOGIN SECTION (All inside Dark Forest Green) */}
      <div className="bg-brand-dark px-5 pt-12 pb-10 rounded-b-[2.5rem] shadow-lg relative">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-sm h-32 bg-brand-light blur-3xl opacity-20 pointer-events-none"></div>
        
        {/* Intro Text */}
        <div className="relative z-10 text-center mb-8">
          <div className="inline-flex items-center gap-2 bg-brand-accent/15 border border-brand-accent/30 rounded-full px-4 py-1.5 text-[11px] font-semibold text-brand-accentLight tracking-[0.08em] uppercase mb-6">
            <Sparkles className="w-3.5 h-3.5" />
            Participant Hub
          </div>
          
          <h1 className="text-[2.5rem] leading-[1.15] font-semibold text-brand-cream tracking-tight mb-4">
            Your festival,<br />in <span className="text-brand-accent">your pocket.</span>
          </h1>
          <p className="text-brand-cream/60 text-[14.5px] leading-relaxed max-w-xs mx-auto">
            Scan a QR, identify yourself, and instantly access your schedule.
          </p>
        </div>

        {/* Transition Heading inside Green */}
        <div className="relative z-10 flex items-center gap-3 mb-4 max-w-md mx-auto px-2">
           <div className="h-px bg-brand-light/30 flex-1"></div>
           <span className="text-brand-accentLight text-[11px] font-semibold uppercase tracking-widest">
             Access Portal
           </span>
           <div className="h-px bg-brand-light/30 flex-1"></div>
        </div>

        {/* Login Card (Inside Green) */}
        <div className="relative z-10 bg-brand-card p-5 rounded-3xl shadow-xl border border-black/5 space-y-4 max-w-md mx-auto">
          <Button 
            onClick={() => navigate("/login")}
            className="w-full flex justify-between items-center py-4"
          >
            <div className="flex items-center gap-3">
              <ScanFace className="w-5 h-5 text-brand-dark" />
              <span className="text-[15px]">Scan Face to Login</span>
            </div>
            <div className="bg-brand-dark/5 p-2 rounded-full">
              <ArrowRight className="w-4 h-4 text-brand-dark" />
            </div>
          </Button>

          <form onSubmit={handleRegSubmit} className="relative">
            <input
              type="text"
              value={regNumber}
              onChange={(e) => setRegNumber(e.target.value)}
              placeholder="Or enter Reg No."
              className="w-full bg-brand-cream border border-black/5 rounded-2xl pl-5 pr-14 py-4 font-medium text-brand-textDark placeholder-brand-textMuted focus:outline-none focus:border-brand-accent/50 focus:ring-1 focus:ring-brand-accent/50 transition-all uppercase text-[15px]"
            />
            <button 
              type="submit" 
              disabled={regNumber.length < 4}
              className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-brand-dark text-brand-accent rounded-xl disabled:opacity-50 hover:bg-brand-mid transition-colors"
            >
              <ArrowRight className="w-5 h-5" />
            </button>
          </form>
        </div>
      </div>

      {/* 2. DYNAMIC LIVE TICKER */}
      <div className="mt-8">
        <LiveTicker updates={liveUpdates} />
      </div>

      {/* 3. MAIN BODY (Discovery & Leaderboard) */}
      <div className="px-5 mt-10 space-y-10">
        
        {/* Explore Events */}
        <section>
          <h2 className="text-lg font-bold text-brand-textDark mb-3 ml-1 tracking-tight">
            Explore Events
          </h2>
          <Card 
            onClick={() => navigate("/explore")} 
            className="p-4 border border-brand-dark/5 shadow-sm flex items-center justify-between hover:shadow-md transition-shadow cursor-pointer bg-brand-card"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-brand-dark/5 rounded-xl flex items-center justify-center shrink-0">
                <Compass className="w-6 h-6 text-brand-dark" />
              </div>
              <div>
                <h3 className="font-semibold text-brand-textDark text-[15px]">Live & Upcoming</h3>
                <p className="text-[13px] text-brand-textMuted mt-0.5 leading-tight">Find currently running competitions across all stages.</p>
              </div>
            </div>
            <ArrowRight className="w-5 h-5 text-brand-light shrink-0" />
          </Card>
        </section>

        {/* Leaderboard */}
        <section>
          <h2 className="text-lg font-bold text-brand-textDark mb-3 ml-1 tracking-tight">
            District Leaderboard
          </h2>
          <Leaderboard />
        </section>

      </div>
    </div>
  );
}