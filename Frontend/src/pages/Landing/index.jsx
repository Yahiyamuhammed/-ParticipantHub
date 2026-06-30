// src/pages/Landing/index.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ScanFace, Search, Compass, ArrowRight } from "lucide-react";
import Section from "@/components/common/Section";
import Card from "@/components/common/Card";
import Leaderboard from "@/features/landing/components/Leaderboard";
import { useAuth } from "@/context/AuthContext";

export default function LandingPage() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [regNumber, setRegNumber] = useState("");

  const handleRegSubmit = (e) => {
    e.preventDefault();
    if (!regNumber.trim()) return;
    login({
      id: "P-1023",
      name: "Yahiya Muhammed",
      reg: regNumber.toUpperCase(),
    });
    navigate("/dashboard");
  };

  return (
    // Outer container provides the background color space for the whole page
    <div className="flex flex-col gap-10 pb-16 pt-8 bg-gray-50/50 min-h-screen">
      {/* Header Zone */}
      <header className="px-5">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">
          Sahitya Sabha
        </h1>
        <p className="mt-1 text-gray-500">
          Participant Hub & Live Event Updates
        </p>
      </header>

      {/* Login Zone - Elevated for priority */}
      <section className="px-5">
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 space-y-6">
          <h2 className="text-sm font-bold uppercase tracking-wider text-gray-400">
            Participant Login
          </h2>

          <div className="flex flex-col gap-4">
            {" "}
            {/* Increased gap between Face and Reg */}
            <button
              onClick={() => navigate("/login")}
              className="w-full bg-blue-600 text-white rounded-2xl p-5 flex items-center justify-between hover:bg-blue-700 transition-all shadow-md active:scale-[0.98]"
            >
              <div className="text-left">
                <span className="block font-bold text-lg">Scan Face</span>
                <span className="text-blue-100 text-sm">
                  One-tap authentication
                </span>
              </div>
              <div className="bg-white/20 p-3 rounded-full">
                <ScanFace className="w-6 h-6 text-white" />
              </div>
            </button>
            <form onSubmit={handleRegSubmit} className="relative">
              <input
                type="text"
                value={regNumber}
                onChange={(e) => setRegNumber(e.target.value)}
                placeholder="Or enter Reg No."
                className="w-full bg-gray-50 border border-gray-200 rounded-2xl pl-5 pr-14 py-4 font-medium text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-900 transition-all uppercase shadow-inner"
              />
              <button
                type="submit"
                className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-white text-gray-900 rounded-xl shadow-sm border border-gray-100 hover:bg-gray-50"
              >
                <ArrowRight className="w-5 h-5" />
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Discovery Zone - Flat background, distinct cards */}
      <section className="px-5 space-y-4">
        <h2 className="text-sm font-bold uppercase tracking-wider text-gray-400 ml-1">
          Discovery
        </h2>
        <div className="grid grid-cols-2 gap-4">
          <Card
            onClick={() => navigate("/explore")}
            className="py-6 border-none shadow-sm flex flex-col items-center gap-2"
          >
            <Compass className="w-8 h-8 text-blue-600" />
            <span className="font-semibold text-gray-900 text-sm">Explore</span>
          </Card>
          <Card
            onClick={() => navigate("/explore", { state: { autoFocusSearch: true } })}
            className="py-6 border-none shadow-sm flex flex-col items-center gap-2"
          >
            <Search className="w-8 h-8 text-green-600" />
            <span className="font-semibold text-gray-900 text-sm">Search</span>
          </Card>
        </div>
      </section>

      {/* Leaderboard Zone - Distinct white container */}
      <section className="px-5">
        <h2 className="text-sm font-bold uppercase tracking-wider text-gray-400 mb-3 ml-1">
          Leaderboard
        </h2>
        <Leaderboard />
      </section>
    </div>
  );
}
