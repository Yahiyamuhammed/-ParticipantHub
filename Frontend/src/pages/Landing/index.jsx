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
    <div className="flex flex-col min-h-screen bg-brand-cream pb-16">

      {/* 1. HERO & LOGIN SECTION (All inside Dark Forest Green) */}
      <div className="bg-brand-dark px-5 pt-14 pb-12 rounded-b-[2.5rem] shadow-lg relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-sm h-32 bg-brand-light blur-3xl opacity-20 pointer-events-none"></div>

        {/* Intro Text */}
        <div className="relative z-10 max-w-md mx-auto text-center mb-10">
          <div className="inline-flex items-center gap-2 bg-brand-accent/15 border border-brand-accent/30 rounded-full px-4 py-1.5 text-[11px] font-semibold text-brand-accentLight tracking-[0.08em] uppercase mb-6">
            <Sparkles className="w-3.5 h-3.5" />
            SSF Sahithyolsav
          </div>

          <h1 className="text-[2.5rem] leading-[1.15] font-semibold text-brand-cream tracking-tight mb-4">
            Your festival,<br />in <span className="text-brand-accent">your pocket.</span>
          </h1>
          <p className="text-brand-cream/65 text-[14.5px] leading-relaxed max-w-xs mx-auto">
            Live schedules, results, and venue navigation — everything you need for the festival, in one place.
          </p>
        </div>

        {/* Transition Heading inside Green */}
        <div className="relative z-10 flex items-center gap-3 mb-4 max-w-md mx-auto px-2">
           <div className="h-px bg-brand-light/30 flex-1"></div>
           <span className="text-brand-accentLight text-[11px] font-semibold uppercase tracking-widest">
             Get Started
           </span>
           <div className="h-px bg-brand-light/30 flex-1"></div>
        </div>

        {/* Login Card (Inside Green) */}
        <div className="relative z-10 bg-brand-card p-5 rounded-3xl shadow-xl border border-black/5 max-w-md mx-auto">
          <Button
            onClick={() => navigate("/login")}
            variant="dark"
            className="justify-between py-4"
          >
            <div className="flex items-center gap-3">
              <ScanFace className="w-5 h-5 text-brand-accentLight" />
              <span>Login with Face Scan</span>
            </div>
            <div className="bg-white/10 p-2 rounded-full">
              <ArrowRight className="w-4 h-4" />
            </div>
          </Button>

          {/* "or" divider between the two login methods */}
          <div className="flex items-center gap-3 my-4">
            <div className="h-px bg-black/10 flex-1"></div>
            <span className="text-[12px] font-semibold uppercase tracking-widest text-brand-textMuted">or</span>
            <div className="h-px bg-black/10 flex-1"></div>
          </div>

          <form onSubmit={handleRegSubmit}>
            <label htmlFor="regNumber" className="block text-[11px] font-semibold uppercase tracking-widest text-brand-textMuted mb-2 ml-1">
              Registration Number
            </label>
            <div className="relative">
              <input
                id="regNumber"
                type="text"
                value={regNumber}
                onChange={(e) => setRegNumber(e.target.value)}
                placeholder="e.g. SSF-2024-1042"
                className="w-full bg-brand-cream border border-black/5 rounded-2xl pl-5 pr-14 py-4 font-semibold text-brand-textDark placeholder:font-normal placeholder-brand-textMuted/70 focus:outline-none focus:border-brand-accent/50 focus:ring-1 focus:ring-brand-accent/50 transition-all uppercase text-[15px]"
              />
              <button
                type="submit"
                disabled={regNumber.length < 4}
                aria-label="Continue with registration number"
                className="absolute right-2 top-1/2 -translate-y-1/2 p-2.5 bg-brand-dark text-brand-accent rounded-xl disabled:opacity-40 hover:bg-brand-mid transition-colors"
              >
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* 2. DYNAMIC LIVE TICKER */}
      <div className="px-5 mt-8 max-w-md w-full mx-auto">
        <LiveTicker updates={liveUpdates} />
      </div>

      {/* 3. MAIN BODY (Discovery & Leaderboard) */}
      <div className="px-5 mt-12 max-w-md w-full mx-auto space-y-12">

        {/* Explore Events */}
        <section>
          <h2 className="text-lg font-bold text-brand-textDark mb-4 ml-1 tracking-tight">
            Explore Events
          </h2>
          <button
            onClick={() => navigate("/explore")}
            className="w-full text-left p-4 rounded-3xl bg-brand-card border border-black/5 shadow-[0_6px_20px_rgba(15,61,48,0.08)] hover:shadow-[0_8px_24px_rgba(15,61,48,0.14)] hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.99] transition-all duration-200 flex items-center justify-between"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-brand-accent/15 rounded-xl flex items-center justify-center shrink-0">
                <Compass className="w-6 h-6 text-brand-dark" />
              </div>
              <div>
                <h3 className="font-semibold text-brand-textDark text-[15px]">Live & Upcoming</h3>
                <p className="text-[13px] text-brand-textMuted mt-0.5 leading-tight">Find currently running competitions across all stages.</p>
              </div>
            </div>
            <ArrowRight className="w-5 h-5 text-brand-light shrink-0" />
          </button>
        </section>

        {/* Leaderboard */}
        <section>
          <h2 className="text-lg font-bold text-brand-textDark mb-4 ml-1 tracking-tight">
            District Leaderboard
          </h2>
          <Leaderboard />
        </section>

      </div>
    </div>
  );
}