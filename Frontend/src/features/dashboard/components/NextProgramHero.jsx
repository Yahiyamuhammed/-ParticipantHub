// src/features/dashboard/components/NextProgramHero.jsx
import React from "react";
import { Navigation2, Clock } from "lucide-react";
import { getEventStatus } from "@/utils/time";

export default function NextProgramHero({ competition }) {
  if (!competition) return null;

  const status = getEventStatus(competition.startTime, competition.endTime);

  return (
    // Swapped generic gray for brand-dark, and tweaked paddings
    <div className="bg-brand-dark text-brand-cream rounded-[2rem] p-7 shadow-lg relative overflow-hidden mx-1">
      {/* Subtle brand-light glow instead of blue */}
      <div className="absolute -top-12 -right-12 w-32 h-32 bg-brand-light rounded-full blur-3xl opacity-40 pointer-events-none"></div>

      <div className="relative z-10">
        {/* Gold subtitle */}
        <span className="text-[11px] font-bold uppercase tracking-[0.08em] text-brand-accent mb-2 block">
          Next Program
        </span>
        <h2 className="text-3xl font-bold mb-1 tracking-tight text-white">
          {competition.title}
        </h2>
        <p className="text-brand-cream/80 font-medium text-lg mb-8">
          {competition.stage}
        </p>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 bg-brand-mid/50 border border-brand-light/30 px-3 py-1.5 rounded-lg backdrop-blur-sm">
            <Clock className="w-4 h-4 text-brand-accent" />
            <span className="text-sm font-semibold text-brand-cream">
              {status.label}
            </span>
          </div>

          {/* Gold Button */}
          <button className="flex items-center gap-2 bg-brand-accent text-brand-dark px-5 py-2.5 rounded-xl font-bold text-sm hover:bg-brand-accentLight transition-colors shadow-sm active:scale-95">
            <Navigation2 className="w-4 h-4" />
            Navigate
          </button>
        </div>
      </div>
    </div>
  );
}
