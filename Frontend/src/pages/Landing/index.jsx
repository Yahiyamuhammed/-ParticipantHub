// src/pages/Landing/index.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import { ScanFace, Search, Compass, Trophy } from "lucide-react";
import Section from "@/components/common/Section";
import Card from "@/components/common/Card";
import Leaderboard from "@/features/landing/components/Leaderboard";

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col gap-8 pb-12">
      {/* Header */}
      <header className="pt-8">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">
          Sahitya Sabha
        </h1>
        <p className="mt-2 text-gray-500">
          Participant Hub & Live Event Updates
        </p>
      </header>

      {/* Primary Action: Login */}
      <Section>
        <Card 
          onClick={() => navigate("/login")}
          className="bg-gray-900 text-white hover:bg-gray-800 ring-0"
        >
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold">Participant Login</h2>
              <p className="mt-1 text-sm text-gray-400">Scan face or enter Reg No.</p>
            </div>
            <div className="bg-white/10 p-3 rounded-full">
              <ScanFace className="w-6 h-6 text-white" />
            </div>
          </div>
        </Card>
      </Section>

      {/* Secondary Actions Grid */}
      <div className="grid grid-cols-2 gap-4">
        <Card onClick={() => navigate("/explore")} className="flex flex-col items-center justify-center py-6 text-center">
          <Compass className="w-8 h-8 text-blue-600 mb-3" />
          <h3 className="font-medium text-gray-900">Explore Events</h3>
          <p className="text-xs text-gray-500 mt-1">Live & Upcoming</p>
        </Card>

<Card onClick={() => navigate("/explore", { state: { autoFocusSearch: true } })} className="flex flex-col items-center justify-center py-6 text-center">          <Search className="w-8 h-8 text-green-600 mb-3" />
          <h3 className="font-medium text-gray-900">Search</h3>
          <p className="text-xs text-gray-500 mt-1">Find a competition</p>
        </Card>
      </div>

      {/* Leaderboard Section */}
      <Section 
        title="District Leaderboard" 
        subtitle="Live points tracking across all stages"
      >
        <Leaderboard />
      </Section>
    </div>
  );
}