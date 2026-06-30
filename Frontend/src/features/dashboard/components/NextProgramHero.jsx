// src/features/dashboard/components/NextProgramHero.jsx
import React from "react";
import { Navigation2, Clock } from "lucide-react";
import { getEventStatus } from "@/utils/time";

export default function NextProgramHero({ competition }) {
  if (!competition) return null;

  const status = getEventStatus(competition.startTime, competition.endTime);

  return (
    <div className="bg-gray-900 text-white rounded-3xl p-6 shadow-xl relative overflow-hidden">
      {/* Soft background glow for Apple-like aesthetic */}
      <div className="absolute -top-12 -right-12 w-32 h-32 bg-blue-500 rounded-full blur-3xl opacity-20"></div>

      <div className="relative z-10">
        <span className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-2 block">
          Next Program
        </span>
        <h2 className="text-3xl font-bold mb-1">{competition.title}</h2>
        <p className="text-gray-300 font-medium text-lg mb-6">{competition.stage}</p>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 bg-white/10 px-3 py-1.5 rounded-lg backdrop-blur-sm">
            <Clock className="w-4 h-4 text-green-400" />
            <span className="text-sm font-semibold">{status.label}</span>
          </div>

          <button className="flex items-center gap-2 bg-white text-gray-900 px-4 py-2 rounded-xl font-bold text-sm hover:bg-gray-100 transition-colors shadow-sm">
            <Navigation2 className="w-4 h-4" />
            Navigate
          </button>
        </div>
      </div>
    </div>
  );
}