// src/pages/Landing/index.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ScanFace, ArrowRight, Sparkles, Radio } from "lucide-react";
import Leaderboard from "@/features/landing/components/LeaderBoard";
import { useAuth } from "@/context/AuthContext";
import Button from "@/components/common/Button";
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

  const liveUpdates = [
    "🏆 Mapila Song results published!",
    "📍 Stage 4 relocated to Main Hall",
    "⏰ Essay writing starting in 15 mins",
    "🎤 Registration for open mic closes at 2 PM"
  ];

  return (
    // MASTER WRAPPER: Forces everything to the center on large screens
    <div className="flex flex-col min-h-screen bg-brand-cream pb-20 items-center">

      {/* 1. HERO SECTION (Full width green background, centered content) */}
      <div className="w-full bg-brand-dark pt-16 pb-14 rounded-b-[2.5rem] shadow-xl relative flex flex-col items-center">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-sm h-32 bg-brand-light blur-3xl opacity-20 pointer-events-none"></div>

        {/* HERO INNER CONTAINER: Locks width to mobile size */}
        {/* HERO INNER CONTAINER: Locks width to mobile size */}
        <div className="w-full max-w-md px-5 flex flex-col items-center relative z-10">
          
          {/* 1. The Pill (Removed mb-8) */}
          <div className="inline-flex items-center gap-2 bg-brand-accent/15 border border-brand-accent/30 rounded-full px-4 py-1.5 text-[11px] font-semibold text-brand-accentLight tracking-[0.08em] uppercase">
            <Sparkles className="w-3.5 h-3.5" />
            SSF Sahithyolsav
          </div>

          {/* Spacer: Between Pill and Heading */}
          <div className="h-8 w-full shrink-0"></div>

          {/* 2. The Heading (Removed mb-5) */}
          <h1 className="text-[2.75rem] leading-[1.1] font-semibold text-brand-cream tracking-tight text-center">
            Your festival,<br />in <span className="text-brand-accent">your pocket.</span>
          </h1>
          
          {/* Spacer: Between Heading and Paragraph */}
          <div className="h-6 w-full shrink-0"></div>

          {/* 3. The Paragraph (Removed mb-10) */}
          <p className="text-brand-cream/80 text-[16px] leading-relaxed text-center px-2">
            Live schedules, results, and venue navigation — everything you need for the festival, in one place.
          </p>

          {/* Spacer: Between Paragraph and "Get Started" (From our previous fix) */}
          <div className="h-10 w-full shrink-0"></div>

          {/* "Get Started" Divider */}
          <div className="flex items-center gap-4 w-full px-4">
             <div className="h-px bg-brand-light/40 flex-1"></div>
             <span className="text-brand-accentLight text-[13px] font-bold uppercase tracking-[0.2em]">
               Get Started
             </span>
             <div className="h-px bg-brand-light/40 flex-1"></div>
          </div>

          {/* Spacer: Between "Get Started" and Login Card */}
          <div className="h-8 w-full shrink-0"></div>
          
          {/* ... Login Card starts here ... */}

          
          <div className="bg-brand-card p-6 rounded-3xl shadow-2xl border border-black/5 w-full">
            <Button
              onClick={() => navigate("/login")}
              variant="dark"
              className="justify-between py-4"
            >
              <div className="flex items-center gap-3">
                <ScanFace className="w-5 h-5 text-brand-accentLight" />
                <span className="text-[16px]">Login with Face Scan</span>
              </div>
              <div className="bg-white/10 p-2 rounded-full">
                <ArrowRight className="w-4 h-4" />
              </div>
            </Button>

            <div className="flex items-center gap-3 my-5">
              <div className="h-px bg-black/10 flex-1"></div>
              <span className="text-[12px] font-semibold uppercase tracking-widest text-brand-textMuted">or</span>
              <div className="h-px bg-black/10 flex-1"></div>
            </div>

            <form onSubmit={handleRegSubmit}>
              <label htmlFor="regNumber" className="block text-[12px] font-bold uppercase tracking-[0.15em] text-brand-textMid mb-3 ml-1">
                Registration Number
              </label>
              <div className="relative">
                <input
                  id="regNumber"
                  type="text"
                  value={regNumber}
                  onChange={(e) => setRegNumber(e.target.value)}
                  placeholder="E.G. SSF-2024-1042"
                  className="w-full bg-brand-cream border border-black/10 rounded-2xl pl-5 pr-14 py-4 font-bold text-brand-textDark placeholder:font-medium placeholder-brand-textMuted/60 focus:outline-none focus:border-brand-accent focus:ring-1 focus:ring-brand-accent transition-all uppercase text-[16px]"
                />
                <button
                  type="submit"
                  disabled={regNumber.length < 4}
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-2.5 bg-brand-dark text-brand-accent rounded-xl disabled:opacity-40 hover:bg-brand-mid transition-colors"
                >
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

     <div className="h-14 w-full shrink-0"></div>

      {/* 2. MAIN BODY WRAPPER */}
      <div className="w-full max-w-md px-5 flex flex-col gap-14">      
        {/* Ticker */}
        <LiveTicker updates={liveUpdates} />

        {/* Explore Events - gap-5 creates space between heading and button */}
      {/* Explore Events */}
        <section className="flex flex-col gap-5">
          <h2 className="text-[22px] font-bold text-brand-textDark ml-1 tracking-tight">
            Explore Events
          </h2>
          <button
            onClick={() => navigate("/explore")}
            className="w-full text-left p-4 rounded-3xl bg-brand-card border border-black/5 shadow-[0_8px_24px_rgba(0,0,0,0.04)] hover:shadow-[0_12px_32px_rgba(217,181,109,0.15)] hover:-translate-y-1 active:translate-y-0 active:scale-[0.99] transition-all duration-300 flex items-center justify-between group"
          >
            <div className="flex items-center gap-5">
              {/* NEW ICON BLOCK: Solid Gold Background with Dark Green Icon */}
              <div className="w-14 h-14 bg-brand-accent rounded-2xl flex items-center justify-center shrink-0 shadow-[inset_0_-2px_6px_rgba(0,0,0,0.1)] group-hover:bg-brand-accentLight transition-colors">
                <Radio className="w-7 h-7 text-brand-dark" />
              </div>
              
              <div>
                <h3 className="font-bold text-brand-textDark text-[17px] mb-1">Live & Upcoming</h3>
                <p className="text-[13.5px] text-brand-textMuted leading-snug pr-4">Find currently running competitions across all stages.</p>
              </div>
            </div>
            {/* Arrow also inherits the gold/accent color on hover */}
            <ArrowRight className="w-6 h-6 text-brand-light shrink-0 group-hover:text-brand-accent group-hover:translate-x-1 transition-all" />
          </button>
        </section>

        {/* Leaderboard - gap-5 creates space between heading and list */}
        <section className="flex flex-col gap-5">
          <h2 className="text-[22px] font-bold text-brand-textDark ml-1 tracking-tight">
            District Leaderboard
          </h2>
          <Leaderboard />
        </section>

      </div>
    </div>
  );
}