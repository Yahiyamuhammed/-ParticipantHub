// src/pages/Landing/index.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ScanFace, Search, Compass, ArrowRight, Sparkles } from "lucide-react";
import Section from "@/components/common/Section";
import Card from "@/components/common/Card";
import Leaderboard from "@/features/landing/components/Leaderboard";
import { useAuth } from "@/context/AuthContext";
import Button from "@/components/common/Button";

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

  return (
    <div className="flex flex-col min-h-screen bg-brand-cream pb-16">
      
      {/* HERO SECTION (Dark Forest Green) */}
      <div className="bg-brand-dark px-5 pt-12 pb-16 rounded-b-[2.5rem] shadow-lg relative">
        {/* Subtle background glow mimicking the border light */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-sm h-32 bg-brand-light blur-3xl opacity-20 pointer-events-none"></div>
        
        <div className="relative z-10 text-center mb-10">
          <div className="inline-flex items-center gap-2 bg-brand-accent/15 border border-brand-accent/30 rounded-full px-4 py-1.5 text-[11.5px] font-medium text-brand-accentLight tracking-[0.06em] uppercase mb-7">
            <Sparkles className="w-3.5 h-3.5" />
            Participant Hub
          </div>
          
          <h1 className="text-[2.5rem] leading-[1.15] font-semibold text-brand-cream tracking-tight mb-4">
            Your festival,<br />in <span className="text-brand-accent">your pocket.</span>
          </h1>
          <p className="text-brand-cream/60 text-[15px] leading-relaxed max-w-xs mx-auto">
            Scan a QR, identify yourself, and instantly access your schedule.
          </p>
        </div>

        {/* FRICTIONLESS LOGIN CARD */}
        <div className="bg-brand-card p-6 rounded-3xl shadow-xl border border-black/5 space-y-4 max-w-md mx-auto">
          <Button 
            onClick={() => navigate("/login")}
            className="w-full flex justify-between items-center py-4"
          >
            <div className="flex items-center gap-3">
              <ScanFace className="w-5 h-5 text-brand-dark" />
              <span className="text-base">Scan Face to Login</span>
            </div>
            <div className="bg-brand-dark/5 p-2 rounded-full">
              <ArrowRight className="w-4 h-4 text-brand-dark" />
            </div>
          </Button>

          <div className="flex items-center gap-3 text-brand-textMuted text-xs uppercase tracking-widest font-semibold px-2">
            <div className="flex-1 h-px bg-black/5"></div>
            OR
            <div className="flex-1 h-px bg-black/5"></div>
          </div>

          <form onSubmit={handleRegSubmit} className="relative">
            <input
              type="text"
              value={regNumber}
              onChange={(e) => setRegNumber(e.target.value)}
              placeholder="Enter Registration No."
              className="w-full bg-brand-cream border border-black/5 rounded-2xl pl-5 pr-14 py-4 font-medium text-brand-textDark placeholder-brand-textMuted focus:outline-none focus:border-brand-accent/50 focus:ring-1 focus:ring-brand-accent/50 transition-all uppercase"
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

      {/* DISCOVERY & LEADERBOARD (Cream Background) */}
      <div className="px-5 -mt-4 relative z-20 space-y-8">
        
        {/* Discovery Grid */}
        <div className="grid grid-cols-2 gap-4 mt-10">
          <Card onClick={() => navigate("/explore")} className="py-6 border-black/5 shadow-sm flex flex-col items-center gap-3 hover:-translate-y-1 transition-transform">
            <div className="w-12 h-12 bg-brand-dark/5 rounded-xl flex items-center justify-center">
              <Compass className="w-6 h-6 text-brand-dark" />
            </div>
            <span className="font-semibold text-brand-textDark text-sm">Explore Live</span>
          </Card>
          
          <Card onClick={() => navigate("/explore", { state: { autoFocus: true } })} className="py-6 border-black/5 shadow-sm flex flex-col items-center gap-3 hover:-translate-y-1 transition-transform">
            <div className="w-12 h-12 bg-brand-accent/15 rounded-xl flex items-center justify-center">
              <Search className="w-6 h-6 text-brand-dark" />
            </div>
            <span className="font-semibold text-brand-textDark text-sm">Search</span>
          </Card>
        </div>

        {/* Leaderboard */}
        <section>
          <h2 className="text-[11px] font-semibold uppercase tracking-[0.09em] text-brand-light mb-4 ml-1">
            Live District Standings
          </h2>
          {/* Ensure Leaderboard component uses transparent/white cards gracefully */}
          <Leaderboard />
        </section>
      </div>
    </div>
  );
}